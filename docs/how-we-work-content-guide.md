# How We Work 콘텐츠 관리

## 공개 방향

세 단계는 연구실 전체의 개발 방법을 설명합니다. 공식 MESYLAB YouTube 채널에 공개된 단계별 How We Work 영상을 연결합니다.

세 단계의 영상과 기존 활동·상호 연결 설명을 함께 공개합니다. 내부 검토 상태는 화면에 노출하지 않습니다.

## 통합 영상 등록

`src/data/howWeWork.js`의 세 레코드를 사용합니다.

- `design-overview`: 요구조건, 설계, 제작과 개선을 여러 연구에서 연결
- `model-control-overview`: 모델링, 시뮬레이션, 제어 구현과 응답을 연결
- `sense-validate-overview`: 관측, 데이터 해석, 조건별 평가와 피드백을 연결

현재 세 영상은 `published: true`입니다. 공식 채널의 제목과 공개 목록을 기준으로 다음 영상에 연결했습니다.

- Design: https://www.youtube.com/watch?v=7kyg13Z_18c
- Model & Control: https://www.youtube.com/watch?v=v2xIkzz1Cws
- Sense & Validate: https://www.youtube.com/watch?v=IkMwZ56pdAg

전체 영상을 사용하며 시작·종료 구간은 지정하지 않습니다.
영상 제목은 특정 프로젝트명이 아닌 단계 전체를 설명하는 제목으로 작성합니다.

### YouTube 편집본

`provider: "youtube"`, 실제 `videoId`, `sourceUrl`, `displayTitle`을 입력합니다.
영상 검토 후 `verificationStatus: "verified"`, `published: true`로 설정합니다.
확인한 원본 구간만 `startSeconds`, `endSeconds`에 입력합니다. 전체 영상은 `null`을 유지합니다.

### 로컬 편집본

완성한 MP4 파일을 `public/media/`에 넣고 다음처럼 등록합니다.

```js
{
  provider: "local",
  localSrc: "/media/design-overview.mp4",
  posterSrc: "/media/design-overview.jpg",
  captionsSrc: "/media/design-overview.en.vtt",
  displayTitle: "Design at MESY Lab",
  verificationStatus: "verified",
  published: true,
}
```

포스터와 자막은 선택 사항이며 없으면 `null`로 둡니다. 로컬 영상의 구간 편집은 파일 자체에서 완료합니다.
YouTube 원본과 개인 보유 영상을 합쳐 제작해도 최종 편집본 하나만 등록하면 됩니다.
한 편을 열면 기존 플레이어가 제거되며, 클릭 후 재생은 음소거로 시작합니다.
기존 단계 설명은 영상이 등록되어도 유지됩니다. 필요하면 `notes`에서 통합 영상의 관찰 포인트로 바꿀 수 있습니다.

### 숨김

`published: false`로 바꾸면 영상만 숨깁니다. 확인 상태가 미확인이거나 필수 재생 정보가 없을 때도 숨깁니다.
내부 메모 `verificationNotes`에는 사용 원본, 확인 범위, 출처를 기록합니다.

## 편집 구성 제안

각 30~60초. 아래 시간은 **새 편집본 안의 권장 배분**이며 실제 원본 타임스탬프가 아닙니다.
아래는 향후 영상 재편집 시 참고할 구성입니다. 현재 연결된 공개 영상에는 이 구간을 적용하지 않습니다.

| 단계 | 권장 흐름 (약 50초 기준) | 추가 촬영 후보 | 영문 자막 제안 | 짧은 설명 |
| --- | --- | --- | --- | --- |
| Design | 0–8초 요구조건, 8–22초 여러 설계·기구 개념, 22–40초 제작·조립·동작, 40–50초 수정 과정 | 스케치, CAD, 조립, 서로 다른 플랫폼의 프로토타입 | Requirements / Concepts / Prototypes / Refinement | From research questions to physical systems. |
| Model & Control | 0–10초 시스템 모델, 10–20초 제어 목표, 20–40초 시뮬레이션·동작, 40–50초 응답과 모델 수정 | 여러 시스템 모델, 목표와 실제 응답 비교, 제어 구현 | Model / Simulate / Control / Refine | Connecting physical design with system behavior. |
| Sense & Validate | 0–10초 관측·평가 환경, 10–23초 데이터, 23–40초 처리·평가 결과, 40–50초 다음 개선 | 센서 장착, 측정, 반복 평가, 설계·제어 수정 토의 | Observe / Interpret / Evaluate / Improve | Turning observations into the next system improvement. |

활용 원본은 공식 채널 자료와 연구실 보유 로컬 영상 중 각 단계의 설명에 맞는 장면으로 선정합니다.
하나의 연구만 지속적으로 등장하지 않도록 다양한 장면을 연결합니다.
시뮬레이션·실험·현장 촬영은 장면마다 구분하고, 정량 근거 없이 개선율이나 검증 완료를 주장하지 않습니다.

## 로고

첨부한 네 원본을 `public/branding/001.png`~`004.png`에 보존했습니다.
`LabLogo` 컴포넌트가 비율을 유지하면서 투명 캔버스 여백을 CSS로 가립니다.

- 004: 밝은 배경의 공통 헤더
- 002: 공통 푸터의 파란색 전체 로고
- 001: How We Work 상단의 파란색 심볼
- 003: Research 상단의 밝은 배지 안 심볼

자산 링크는 `withBase`를 거치므로 배포 하위 경로를 따릅니다.

## 상호 연결 차트

세 단계를 양방향으로 연결합니다. 각 노드는 해당 상세 섹션으로 이동합니다.
데스크톱은 삼각형 관계도, 모바일은 공통 피드백선으로 연결한 세 단계로 표시하며,
아래 설명에서 각 쌍이 주고받는 정보를 구체적으로 밝힙니다.
