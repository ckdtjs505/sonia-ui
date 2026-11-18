// AI가 읽는 문서: llms.txt(짧은 안내) · llms-full.txt(전부). 값은 tokens에서 읽으므로 항상 실제와 같다.
// 저장소 루트(패키지에 같이 설치됨)와 docs/(사이트 https://ckdtjs505.github.io/sonia-ui/llms-full.txt)에 쓴다.
import { readFileSync, writeFileSync } from "node:fs";
import { light, themeList } from "../src/tokens/index.ts";

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const SITE = "https://ckdtjs505.github.io/sonia-ui";
const CDN = "https://cdn.jsdelivr.net/gh/ckdtjs505/sonia-ui@1";
const PRETENDARD = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";

const roles: [string, string][] = [
  ["background", "화면 바탕"], ["surface", "카드·시트처럼 떠 있는 면"], ["surface-muted", "입력창·칩·코드처럼 한 단계 들어간 면"],
  ["foreground", "본문 글자"], ["muted", "보조 글자(설명·날짜·작성자)"], ["border", "얇은 구분선·테두리"],
  ["primary", "강조·주요 버튼·링크"], ["primary-soft", "강조색을 옅게 깐 배경(선택됨·태그)"], ["on-primary", "primary 위의 글자"],
  ["flame", "두 번째 강조(불씨·스트릭·알림 점)"],
];
const scheme = (t: { barStyle: string }) => (t.barStyle === "light" ? "dark" : "light");
const textEntries = Object.entries(light.textVariants).filter(([k]) => k !== "defaults") as [string, { fontSize: number; fontWeight?: string; letterSpacing?: number }][];
const components = readFileSync(new URL("../src/styles/components.css", import.meta.url), "utf8");
const snClasses = [...new Set([...components.matchAll(/\.(sn-[a-z-]+)/g)].map((m) => m[1]))];

const colorTable = [
  `| 역할 | 쓰임 | ${themeList.map((t) => t.id).join(" | ")} |`,
  `|---|---|${themeList.map(() => "---").join("|")}|`,
  ...roles.map(([r, use]) => {
    const key = "$" + r.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return `| ${r} | ${use} | ${themeList.map((t) => (t.theme.colors as Record<string, string>)[key]).join(" | ")} |`;
  }),
].join("\n");

const short = `# sonia-ui

> 창선(ckdtjs505)의 모든 앱·웹이 함께 쓰는 디자인 시스템. 색은 역할 이름(primary, surface…)으로, 간격·모서리·글자는 이름 단계(lg, md, title…)로 쓴다. 테마 ${themeList.length}종은 \`<html data-theme>\` 하나로 바뀐다.

UI를 만들거나 고칠 때는 hex 색·px 간격을 직접 쓰지 말고 아래 이름만 쓴다. 전체 규칙과 값은 llms-full.txt에 있다.

## 문서
- [전체 레퍼런스 (AI용, 이것 하나면 됨)](${SITE}/llms-full.txt)
- [설치](${SITE}/docs/installation.html)
- [버튼 · 카드 · 태그](${SITE}/docs/components.html)
- [색](${SITE}/docs/colors.html)
- [테마](${SITE}/docs/themes.html)
- [GitHub](https://github.com/ckdtjs505/sonia-ui)

## 가장 빠른 시작 (설치 없이, 아무 HTML)
\`\`\`html
<link rel="stylesheet" href="${CDN}/src/css/base.css">
<script src="${CDN}/src/browser/theme.js"></script>
\`\`\`
`;

const full = `# sonia-ui — AI용 전체 레퍼런스

> 창선(ckdtjs505)의 모든 앱·웹이 함께 쓰는 디자인 시스템. 이 파일 하나만 읽으면 sonia-ui로 화면을 만들 수 있다.
> 자동 생성 파일(scripts/build-llms.ts). 값은 src/tokens에서 온다.

## 1. AI가 지킬 규칙

1. **색은 역할 이름으로만.** \`#58A6FF\`, \`rgba(...)\`, \`text-blue-500\` 같은 값을 쓰지 않는다. \`bg-primary\` / \`var(--color-primary)\`처럼 역할로 쓴다. 투명도가 필요하면 \`color-mix(in srgb, var(--color-primary) 20%, transparent)\` 또는 Tailwind \`bg-primary/20\`.
2. **간격·모서리·글자는 이름 단계로만.** 간격 \`${Object.keys(light.spacing).join(" ")}\`, 모서리 \`${Object.keys(light.borderRadii).join(" ")}\`, 글자 \`${textEntries.map(([k]) => k).join(" ")}\`.
3. **버튼·카드·태그·입력창은 \`sn-*\` 클래스를 먼저 쓴다.** 새로 만들지 말고 조합한다.
4. **테마는 \`<html data-theme="…">\` 하나.** 다크 모드를 따로 만들지 않는다(\`dark:\` 변형, \`prefers-color-scheme\` 분기 금지). 모든 색이 테마를 따라가므로 저절로 된다.
5. **값을 바꾸고 싶으면 프로젝트에서 덮지 말고 sonia-ui의 \`src/tokens\`·\`src/styles\`를 고친다.** 그래야 모든 앱이 같이 바뀐다.
6. **뜻이 있는 색(우선순위·캘린더·차트 계열색·성공/경고)**만 프로젝트가 따로 정할 수 있다. 그때도 밝기는 \`<html data-scheme="light|dark">\`로 나눈다.
7. 기존 프로젝트에 붙일 때는 원래 CSS 변수를 sonia-ui 변수에 연결한다(예: \`--bg: var(--color-background)\`). 하드코딩된 색은 역할로 바꾼다.

## 2. 어떤 입구를 쓰나

| 프로젝트 | 가져올 것 | 한 줄 |
|---|---|---|
| 아무 HTML (설치 없이) | CDN | \`<link rel="stylesheet" href="${CDN}/src/css/base.css">\` + \`<script src="${CDN}/src/browser/theme.js"></script>\` |
| Tailwind v4 (Vite·Next) | \`sonia-ui/tailwind.css\` | CSS에 \`@import "tailwindcss"; @import "sonia-ui/tailwind.css";\` |
| Tailwind 없는 웹 (Next·Vite·번들러) | \`sonia-ui/base.css\` | \`import "sonia-ui/base.css"\` |
| 변수만 필요 | \`sonia-ui/themes.css\` | \`import "sonia-ui/themes.css"\` |
| 테마 고르기 UI | \`sonia-ui/theme.js\` | \`import "sonia-ui/theme.js"\` 후 \`<select data-theme-select></select>\` |
| React Native (Expo) | \`sonia-ui/native\` | \`import { ThemeProvider, getTheme, Box, Text } from "sonia-ui/native"\` |
| JS에서 값이 필요 | \`sonia-ui/tokens\` | \`import { getTheme, themeList, toCssVars } from "sonia-ui/tokens"\` |
| 테마 목록(JSON) | \`sonia-ui/themes.json\` | \`[{ id, name, scheme }]\` |

설치: \`npm i github:ckdtjs505/sonia-ui\` (Expo는 \`@shopify/restyle react-native-safe-area-context\`도). TS 소스로 배포되므로 Next는 \`next.config\`에 \`transpilePackages: ["sonia-ui"]\`, Jest는 \`transformIgnorePatterns\` 허용 목록에 \`sonia-ui\`.
글꼴: \`<link rel="stylesheet" href="${PRETENDARD}">\` (없으면 시스템 글꼴).

## 3. 설치 레시피

### 아무 HTML (복사해서 바로)
\`\`\`html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="${PRETENDARD}">
  <link rel="stylesheet" href="${CDN}/src/css/base.css">
  <script src="${CDN}/src/browser/theme.js"></script>
</head>
<body>
  <main style="max-width: 640px; margin: 0 auto; padding: var(--spacing-xl) var(--spacing-lg); display: grid; gap: var(--spacing-lg);">
    <header style="display: flex; justify-content: space-between; align-items: center;">
      <h1 class="sn-text-title">제목</h1>
      <select data-theme-select class="sn-input" style="width: auto;"></select>
    </header>
    <div class="sn-card">
      <h2 class="sn-text-heading">카드</h2>
      <p class="sn-text-caption" style="color: var(--color-muted);">설명</p>
      <span class="sn-tag">태그</span>
      <button class="sn-btn sn-btn-primary">저장</button>
    </div>
  </main>
</body>
</html>
\`\`\`

### Tailwind v4
\`\`\`css
/* app.css */
@import "tailwindcss";
@import "sonia-ui/tailwind.css";
\`\`\`
\`\`\`html
<html data-theme="dark">
<div class="sn-card">
  <h1 class="text-title">안녕</h1>
  <p class="mt-xs text-caption text-muted">설명</p>
  <button class="sn-btn sn-btn-primary mt-lg">시작</button>
</div>
\`\`\`
테마 선택은 \`import "sonia-ui/theme.js"\`(클라이언트에서) + \`<select data-theme-select></select>\`.

### Next.js (App Router, Tailwind 없이)
\`\`\`js
// app/layout.js
import "sonia-ui/base.css";
// next.config.js: transpilePackages: ["sonia-ui"]
export default function RootLayout({ children }) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* 그리기 전에 저장된 테마 적용 */}
        <script dangerouslySetInnerHTML={{ __html: \`try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}\` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
\`\`\`
테마 고르기 컴포넌트: \`themeList\`(\`sonia-ui/tokens\`)로 \`<select>\`를 만들고 바뀌면 \`document.documentElement.dataset.theme = id; localStorage.setItem("theme", id)\`.

### Expo (React Native)
\`\`\`tsx
import { ThemeProvider, getTheme, Box, Text } from "sonia-ui/native";

<ThemeProvider theme={getTheme("dark")}>
  <Box flex={1} backgroundColor="$background" padding="lg">
    <Text variant="title">안녕</Text>
    <Box backgroundColor="$surface" padding="lg" borderRadius="md" marginTop="md">
      <Text variant="body">카드</Text>
    </Box>
  </Box>
</ThemeProvider>
\`\`\`
색 prop은 \`"$primary"\`처럼 \`$\`를 붙인다. 테마를 저장하려면 앱의 스토어에 id만 저장하고 \`getTheme(id)\`로 되살린다.

## 4. 이름 대응표

| 종류 | Tailwind 클래스 | 순수 CSS 변수 | Expo |
|---|---|---|---|
| 색 | \`bg-primary\` \`text-muted\` \`border-border\` | \`var(--color-primary)\` | \`backgroundColor="$primary"\` |
| 간격 | \`p-lg\` \`gap-md\` \`mt-xl\` | \`var(--spacing-lg)\` | \`padding="lg"\` |
| 모서리 | \`rounded-md\` | \`var(--radius-md)\` | \`borderRadius="md"\` |
| 글자 | \`text-title\` | \`.sn-text-title\` / \`var(--text-title)\` | \`variant="title"\` |
| 글꼴 | \`font-sans\` \`font-mono\` | \`var(--font-sans)\` | — |
| 테마 | \`<html data-theme="dark">\` | 같음 | \`getTheme("dark")\` |

## 5. 색 역할과 테마별 값

${colorTable}

밝기(scheme): ${themeList.map((t) => `${t.id}=${scheme(t.theme as { barStyle: string })}`).join(", ")}
테마 이름: ${themeList.map((t) => `${t.id}(${t.name})`).join(", ")}
CSS 변수 이름: \`--color-${roles.map(([r]) => r).join("`, `--color-")}\`

## 6. 간격 · 모서리 · 글자

- 간격 \`--spacing-*\`: ${Object.entries(light.spacing).map(([k, v]) => `${k}=${v}px`).join(", ")}
- 모서리 \`--radius-*\`: ${Object.entries(light.borderRadii).map(([k, v]) => `${k}=${v}px`).join(", ")}
- 글자 \`--text-*\` (크기 / 굵기 / 자간):
${textEntries.map(([k, s]) => `  - ${k}: ${s.fontSize}px${s.fontWeight ? ` / ${s.fontWeight}` : ""}${s.letterSpacing !== undefined ? ` / ${s.letterSpacing}px` : ""}`).join("\n")}

쓰임: display=큰 숫자, title=화면 제목, heading=섹션·카드 제목, body=본문, stat=통계 숫자, label=버튼·칩, caption=설명(muted와 함께), overline=섹션 머리말(대문자), micro=아주 작은 보조.

## 7. 컴포넌트 클래스 (웹, Tailwind·순수 CSS 공통)

${snClasses.map((c) => `\`${c}\``).join(" · ")}

- 버튼: \`sn-btn\` + 모양 하나(\`sn-btn-primary\` 주요, \`sn-btn-soft\` 보조, \`sn-btn-outline\` 취소, \`sn-btn-ghost\` 툴바) + 선택(\`sn-btn-sm\`/\`sn-btn-lg\`, \`sn-btn-pill\`). \`disabled\` 지원.
- 카드: \`sn-card\` (떠 있는 면), \`sn-card sn-card-muted\` (들어간 면).
- 태그: \`sn-tag\`, 회색은 \`sn-tag sn-tag-muted\`.
- 입력: \`sn-input\` (input·select·textarea).
- 모두 \`@layer\` 안에 있어서 프로젝트 CSS가 항상 이긴다. 크기 조정은 클래스를 더하거나 프로젝트 CSS로.

\`\`\`html
<div class="sn-card">
  <h3 class="sn-text-heading">오늘의 불씨</h3>
  <p class="sn-text-caption" style="color: var(--color-muted)">12일째</p>
  <span class="sn-tag">습관</span> <span class="sn-tag sn-tag-muted">아침</span>
  <input class="sn-input" placeholder="오늘 할 일">
  <button class="sn-btn sn-btn-primary">저장</button>
  <button class="sn-btn sn-btn-outline">취소</button>
</div>
\`\`\`

## 8. theme.js (테마 고르기)

\`<head>\`에 넣으면 저장된 테마를 그리기 전에 적용하고 \`<html data-theme data-scheme>\`을 맞춘다.
- \`<select data-theme-select></select>\`: 자동으로 채워지는 테마 선택
- \`<div data-theme-buttons></div>\`: 테마 버튼들
- \`window.sonia.setTheme("ocean")\`, \`window.sonia.getTheme()\`, \`window.sonia.themes\`
- 바뀔 때: \`addEventListener("sonia:themechange", (e) => e.detail.id)\`
- 저장 키: localStorage \`theme\`

## 9. sonia-ui 자체를 고칠 때

- 값: \`src/tokens/*.ts\` (테마 하나 = 파일 하나, \`src/tokens/index.ts\`의 \`themeList\`·\`ThemeId\`에 등록)
- 모양: \`src/styles/base.css\`(요소 기본) · \`src/styles/components.css\`(sn-*)
- \`npm run build\` → \`src/css/*\`, \`src/tailwind/theme.css\`, \`src/browser/theme.js\`, \`src/themes.json\`, \`docs/\`, \`llms*.txt\`가 다시 만들어진다. 생성 파일은 직접 고치지 않는다.
- 푸시하면 문서 사이트(${SITE}) 배포. \`src/\`가 바뀌면 버전 태그와 CDN \`@1\`은 GitHub Action이 자동으로 올린다(손으로 태그 금지). 각 프로젝트는 \`npm i github:ckdtjs505/sonia-ui\`로 최신을 받는다.
`;

for (const dir of ["../", "../docs/"]) {
  writeFileSync(new URL(`${dir}llms.txt`, import.meta.url), short);
  writeFileSync(new URL(`${dir}llms-full.txt`, import.meta.url), full);
}
console.log(`llms: ${full.length} chars, ${snClasses.length} classes`);
