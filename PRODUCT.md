# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **창선(ckdtjs505)**: 자기 앱·웹을 만들 때 디자인을 이 저장소 한 곳에서 정하고 가져다 쓴다.
- **AI 코딩 에이전트**(Claude Code 등): 창선의 프로젝트 안에서 `llms-full.txt` 하나만 읽고 UI를 만든다. 사람만큼 중요한 1차 사용자다.
- **외부 개발자**: 공개 문서 사이트(https://ckdtjs505.github.io/sonia-ui/)를 보고 가져다 쓴다.

## Product Purpose

창선의 모든 앱·웹이 함께 쓰는 디자인 시스템이다. 색·간격·모서리·글자 값과 `sn-*` 컴포넌트, 여러 테마를 한 곳에서 정의하고, 웹(CSS·Tailwind v4·순수 JS)과 Expo(Restyle) 양쪽에 같은 값을 내보낸다.

성공 기준(모두 해당):
- 모든 앱이 한 모습: self-fire·블로그·planner·문서 사이트가 같은 테마·컴포넌트로 통일되어 보인다.
- AI가 한 번에 맞게 쓴다: `llms-full.txt`만 읽고 hex·px 없이 규칙대로 화면을 만든다.
- 값은 여기서만 고친다: 쓰는 프로젝트가 덮어쓰지 않고, 바꿀 일은 이 저장소에서 고친다.
- 테마를 고르는 재미: 앱 이용자가 숲·바다·노을 같은 테마를 골라 쓰는 경험 자체가 가치다.

## Positioning

한 사람의 앱 묶음을 위한 시스템이라, 범용 UI 라이브러리처럼 모든 경우를 다루지 않는다. 대신 AI 에이전트가 문서 하나로 규칙을 다 알 수 있게 만들었고(`llms-full.txt`, `skill/`), 테마는 `<html data-theme>` 하나로 전환되며 다크 모드도 테마 중 하나로 다룬다.

## Operating Context

- 쓰는 곳: self-fire(Expo, `sonia-ui/native`), 블로그 ckdtjs505.github.io(`themes.css`), planner(`base.css`를 build.mjs가 인라인), 이 문서 사이트(`tailwind.css`).
- 설치: `npm i github:ckdtjs505/sonia-ui`, 또는 jsDelivr CDN `@1` 두 줄(`base.css` + `theme.js`).
- 배포: main 푸시 → GitHub Pages(`/docs`) 갱신, `src/`·`package.json` 변경 시 패치 태그 자동 + jsDelivr 캐시 비움.
- AI 연결: Claude Code 스킬(`skill/`)을 링크해 "sonia-ui로 만들어줘"로 쓴다.

## Capabilities and Constraints

- 원본은 `src/tokens/*.ts`, `src/styles/*.css`, `src/native/*`. `src/css/*`, `src/tailwind/theme.css`, `docs/docs/*`, `llms*.txt` 등은 `npm run build`로 만드는 생성 파일이다.
- 테마 9개: 라이트·다크·숲·바다·노을·세피아·잉걸불·황금 불꽃·블로그(`ThemeId`, `themeList`).
- 규칙: 색은 역할 이름(`bg-primary`, `var(--color-surface)`), 간격·모서리·글자는 이름 단계(`p-lg`, `rounded-md`, `text-title`). hex·px 직접 사용 금지. 버튼·카드·태그·입력은 `sn-btn`·`sn-card`·`sn-tag`·`sn-input`.
- Expo 쪽은 Restyle Box/Text 기반이며 글자 확대 상한(`MAX_FONT_SIZE_MULTIPLIER`)이 있다.
- 태그는 손으로 올리지 않는다. 마이너·메이저만 `package.json` `version`으로 올린다.

## Brand Commitments

- 이름: sonia-ui. 블로그 이름은 Sonia.dev.
- 문서와 README는 한국어로, 짧고 직접적인 문장으로 쓴다.
- 글꼴은 Pretendard(없으면 시스템 글꼴).

## Evidence on Hand

- 문서 사이트와 랜딩: `docs/index.html`, `docs/docs/*`.
- 화면 캡처 7장: `docs/readme/*.jpg` (랜딩 두 테마·블로그·AI·테마·팔레트·컴포넌트).
- 실제 사용처 4곳(위 Operating Context). 외부 사용자 수·후기·추천사는 없으므로 만들어 넣지 않는다.

## Product Principles

1. 한 곳에서 고친다. 값이 갈라지면 이 저장소를 고치고, 쓰는 쪽에서는 덮지 않는다.
2. AI가 읽고 바로 맞게 쓸 수 있어야 한다. 규칙은 `llms-full.txt` 하나에 다 들어 있어야 한다.
3. 테마 하나로 전체가 바뀐다. 테마별 예외 코드나 따로 만든 다크 모드는 두지 않는다.
4. 웹과 앱이 같은 값을 쓴다. 토큰은 플랫폼에 묶이지 않는다.
5. 설치 부담을 낮춘다. CDN 두 줄로도 쓸 수 있어야 한다.

## Accessibility & Inclusion

아직 정한 기준 없음(미정). 테마별 대비 기준(예: WCAG AA)은 정해지면 여기에 적는다.
