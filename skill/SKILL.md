---
name: sonia-ui
description: 창선의 디자인 시스템 sonia-ui로 화면을 만들거나 기존 프로젝트에 붙인다. 새 앱·웹·페이지·컴포넌트 UI를 만들 때, 색·테마·다크 모드·버튼·카드 스타일을 다룰 때, '/sonia-ui', 'sonia-ui로 만들어줘', '테마 붙여줘', '디자인 통일해줘' 요청 시. 회사·남의 저장소 UI에는 쓰지 않는다.
---

# sonia-ui

창선의 모든 앱·웹은 sonia-ui로 같은 색·간격·글자·컴포넌트를 쓴다. UI를 만들 때 직접 색을 고르지 않는다.

## 1. 레퍼런스 읽기

먼저 전체 레퍼런스를 읽는다 (규칙·설치 레시피·모든 값·클래스):
- 로컬: `/Users/changsun/Desktop/web/sonia-ui/llms-full.txt` (있으면 이걸)
- 프로젝트에 설치돼 있으면: `node_modules/sonia-ui/llms-full.txt`
- 없으면: https://ckdtjs505.github.io/sonia-ui/llms-full.txt

## 2. 프로젝트 종류에 맞는 입구 고르기

| 프로젝트 | 할 일 |
|---|---|
| 설치 없는 HTML·데모·Artifact 아닌 정적 페이지 | CDN 두 줄 (`base.css` + `theme.js`) |
| Tailwind v4 | `npm i github:ckdtjs505/sonia-ui` → CSS에 `@import "sonia-ui/tailwind.css";` |
| Tailwind v3 | v4로 올릴지 먼저 묻는다. 안 올리면 `sonia-ui/base.css`를 쓰고 Tailwind 색 대신 `sn-*`·변수 |
| Tailwind 없는 웹 (Next·Vite·순수 HTML) | `import "sonia-ui/base.css"` (+ 테마 선택이 필요하면 `sonia-ui/theme.js`) |
| 한 파일로 빌드하는 페이지 | 빌드 때 `node_modules/sonia-ui/src/css/base.css`를 인라인 (planner의 build.mjs 참고) |
| Expo | `sonia-ui/native` (`ThemeProvider` · `Box` · `Text`) |

Next는 `transpilePackages: ["sonia-ui"]`, Jest는 `transformIgnorePatterns`에 `sonia-ui`.

## 3. 기존 프로젝트에 붙일 때

1. 프로젝트의 색 변수(`--bg`, `--accent` 등)를 sonia-ui 변수에 연결한다: `--bg: var(--color-background)`.
2. CSS·JS에서 하드코딩된 색을 찾아(`grep -rnE "#[0-9a-fA-F]{6}|rgba?\("`) 역할로 바꾼다. 강조색 투명도는 `color-mix(in srgb, var(--color-primary) N%, transparent)`.
3. 뜻이 있는 색(우선순위·캘린더·차트·성공/경고)은 프로젝트 것을 두고, 밝기별 두 벌을 `:root[data-scheme="dark"]`로 나눈다.
4. 코드 하이라이트·다이어그램처럼 외부 테마에 묶인 영역은 어둡게 고정하고 이유를 주석으로 남긴다.
5. 헤더에 테마 선택(`<select data-theme-select>` + `theme.js`, 또는 `themeList`로 만든 select)을 붙이고, 그리기 전에 저장된 테마를 적용한다.
6. 휴대폰 폭(375px)에서 헤더가 넘치지 않는지 본다.

## 4. 새 화면을 만들 때

- 색: 역할 이름만 (`background` `surface` `surface-muted` `foreground` `muted` `border` `primary` `primary-soft` `on-primary` `flame`)
- 간격: `xs s md lg xl xxl hg` · 모서리: `xs sm md lg xl pill` · 글자: `display title heading body stat label caption overline micro`
- 컴포넌트: `sn-btn`(+`-primary|-soft|-outline|-ghost`, `-sm|-lg|-pill`) · `sn-card`(+`-muted`) · `sn-tag`(+`-muted`) · `sn-input`
- 다크 모드 분기 금지. 테마가 해결한다.

## 5. sonia-ui에 없는 게 필요하면

프로젝트에서 새 색·컴포넌트를 만들지 말고, sonia-ui 저장소(`/Users/changsun/Desktop/web/sonia-ui`, AGENTS.md 참고)에 추가할지 사용자에게 먼저 묻는다. 추가했으면 `npm run build` → 커밋·푸시 → 쓰는 프로젝트에서 `npm i github:ckdtjs505/sonia-ui`.
