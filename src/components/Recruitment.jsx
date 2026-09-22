import React from "react";
import { ArrowRight, ArrowUpRight, MapPin, X } from "lucide-react";
import "./recruitment.css";

const KIMM_SCHOOL_URL = "https://www.kimm.re.kr/kimmschool/";
const POPUP_SEEN_KEY = "mesy-recruitment-2026-seen";

function SchoolLink() {
  return <a className="recruit-button recruit-button-secondary" href={KIMM_SCHOOL_URL} target="_blank" rel="noopener noreferrer">About KIMM School <ArrowUpRight size={17} aria-hidden="true" /></a>;
}

function ResearchTopic() {
  return <><span className="recruit-topic-en" lang="en">AI-based Reliability of Mechanical &amp; Mechatronic Systems</span><strong>AI 기반 기계·메카트로닉스 시스템 신뢰성 확보 연구</strong></>;
}

export function RecruitmentPopup({ withBase }) {
  const dialogRef = React.useRef(null);

  React.useEffect(() => {
    try {
      if (sessionStorage.getItem(POPUP_SEEN_KEY)) return;
    } catch { /* The notice remains usable when browser storage is unavailable. */ }
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const restoreScroll = () => { document.body.style.overflow = previousOverflow; };
    const handleClose = () => { if (!dialog.open) restoreScroll(); };
    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.close();
      restoreScroll();
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  const dismiss = () => {
    try { sessionStorage.setItem(POPUP_SEEN_KEY, "true"); } catch { /* Storage is optional. */ }
    dialogRef.current.close();
  };

  return (
    <dialog className="recruit-dialog" ref={dialogRef} aria-labelledby="recruit-popup-title" lang="ko" onCancel={(event) => { event.preventDefault(); dismiss(); }}>
      <div className="recruit-popup-topline">
        <span lang="en">MESY LAB · HANYANG UNIVERSITY ERICA</span>
        <button className="recruit-close" type="button" onClick={dismiss} aria-label="모집 안내 닫기" autoFocus><X size={22} aria-hidden="true" /></button>
      </div>
      <div className="recruit-popup-content">
        <p className="recruit-eyebrow" lang="en">Graduate Student Recruitment</p>
        <h2 id="recruit-popup-title">한양대학교 대학원 학위와<br /><span>한국기계연구원 연구경험을 함께</span></h2>
        <p className="recruit-popup-lead">MESY Lab에서 <strong>2027년 3월 입학 예정자</strong>를 대상으로<br /><strong>석사·박사과정 대학원생 / KIMM 학생연구원</strong>을 모집합니다.</p>
        <p>선발된 학생은 <strong>한양대학교 ERICA 기계공학과 석·박사과정</strong>에 입학하여 학위과정을 이수하면서, <strong>한국기계연구원(KIMM) 신뢰성연구센터에서 학생연구원으로 실제 연구를 수행</strong>하게 됩니다.</p>
        <div className="recruit-topic"><p className="recruit-eyebrow" lang="en">Research Topic</p><ResearchTopic /></div>
        <p>대학원 학위뿐 아니라 <strong>정부출연연구기관의 연구환경에서 실제 R&amp;D 경험을 함께 쌓고 싶은 학생</strong>을 기다립니다.</p>
        <p className="recruit-location"><MapPin size={17} aria-hidden="true" /><span><span lang="en">Research Location</span> · 한국기계연구원(KIMM), 대전</span></p>
      </div>
      <div className="recruit-popup-footer">
        <div className="recruit-actions">
          <a className="recruit-button recruit-button-primary" href={withBase("/recruit")} onClick={dismiss}>Learn More &amp; Apply <ArrowRight size={18} aria-hidden="true" /></a>
          <SchoolLink />
        </div>
        <button className="recruit-dismiss" type="button" onClick={dismiss}>닫고 홈페이지 둘러보기</button>
      </div>
    </dialog>
  );
}

export default function Recruitment({ withBase }) {
  React.useEffect(() => {
    const previousTitle = document.title;
    document.title = "Graduate Student Recruitment | MESY Lab";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <article className="recruit-page" lang="ko">
      <header className="recruit-hero">
        <div className="recruit-wrap">
          <p className="recruit-eyebrow" lang="en">KIMM School × Hanyang University ERICA MESY Lab</p>
          <h1 lang="en">Graduate Student<br />Recruitment</h1>
          <p><strong>2027년 3월 입학 예정자 모집</strong></p>
          <h2>대학원 학위과정과 한국기계연구원 연구를<br className="recruit-desktop-break" /> 함께 경험할 대학원생을 모집합니다.</h2>
          <p>한양대학교 ERICA MESY Lab에서는 한국기계연구원(KIMM)과 연계하여 <strong>AI 기반 기계·메카트로닉스 시스템의 신뢰성 확보 기술</strong>을 연구할 석사·박사과정 대학원생을 모집합니다.</p>
          <p>선발된 학생은 <strong>한양대학교 ERICA 기계공학과 대학원에 소속되어 석사 또는 박사학위를 이수</strong>하는 동시에, <strong>한국기계연구원 신뢰성연구센터에서 KIMM 학생연구원으로 연구를 수행</strong>하게 됩니다.</p>
          <div className="recruit-actions"><a className="recruit-button recruit-button-primary" href="#apply">지원 방법 알아보기 <ArrowRight size={18} aria-hidden="true" /></a><SchoolLink /></div>
          <p className="recruit-location"><MapPin size={17} aria-hidden="true" />Research Location · 한국기계연구원(KIMM), 대전</p>
        </div>
      </header>

      <div className="recruit-wrap">
        <section className="recruit-section" aria-labelledby="recruit-area">
          <div className="recruit-section-label"><span>01 / RESEARCH</span><h2 id="recruit-area">Research Area</h2></div>
          <div className="recruit-section-copy">
            <div className="recruit-topic"><ResearchTopic /></div>
            <p>기계·메카트로닉스 시스템에 AI, 데이터 기반 분석 및 동역학·제어 기술을 접목하여 시스템의 상태를 분석하고, 고장을 예측하며, 신뢰성을 향상시키기 위한 연구를 수행합니다.</p>
            <p>세부 연구주제는 지원자의 전공과 관심 분야, KIMM 연구과제와의 연계성을 고려하여 결정합니다.</p>
          </div>
        </section>

        <section className="recruit-section" aria-labelledby="recruit-program">
          <div className="recruit-section-label"><span>02 / PROGRAM</span><h2 id="recruit-program">Program</h2></div>
          <dl className="recruit-program-grid">
            <div><dt>Degree</dt><dd><strong>한양대학교 ERICA 기계공학과</strong><br />석사과정 또는 박사과정</dd></div>
            <div><dt>Research Position</dt><dd><strong>한국기계연구원(KIMM)</strong><br />학생연구원</dd></div>
            <div><dt>Research Location</dt><dd><strong>한국기계연구원(KIMM), 대전</strong><br />신뢰성연구센터</dd></div>
            <div><dt>Advisor</dt><dd>한양대학교 ERICA 기계공학과 MESY Lab<br /><strong>박지혁 교수</strong></dd></div>
          </dl>
        </section>

        <section className="recruit-section" aria-labelledby="recruit-why">
          <div className="recruit-section-label"><span>03 / EXPERIENCE</span><h2 id="recruit-why">Why This Program?</h2></div>
          <div className="recruit-section-copy">
            <p>이 프로그램은 일반적인 대학원 과정과 달리, <strong>한양대학교의 대학원 교육 및 학위과정</strong>과 <strong>한국기계연구원의 실제 연구개발 환경</strong>을 동시에 경험할 수 있습니다.</p>
            <div className="recruit-experience"><div><span>HANYANG UNIVERSITY ERICA</span><strong>대학원 교육 · 학위과정</strong></div><span className="recruit-plus" aria-hidden="true">+</span><div><span>KIMM · 대전</span><strong>연구과제 참여 · 실제 R&amp;D</strong></div></div>
            <p>학생은 KIMM의 연구자들과 함께 연구과제에 참여하며, 실제 산업 및 연구현장에서 요구되는 문제를 다루게 됩니다.</p>
            <p>이를 통해 학위논문과 학술논문뿐 아니라 <strong>정부출연연구기관의 연구개발 프로세스와 협업 경험</strong>을 함께 쌓을 수 있습니다.</p>
          </div>
        </section>

        <section className="recruit-section" aria-labelledby="recruit-students">
          <div className="recruit-section-label"><span>04 / YOU</span><h2 id="recruit-students">We are looking<br /> for students who...</h2></div>
          <div className="recruit-section-copy">
            <p>이런 학생을 환영합니다.</p>
            <ul className="recruit-student-list">
              <li>기계공학, 메카트로닉스, 로봇, 제어, AI 및 데이터 기반 공학 분야에 관심이 있는 학생</li>
              <li>AI를 단순히 적용하는 것을 넘어, 실제 기계시스템의 문제를 해결하는 연구에 관심이 있는 학생</li>
              <li>연구실 안에서만 이루어지는 연구보다 실제 연구기관 및 연구과제와 연결된 연구를 경험하고 싶은 학생</li>
              <li>석사 또는 박사과정을 통해 전문적인 연구역량을 갖추고 싶은 학생</li>
            </ul>
            <p className="recruit-note">관련 연구경험이 반드시 필요한 것은 아닙니다.<br /><strong>연구에 대한 관심과 적극적인 자세를 중요하게 생각합니다.</strong></p>
          </div>
        </section>

        <section className="recruit-section" aria-labelledby="recruit-openings">
          <div className="recruit-section-label"><span>05 / OPENINGS</span><h2 id="recruit-openings">Recruitment</h2></div>
          <div className="recruit-section-copy">
            <dl className="recruit-program-grid recruit-openings"><div><dt>입학 시기</dt><dd><strong>2027년 3월</strong></dd></div><div><dt>모집과정</dt><dd><strong>석사과정 / 박사과정</strong></dd></div><div><dt>모집인원</dt><dd><strong>○명</strong><br /><span>현재 최대 3명 내외 선발 예정</span></dd></div></dl>
            <p>상시 상담이 가능하며, 대학원 입학 및 KIMM 학생연구원 선발 일정에 따라 최종 선발 절차가 진행됩니다.</p>
          </div>
        </section>
      </div>

      <section className="recruit-apply" id="apply" aria-labelledby="recruit-apply-title">
        <div className="recruit-wrap recruit-section">
          <div className="recruit-section-label"><span>06 / NEXT STEP</span><h2 id="recruit-apply-title">How to Apply</h2></div>
          <div className="recruit-section-copy">
            <p>관심 있는 학생은 아래 자료를 준비하여 MESY Lab으로 연락해 주세요.</p>
            <ul className="recruit-materials"><li>간단한 자기소개</li><li>CV 또는 이력서</li><li>성적표</li><li>관심 연구분야</li></ul>
            <p>정식 지원 전에도 <strong>연구내용, 대학원 진학 및 KIMM 학생연구원 과정에 대한 상담이 가능합니다.</strong></p>
            <div className="recruit-actions"><a className="recruit-button recruit-button-primary" href={withBase("/contact")}>Contact MESY Lab <ArrowRight size={18} aria-hidden="true" /></a><SchoolLink /></div>
            <p className="recruit-email">지원 자료 및 문의: <a href="mailto:jihyuk@hanyang.ac.kr">jihyuk@hanyang.ac.kr</a></p>
          </div>
        </div>
      </section>
    </article>
  );
}
