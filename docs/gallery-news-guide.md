# Gallery & News 관리

## 현재 반영 내용

- 출처: https://mesy.hanyang.ac.kr/gallery-news
- 2021년 8건, 2022년 2건. 사진 15장과 원문에 연결된 YouTube 영상 2개.
- 원문의 한국어 제목/본문과 행사 날짜를 보존했다. 일부 제목은 목록 가독성을 위해 축약했다.
- MSC 소식은 게시일이 2021-02-23이지만 원문 본문에 대회 연도가 2020으로 표기되어 있어 그대로 보존했다. 영상 제목은 MSC 2021이다.
- 기존 사진은 `public/media/news/archive/`, 글은 `src/data/galleryArchive.json`에 있다.
- 원본 Google Sites 이미지의 임시 URL에 의존하지 않는다. 원문 바로가기는 각 게시물에 남긴다.

## 추천 운영 방식

사용할 Drive 폴더는 다음으로 지정되어 있다:

- https://drive.google.com/drive/folders/1Gu3HzY7zMQYlBWwYUgJ8juNDqVsgCAC_
- 설정 파일: `config/gallery-source.json`
- 선택한 연결 방식: `google-drive-api`. PC 동기화 없이 배포 서버에서 가져온다. 이는 연결 완료 상태를 뜻하지 않는다.
- 브라우저에서 `Gallery & News` 폴더와 안내 파일 1개를 확인했다. 확인 당시 게시물 하위 폴더는 없었다.
- Google Drive API와 서비스 계정 설정, 지정 폴더의 뷰어 권한 부여, GitHub Secret 등록을 완료했다. 일반 액세스는 제한됨을 유지한다.
- 실제 Google 인증과 폴더 메타데이터 접근을 검증했고, 사용자 승인 후 자동 업데이트 설정과 최초 홈페이지 배포를 완료했다. 결과는 아래 현황에서 구분한다.

Drive에 게시물별 폴더를 만들고, `post.json`과 사진/영상을 함께 넣는다. 사진만으로는 정확한 날짜와 제목, 공개 여부를 알 수 없으므로 작은 메타데이터 파일 하나를 사용한다.

현재 코드는 **Drive API 읽기 전용 가져오기와 예약 배포**를 지원한다. 실제 인증, 빈 게시물 목록 가져오기, 홈페이지 배포를 검증했다. Drive에 게시물 하위 폴더가 없어 실제 새 게시물의 JSON/미디어 다운로드는 아직 검증하지 않았다. 공개 페이지는 기존 10건을 그대로 표시한다. 폴더를 전체 공개할 필요는 없다. 다만 가져온 공개 게시물의 파일은 웹사이트에서 공개된다.

## 클라우드 연결: 처음 한 번만 설정

1. Google Cloud 프로젝트에서 **Google Drive API**를 사용 설정하고 홈페이지용 서비스 계정을 만든다. 프로젝트 Owner/Editor 역할이나 도메인 전체 위임은 필요하지 않다.
2. 위 Drive 폴더의 공유 대상에 서비스 계정 이메일을 **뷰어**로 추가한다. 다른 개인/연구 자료 폴더는 공유하지 않는다. 기관 정책상 서비스 계정 공유가 제한되면 관리자 확인이 필요하다.
3. 서비스 계정의 JSON 키를 발급받아 GitHub 저장소의 Settings → Secrets and variables → Actions → Secrets에 `GALLERY_DRIVE_SERVICE_ACCOUNT`라는 이름으로 등록한다. **키는 채팅, 저장소, public 폴더에 넣지 않는다.** 계정의 이메일만 공유 설정에 사용한다.
4. 같은 화면의 Variables에 `GALLERY_SYNC_MODE` = `google-drive-api`를 등록한다. 이 값은 비밀키가 아니라 자동 가져오기 활성화 스위치다.
5. 코드 변경을 기존 배포 저장소에 반영한 뒤 Actions의 기존 Deploy workflow를 수동 실행해 확인한다. 이후 매시 23분(UTC 기준)에 가져오기/빌드/배포가 예약된다. GitHub 실행 지연이나 예약 실행 정책에 따라 늦어지거나 중단될 수 있으므로 즉시 반영을 보장하지는 않는다.

예약 배포는 활성화 변수 없이는 실행하지 않는다. 일반 main 푸시/수동 배포는 그대로 동작한다. `GALLERY_SYNC_MODE`를 켜고 키를 누락하거나 Drive 읽기에 실패하면 빌드가 실패하며 이전 운영 배포는 유지된다. 자동 동기화를 끄려면 활성화 변수를 제거한다. 그 후 동기화 없이 다시 배포하면 저장소에 체크인된 게시물 상태로 돌아가므로 마지막 클라우드 목록을 유지하려면 먼저 체크인해야 한다.

### 연결 설정 현황

- Cloud 프로젝트: `gen-lang-client-0414457231`. Google Drive API 사용 설정 완료.
- 서비스 계정: `mesy-gallery-reader@gen-lang-client-0414457231.iam.gserviceaccount.com`. 프로젝트 IAM 역할 없이 지정 Gallery 폴더의 뷰어 권한만 부여했다.
- 사용자가 JSON 키를 발급받고 저장소 Secret `GALLERY_DRIVE_SERVICE_ACCOUNT`에 직접 등록했다. 키 내용은 코드나 문서에 저장하지 않는다.
- `codex/drive-connection-check` 브랜치의 별도 workflow는 인증, 폴더 유효성, 바로 아래 항목 수만 확인한다. 파일명이나 비밀키는 로그에 출력하지 않고, 미디어 다운로드나 Drive 변경, 홈페이지 배포도 하지 않는다.
- 2026-09-17 사용자가 Secret의 JSON 내용을 갱신한 뒤 [연결 검사 재실행](https://github.com/mesy-lab/website/actions/runs/35183344740/job/105081292378)이 성공했다. Google 인증, 지정 폴더 접근, 항목 목록 조회를 검증했다. 항목 1개와 바로 아래 하위 폴더 0개를 확인했다. 미디어 다운로드, Drive 파일 변경, 홈페이지 배포는 수행하지 않았다. 로컬 모의 응답 테스트 3개도 통과했다.
- 2026-09-17 사용자 승인 후 `GALLERY_SYNC_MODE=google-drive-api`를 등록하고 [최초 운영 배포](https://github.com/mesy-lab/website/actions/runs/35184105009)를 완료했다. 서버 검사 12개, Drive 가져오기, 빌드, GitHub Pages 배포가 모두 통과했다. 가져온 공개 게시물/미디어는 0개이며 기존 아카이브 10건은 유지했다.
- 공개 주소: https://mesy-lab.github.io/website/gallery-news/ . 공개 페이지의 사진 로딩, 연도 필터, 사진 확대와 넘김을 검증했다. 기존 `mesy.hanyang.ac.kr` 도메인이나 원본 사이트는 변경하지 않았다.
- 예약 실행은 매시 23분이며 GitHub 실행 지연이 발생할 수 있다. 예약 설정은 활성화했지만 첫 예약 실행 자체를 기다려 확인한 것은 아니다.

공식 참고: [서비스 계정 인증](https://developers.google.com/identity/protocols/oauth2/service-account), [Drive 파일 목록](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list), [Drive 파일 다운로드](https://developers.google.com/workspace/drive/api/guides/manage-downloads).

## 폴더 규칙

```text
Gallery News/
  2022-03-04-lab-event/
    post.json
    01.jpg
    02.png
    03.mp4
```

폴더 이름은 영문 소문자, 숫자, 하이픈으로 작성하며 게시물 ID로 사용한다. Drive 안에 같은 이름의 게시물 폴더가 두 개 있으면 안 된다. 기존 아카이브와 같은 ID는 중복 게재하지 않고 Drive 글로 대체한다. 파일 이름은 숫자순으로 정렬되며, 첫 파일이 대표 미디어가 된다. JPEG/PNG/WebP 이미지와 MP4/WebM 영상을 지원한다. 영상은 브라우저 호환성이 좋은 H.264/AAC MP4를 권장한다. 큰 영상은 YouTube를 권장하며 개별 파일은 50 MB 이하여야 한다.

지정한 최상위 폴더 바로 아래에 게시물 폴더를 둔다. 별도 연도 폴더를 추가하거나 바로가기를 넣지 않는다. 클라우드에서 한 번에 가져오는 미디어 합계는 500 MB로 제한한다. `post.json`은 Google Docs 문서가 아닌 실제 JSON 파일이어야 한다. Drive에서 같은 이름의 파일을 중복 생성하지 않도록 기존 파일의 버전을 갱신한다.

`post.json` 예시 (샘플이며 실제 게시물 아님):

```json
{
  "published": false,
  "date": "2022-03-04",
  "title": "행사 제목",
  "category": "lab-life",
  "body": "행사 소개와 참여 내용",
  "youtube": []
}
```

- 확인 완료 후 `published`를 `true`로 바꾼다. `post.json`이 없거나 공개하지 않은 폴더는 제외된다.
- 분류: `news`, `publication`, `award`, `conference`, `lab-life`.
- 여러 날의 행사는 선택 필드 `endDate`에 마지막 날을 `YYYY-MM-DD`로 기입한다.
- `youtube`에는 영상 주소의 11자리 ID를 배열로 넣는다. 예: `["NLL3g8xb5E8"]`. 로컬 미디어 다음에 표시된다.
- 원문 링크는 선택 필드 `sourceUrl`에 HTTPS 주소로 넣는다.
- 사진/영상이 없어도 텍스트만 있는 게시물을 지원한다. 사진 속 인물의 공개 동의를 먼저 확인한다.
- 선택한 게시물 폴더 안의 지원 형식 파일은 모두 공개 대상이다. 개인정보, 초안, 비공개 파일은 같은 폴더에 넣지 않는다.

## 기존 10건을 Drive로 이전

`npm run gallery:export`는 `exports/gallery-drive-upload` 아래에 기존 ID를 이름으로 사용하는 게시물 폴더 10개를 만든다. 각 폴더의 `post.json`과 사진 15장, YouTube ID 2개는 기존 아카이브와 같은 순서와 내용을 보존한다. 이미 출력 폴더가 있으면 덮어쓰지 않으며 다른 경로를 인수로 지정할 수 있다.

`gallery-drive-upload` 안의 **10개 폴더만** 지정 Drive 폴더 바로 아래에 올린다. 바깥 폴더나 ZIP 자체를 올리지 않는다. `post.json`의 `mediaAlt`는 사진 파일명 또는 영상 ID별 대체 설명이다. 해당 사진이 누락되거나 중복되면 가져오기를 중단해 미완료 업로드가 기존 표시를 바꾸지 않게 한다. 사진 파일명을 바꿀 때 이 필드도 함께 수정한다.

이전 중에는 같은 ID의 Drive 글이 아카이브보다 우선하고, 아직 없는 글은 아카이브로 표시한다. 따라서 전부 업로드해도 20건이 아니라 기존과 같은 10건으로 표시된다. **이 백업 정책에서는 Drive에서 기존 글을 삭제하거나 비공개로 바꾸면 원래 아카이브 글이 다시 나타난다.** 실제 10건 업로드를 검증한 뒤 Drive 전용 관리로 전환하는 것이 다음 단계다. 새 게시물에는 이 아카이브 백업이 없다.

왕복 변환 테스트는 실제로 생성한 폴더를 로컬 및 모의 Drive 가져오기로 읽고 날짜, 제목, 본문, 분류, 원문 링크, 미디어 순서, 대체 설명과 사진 바이트를 비교한다. 실제 Drive 업로드 후의 다운로드 검증과는 구분한다.

## 개발 PC에서 가져오기

클라우드 방식은 PC Drive 동기화가 필요 없다. 개발 환경에 `GALLERY_DRIVE_SERVICE_ACCOUNT`를 비밀 환경변수로 주입한 뒤 다음을 실행한다. `.env` 자동 로딩은 사용하지 않는다.

```powershell
npm run gallery:sync:drive
npm run dev
```

빌드할 때도 가져오려면 `GALLERY_SYNC_MODE=google-drive-api`를 환경변수로 지정한다. 인증 설정이 없다면 일반 빌드는 기존 콘텐츠로 정상 동작하며 클라우드 가져오기는 실행하지 않는다.

## 선택 사항: 로컬 동기화 방식

프로젝트 터미널에서 실제로 사용할 동기화 폴더를 지정한다:

```powershell
npm run gallery:sync -- "G:\내 드라이브\Gallery News"
npm run dev
```

또는 PowerShell 세션에 경로를 설정하면 빌드 전 자동으로 가져온다:

```powershell
$env:GALLERY_SOURCE_DIR = "G:\내 드라이브\Gallery News"
npm run build
```

위 경로는 예시일 뿐이다. 현재 선택한 운영 방식은 클라우드 API이므로 이 로컬 경로 설정은 필요하지 않다.

## 원본 및 공개 범위

가져오기는 Drive 원본을 수정하지 않는다. 날짜/파일/메타데이터에 오류가 있으면 실패하며 기존 목록을 유지한다. 성공하면 `src/data/galleryImported.json`을 새 폴더 내용으로 교체하고 미디어를 `public/media/news/imported/`에 복사한다. 삭제하거나 비공개로 바꾼 글은 다음 가져온 목록에서 빠지지만, 기존 10건은 위 이전용 백업 정책에 따라 아카이브로 표시된다. 이미 복사한 파일은 보수적으로 자동 삭제하지 않으므로 공개 파일 제거가 필요하면 따로 정리하고 재배포해야 한다. 빈 폴더를 가져오면 가져온 목록은 비워지며 기존 2021~2022 아카이브는 유지된다.

클라우드 CI 가져오기 결과는 배포 산출물에만 포함되고 Git 저장소에 자동 커밋하지 않는다. 기존 아카이브 10건은 Drive 내용과 별도로 유지된다. 오래된 공개 미디어의 제거가 필요한 경우 위 파일 정리 주의사항을 따른다. 위 GitHub Pages 공개 주소에서 운영하며 기존 학교 도메인 연결은 별도 작업이다.

## 검증

```powershell
npm run test:gallery
npm run build
node scripts/generate-pages.mjs
```
