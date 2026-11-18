# AGENTS.md — sonia-ui

창선(ckdtjs505)의 모든 앱·웹이 함께 쓰는 디자인 시스템. AI가 이 저장소나 이걸 쓰는 프로젝트에서 일할 때의 안내.

## 이걸 "쓰는" 프로젝트에서

**`llms-full.txt` 하나만 읽으면 된다** (패키지 안: `node_modules/sonia-ui/llms-full.txt`, 웹: https://ckdtjs505.github.io/sonia-ui/llms-full.txt). 규칙·설치 레시피·모든 값·클래스가 들어 있다.

핵심 규칙:
- 색은 역할 이름(`bg-primary`, `var(--color-surface)`), 간격·모서리·글자는 이름 단계(`p-lg`, `rounded-md`, `text-title`). hex·px 직접 금지.
- 버튼·카드·태그·입력은 `sn-btn` · `sn-card` · `sn-tag` · `sn-input` 조합.
- 테마는 `<html data-theme>` 하나. 다크 모드를 따로 만들지 않는다.
- 값을 바꾸려면 프로젝트에서 덮지 말고 이 저장소를 고친다.

## 이 저장소를 고칠 때

| 바꾸려는 것 | 고칠 곳 |
|---|---|
| 색·간격·모서리·글자 값, 테마 추가 | `src/tokens/*.ts` (+ 새 테마는 `src/tokens/index.ts`의 `ThemeId`·`themeList`) |
| 요소 기본 모양 | `src/styles/base.css` |
| `sn-*` 컴포넌트 | `src/styles/components.css` |
| Expo 컴포넌트 | `src/native/*` |
| 문서 페이지 | `scripts/build-docs.ts` (랜딩은 `docs/index.html`) |
| AI 문서 | `scripts/build-llms.ts` |

그다음 `npm run build`. 아래는 **생성 파일이라 직접 고치지 않는다**: `src/css/*`, `src/tailwind/theme.css`, `src/browser/theme.js`, `src/themes.json`, `docs/docs/*`, `docs/site.css`, `docs/theme.js`, `llms.txt`, `llms-full.txt`, `docs/llms*.txt`.

확인: 빌드 후 `docs/`를 띄워(`python3 -m http.server -d docs`) 바뀐 페이지를 본다. tokens 타입 검사는 `npx tsc --ignoreConfig --noEmit --strict --module esnext --moduleResolution bundler --target esnext --skipLibCheck src/tokens/index.ts`.

배포: main에 푸시하면 GitHub Pages(`/docs`)가 갱신된다. `src/`나 `package.json`이 바뀐 푸시는 `.github/workflows/tag.yml`이 패치 태그(`v1.1.0` → `v1.1.1`)를 자동으로 올리고 jsDelivr `@1` 캐시를 비운다. **태그를 손으로 올리지 않는다.** 마이너·메이저를 올릴 때만 `package.json`의 `version`을 바꾼다(예: `1.2.0` → 다음 태그 `v1.2.0`). 쓰는 프로젝트는 `npm i github:ckdtjs505/sonia-ui`로 최신을 받는다.

쓰는 곳: self-fire(Expo, `native`), 블로그 ckdtjs505.github.io(`themes.css`), planner(`base.css`, build.mjs가 인라인), ai-tutor(Next, `base.css` + CDN `theme.js`), csfreecaTV·Momentum(CDN), 이 문서 사이트(`tailwind.css`).
