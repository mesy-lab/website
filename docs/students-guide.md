# Students 학생 소개 작성 안내

원본 폴더: https://drive.google.com/drive/folders/1tvbfXxbDsGjE8nlqBzUsm9NljOYzbj4x

현재 세 학생 폴더에 편집용 Google Docs **Profile**을 준비했습니다. 학생은 본계정으로 접속한 상태에서 본인 폴더의 Profile을 열어 수정하면 됩니다. 학생 개인 계정에는 별도의 편집 권한을 부여하지 않습니다. 같은 폴더의 `profile-template.txt`는 최초 양식 참고용이며 홈페이지는 읽지 않습니다. 세 학생의 biography를 작성했으며 공개 상태는 모두 `true`입니다. 사진은 아직 지정하지 않아 홈페이지에서 이름 이니셜을 표시합니다.

## 학생이 수정하는 방법

학생마다 영문 이름으로 된 폴더 하나를 사용합니다. 예: `jaeyong-lee`.
폴더 이름은 영문 소문자·숫자·하이픈을 사용하며 같은 이름을 중복 생성하지 않습니다.

각 학생 폴더에는 다음을 넣습니다.

- Google Docs 문서 **Profile** 1개: 아래 양식을 복사해 작성합니다.
- 증명사진 또는 얼굴이 잘 보이는 사진: `photo.jpg`, `photo.png`, `photo.webp` 등.

문서 대신 UTF-8 `profile.txt` 파일을 사용해도 됩니다. 새 초안 `profile.txt`를 Google Docs로 변환했다면 제목을 **Profile**로 바꾸고 원래 txt 파일은 `profile-template.txt`로 이름을 바꿉니다. **Profile과 profile.txt를 동시에 두면 동기화가 중단됩니다.** Google Docs에서는 첫 번째 문서 탭의 일반 본문으로 작성하고, 표·그림·페이지 머리말 안에 양식을 넣지 않습니다.

```text
published: false
name: Your English Name
nameKo: 한글 이름
level: ms
email: your-email@hanyang.ac.kr
photo: photo.jpg
research: Robot mechanism design; Mobile robot systems
order: 10
---
[NAME] received the B.S. degree in [DEGREE] from [UNIVERSITY], [CITY], [COUNTRY], in [YEAR].

[NAME] is currently pursuing the M.S. degree in mechanical engineering at Hanyang University, ERICA Campus, South Korea. [NAME]'s research interests include [RESEARCH INTERESTS].
```

1. 이름·과정·이메일을 확인합니다. `nameKo`, `email`, `photo`, `research`는 빈칸이어도 됩니다.
2. `level`은 박사 `phd`, 석사 `ms`, 석박통합 `integrated`, 학부연구생 `undergraduate` 중 하나입니다.
3. `photo`에는 사진의 정확한 파일명을 넣습니다. 사진이 없으면 비워두며 홈페이지는 이름 이니셜을 표시합니다. 지정한 사진만 공개되며 JPEG/PNG/WebP, 최대 10 MB를 지원합니다. 세로 사진을 권장합니다.
4. `research`는 연구 관심 분야를 세미콜론(`;`)으로 구분합니다. 최대 8개입니다.
5. `order`는 같은 과정 안에서 표시 순서입니다. 작은 숫자가 먼저이며 같으면 영문 이름순입니다. 기존 학생의 순서는 유지합니다.
6. `---` 아래에 논문 저자 소개 형식의 영문 biography를 작성합니다. 대괄호 항목은 모두 실제 정보로 바꾸고, 예시가 본인에게 맞지 않으면 문장을 고칩니다. 사실을 확인할 수 없는 학력이나 수상 실적을 만들지 않습니다.
7. 본인 확인이 끝나면 첫 줄을 **`published: true`**로 바꿉니다. 초안은 `false`로 둡니다.

Biography는 80~150단어 정도의 3인칭 문장을 권장합니다. 학력 → 현재 과정/소속 → 연구 관심 분야 순서가 자연스럽습니다. 학부생은 취득하지 않은 학사학위를 적는 대신 현재 학부 재학과 연구 참여를 소개합니다. 석박통합생은 `integrated M.S.–Ph.D. degree`로 현재 과정을 표현합니다. 빈 줄은 홈페이지에서도 문단으로 표시됩니다.

학생 소개 페이지에 이름·학력·소개·관심 분야·선택한 사진·이메일이 공개됩니다. 생년월일, 학번, 개인 휴대전화, 집 주소는 작성하지 않습니다. 홈페이지는 문서의 텍스트만 표시하며 HTML/스크립트/서식은 실행하지 않습니다.

## 업데이트와 비공개

자동 업데이트가 활성화된 뒤에는 기존 예약 배포(매시 23분 UTC, 한국시간도 매시 23분)에서 새 문서 내용을 가져옵니다. GitHub 실행 지연으로 늦어질 수 있습니다. 저장 직후 즉시 반영되는 방식은 아닙니다.

`published: false`로 변경하거나 학생 폴더를 삭제하면 다음 성공한 배포에서 그 학생 소개가 빠집니다. 졸업한 학생을 Alumni로 자동 이전하지는 않습니다. 필요하면 Alumni를 별도로 수정합니다. 잘못된 과정, 중복 문서, 사진 누락, 형식 오류가 있으면 해당 배포를 실패시켜 기존 운영 페이지를 유지합니다. 모든 초안은 공개 목록에서 제외됩니다.

## 관리자: 첫 연결 및 운영

코드에 Students 폴더 ID가 등록되어 있으며 GitHub의 `STUDENTS_SYNC_MODE=google-drive-api`가 설정되어 있습니다. 아래 항목은 최초 연결 및 재설정 절차입니다.

1. 이 Students 폴더를 기존 홈페이지 서비스 계정 `mesy-gallery-reader@gen-lang-client-0414457231.iam.gserviceaccount.com`에 **뷰어**로 공유합니다. 일반 액세스는 제한됨을 유지합니다. 현재 이 서비스 계정의 뷰어 공유는 완료했습니다. 학생은 본계정에서 편집하며, 학생 개인 계정에 별도의 권한을 추가하지 않습니다.
2. 기존 GitHub Secret `GALLERY_DRIVE_SERVICE_ACCOUNT`를 재사용합니다. 별도 계정을 원할 때만 `STUDENTS_DRIVE_SERVICE_ACCOUNT` Secret을 등록합니다. 키를 문서나 소스 코드에 넣지 않습니다.
3. Students 폴더에 공개 준비가 끝난 프로필을 넣습니다. **현재 기본 학생 3명의 목록은 최초 성공한 동기화부터 Drive 목록 전체로 대체됩니다.** 빈 폴더나 모두 `false`인 폴더를 동기화하면 학생 목록이 비워집니다. 자동 업데이트는 준비가 끝난 뒤 켭니다.
4. 변경 코드를 배포 저장소에 반영하고 GitHub Actions Variable `STUDENTS_SYNC_MODE=google-drive-api`를 설정합니다. 기존 Gallery 설정과 독립적으로 켜고 끕니다.
5. Deploy workflow를 수동 실행해 Drive 가져오기와 배포 성공을 확인합니다. 서비스 계정은 원본 폴더를 읽기만 합니다.

학생이 Google Docs를 저장하는 중에는 미완료 문서가 읽힐 수 있으므로 큰 수정은 먼저 `published: false`로 전환하거나 별도 초안에서 완성해 본문을 교체합니다.

가져온 사진은 `public/media/students/imported/`에 저장됩니다. 다음 성공한 가져오기에서는 더 이상 참조하지 않는 가져오기 전용 사진을 제거합니다. 기존 브라우저 캐시나 이전에 다운로드된 파일까지 회수하는 것은 아닙니다. CI에서 가져온 목록은 배포 산출물에만 포함되며 Git에 자동 커밋되지 않습니다. 자동 업데이트를 끈 뒤 다시 배포하면 저장소의 프로필 목록으로 돌아갑니다.

## 로컬 사용 및 검증

```powershell
npm run students:export
# exports/students-drive-upload 아래의 학생 폴더만 Students 바로 아래에 업로드합니다.
# 이 명령은 공개되지 않는 초안을 만들며 기존 출력 폴더를 덮어쓰지 않습니다.

npm run students:sync -- "C:\path\to\Students"
# 로컬 profile.txt와 사진으로 검사합니다. Google Docs는 클라우드 방식으로 읽습니다.

npm run students:sync:drive
# 서비스 계정은 STUDENTS_DRIVE_SERVICE_ACCOUNT 또는 기존 GALLERY_DRIVE_SERVICE_ACCOUNT 환경변수로 주입합니다.

npm run test:students
npm run test:gallery
npm run build
node scripts/generate-pages.mjs
```

설정은 `config/students-source.json`, 기존 학생 정보는 `src/data/studentsArchive.json`, 가져온 목록은 `src/data/studentsImported.json`에 있습니다. 최초 동기화 전에는 기존 3명의 정보만 표시하며 실제 biography나 사진을 임의로 만들지 않습니다.

Google Docs 읽기는 [Drive files.export 공식 API](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/export)를 사용합니다. 기존 읽기 전용 인증으로 일반 텍스트를 가져옵니다.
