import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, ImageOff, Play, X } from "lucide-react";
import archive from "../data/galleryArchive.json";
import imported from "../data/galleryImported.json";
import { mergeGalleryPosts } from "../data/gallery-posts.js";
import "./gallery-news.css";

const categories = { all: "All", news: "News", publication: "Publications", award: "Awards", conference: "Conferences", "lab-life": "Lab life" };
const posts = mergeGalleryPosts(archive, imported);
const years = [...new Set(posts.map((post) => post.date.slice(0, 4)))];
const availableCategories = Object.entries(categories).filter(([key]) => key === "all" || posts.some((post) => post.category === key));
const localUrl = (src) => src?.startsWith("/") ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src;
const dateLabel = (post) => post.date.replaceAll("-", ".") + (post.endDate ? ` - ${post.endDate.replaceAll("-", ".")}` : "");

function NewsImage({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="gallery-image-error"><ImageOff aria-hidden="true" />Image unavailable</span> :
    <img src={src} alt={alt} onError={() => setFailed(true)} {...props} />;
}

function PhotoDialog({ photo, onClose, onChange }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      photo.trigger?.focus();
    };
  }, []);
  const images = photo.post.media.filter((item) => item.type === "image");
  const item = images[photo.index];
  const move = (direction) => onChange({ ...photo, index: (photo.index + direction + images.length) % images.length });
  return <dialog ref={ref} className="gallery-dialog" aria-labelledby="gallery-dialog-title"
    onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={(event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    }}>
    <div className="gallery-dialog-header">
      <h2 id="gallery-dialog-title">{photo.post.title}</h2>
      <button type="button" className="gallery-icon" aria-label="Close photo" title="Close photo" onClick={onClose} autoFocus><X /></button>
    </div>
    <div className="gallery-dialog-image"><NewsImage key={item.src} src={localUrl(item.src)} alt={item.alt} /></div>
    <div className="gallery-dialog-footer">
      <span aria-live="polite">{photo.index + 1} / {images.length}</span>
      {images.length > 1 && <div className="gallery-arrows">
        <button type="button" className="gallery-icon" aria-label="Previous photo" title="Previous photo" onClick={() => move(-1)}><ChevronLeft /></button>
        <button type="button" className="gallery-icon" aria-label="Next photo" title="Next photo" onClick={() => move(1)}><ChevronRight /></button>
      </div>}
    </div>
  </dialog>;
}

function NewsMedia({ post, activeVideo, setActiveVideo, onPhoto }) {
  const [index, setIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const item = post.media[index];
  const mediaId = `${post.id}-${index}`;
  const playing = activeVideo === mediaId;
  const switchMedia = (direction) => {
    if (playing) setActiveVideo(null);
    setVideoError(false);
    setIndex((index + direction + post.media.length) % post.media.length);
  };
  return <div className="gallery-media">
    <div className="gallery-media-frame">
      {item.type === "image" ? <button type="button" className="gallery-photo" aria-label={`Enlarge photo: ${item.alt}`}
        onClick={(event) => onPhoto({ post, index: post.media.slice(0, index).filter((media) => media.type === "image").length, trigger: event.currentTarget })}>
        <NewsImage key={item.src} src={localUrl(item.src)} alt={item.alt} loading="lazy" />
        <span className="gallery-expand" title="Enlarge photo"><Expand size={18} /></span>
      </button> : playing ? item.type === "youtube" ?
        <iframe title={item.alt} src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> :
        videoError ? <div className="gallery-image-error">Video unavailable</div> :
        <video key={item.src} controls autoPlay playsInline preload="metadata" poster={localUrl(item.poster)} onError={() => setVideoError(true)}>
          <source src={localUrl(item.src)} />
          {item.captions && <track kind="captions" src={localUrl(item.captions)} srcLang={item.captionsLanguage || "ko"} label="Captions" default />}
        </video> :
        <button type="button" className="gallery-play" aria-label={`Play video: ${item.alt}`} onClick={() => setActiveVideo(mediaId)}>
          {(item.type === "youtube" || item.poster) && <NewsImage key={item.videoId || item.poster} src={item.type === "youtube" ? `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg` : localUrl(item.poster)} alt={item.alt} loading="lazy" />}
          <span className="gallery-play-symbol"><Play size={24} fill="currentColor" /></span>
          <span className="gallery-video-label">{item.type === "youtube" ? "YouTube" : "Video"}</span>
        </button>}
    </div>
    <div className="gallery-media-bar">
      <span aria-live="polite">{item.type === "image" ? "Photo" : "Video"} <b>{index + 1} / {post.media.length}</b></span>
      <div className="gallery-arrows">
        {item.type === "youtube" && <a className="gallery-icon" href={`https://www.youtube.com/watch?v=${item.videoId}`} target="_blank" rel="noreferrer" aria-label="Watch on YouTube" title="Watch on YouTube"><ArrowUpRight size={18} /></a>}
        {post.media.length > 1 && <>
          <button type="button" className="gallery-icon" aria-label={`Previous media: ${post.title}`} title="Previous media" onClick={() => switchMedia(-1)}><ChevronLeft size={18} /></button>
          <button type="button" className="gallery-icon" aria-label={`Next media: ${post.title}`} title="Next media" onClick={() => switchMedia(1)}><ChevronRight size={18} /></button>
        </>}
      </div>
    </div>
  </div>;
}

export default function GalleryNews() {
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const [activeVideo, setActiveVideo] = useState(null);
  const [photo, setPhoto] = useState(null);
  const filtered = posts.filter((post) => (category === "all" || post.category === category) && (year === "all" || post.date.startsWith(year)));
  const filter = (setter, value) => { setActiveVideo(null); setter(value); };
  return <div className="gallery-page">
    <header className="gallery-heading">
      <p className="eyebrow">MESY LAB / JOURNAL</p>
      <h1>Gallery &amp; News</h1>
      <p>Research milestones. Shared achievements. Life in the lab.</p>
    </header>
    <section className="gallery-content" aria-label="Lab news archive">
      <div className="gallery-toolbar">
        <div className="gallery-filters" role="group" aria-label="News category">
          {availableCategories.map(([value, label]) => <button type="button" key={value} aria-pressed={category === value} onClick={() => filter(setCategory, value)}>{label}</button>)}
        </div>
        <label className="gallery-year-select">Year <select value={year} onChange={(event) => filter(setYear, event.target.value)}>
          <option value="all">All years</option>{years.map((value) => <option key={value}>{value}</option>)}
        </select></label>
      </div>
      <p className="gallery-count" role="status">{filtered.length} {filtered.length === 1 ? "story" : "stories"}</p>
      {years.filter((value) => filtered.some((post) => post.date.startsWith(value))).map((value) => <section className="gallery-year" key={value} aria-labelledby={`news-year-${value}`}>
        <h2 id={`news-year-${value}`}>{value}</h2>
        <div>{filtered.filter((post) => post.date.startsWith(value)).map((post) => <article className={`gallery-entry${post.media.length ? "" : " gallery-entry--text"}`} id={post.id} key={post.id}>
          {post.media.length > 0 && <NewsMedia post={post} activeVideo={activeVideo} setActiveVideo={setActiveVideo} onPhoto={(value) => { setActiveVideo(null); setPhoto(value); }} />}
          <div className="gallery-entry-copy">
            <div className="gallery-meta"><time dateTime={post.date}>{dateLabel(post)}</time><span data-category={post.category}>{categories[post.category]}</span></div>
            <h3 lang="ko">{post.title}</h3>
            {post.body && <p lang="ko">{post.body}</p>}
            {post.sourceUrl && <a className="gallery-source" href={post.sourceUrl} target="_blank" rel="noreferrer">Original post <ArrowUpRight size={15} aria-hidden="true" /></a>}
          </div>
        </article>)}</div>
      </section>)}
      {!filtered.length && <div className="gallery-empty"><p>No stories in this selection.</p><button type="button" onClick={() => { setCategory("all"); setYear("all"); }}>View all stories</button></div>}
    </section>
    {photo && <PhotoDialog photo={photo} onClose={() => setPhoto(null)} onChange={setPhoto} />}
  </div>;
}
