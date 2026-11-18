// docs/docs/*.html 생성. 표의 값은 tokens에서 읽으므로 값을 바꾸면 문서도 같이 바뀐다.
import { mkdirSync, writeFileSync } from "node:fs";
import { light, themeList } from "../src/tokens/index.ts";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const px = (n: number) => `${n}px`;

// ── 코드 블록: 태그·속성·class 값만 색칠 ─────────────────────────
// 한 번에 훑어야 앞에서 넣은 <span class="..."> 를 다시 칠하지 않는다
const highlight = (code: string) =>
  esc(code).replace(
    /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|(&lt;\/?)([\w.]+)|\b(class|className|variant|padding|backgroundColor|borderRadius|theme|data-theme)=("[^"]*"|\{[^}]*\})/g,
    (_, comment, open, tag, attr, value) =>
      comment ? `<span class="text-muted">${comment}</span>`
      : tag ? `${open}<span class="text-primary">${tag}</span>`
      : `<span class="text-muted">${attr}</span>=<span class="text-flame">${value}</span>`);

const code = (src: string, title?: string) => `
<div class="overflow-hidden rounded-lg border border-border bg-surface">
  ${title ? `<div class="border-b border-border px-lg py-s text-micro">${title}</div>` : ""}
  <pre class="overflow-x-auto p-lg text-caption leading-relaxed text-foreground"><code>${highlight(src.trim())}</code></pre>
</div>`;

const example = (preview: string, src: string) => `
<div class="mt-lg overflow-hidden rounded-xl border border-border">
  <div class="flex flex-wrap items-center justify-center gap-xl bg-surface-muted px-lg py-xl">${preview}</div>
  <div class="border-t border-border">${code(src).replace("rounded-lg border border-border", "")}</div>
</div>`;

const p = (html: string) => `<p class="mt-md text-body leading-7 text-muted">${html}</p>`;
const c = (s: string) => `<code class="rounded-xs bg-surface-muted px-xs py-[1px] text-label text-foreground">${esc(s)}</code>`;

// Class | Styles 표. 12줄 넘으면 접고 "더 보기"
const table = (rows: [string, string][]) => `
<div class="table-wrap relative mt-xl ${rows.length > 12 ? "collapsed" : ""}">
  <div class="overflow-x-auto">
    <table class="w-full text-left text-caption">
      <thead><tr class="border-b border-border"><th class="py-s pr-lg text-label">Class</th><th class="py-s text-label">Styles</th></tr></thead>
      <tbody class="divide-y divide-border">
        ${rows.map(([k, v]) => `<tr><td class="py-s pr-lg font-mono whitespace-nowrap text-primary">${k}</td><td class="py-s font-mono whitespace-pre text-muted">${esc(v)}</td></tr>`).join("")}
      </tbody>
    </table>
  </div>
  ${rows.length > 12 ? `<div class="more absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-background pt-xxl"><button class="rounded-pill bg-surface px-lg py-s text-micro uppercase text-foreground border border-border">더 보기</button></div>` : ""}
</div>`;

// ── 페이지 정의 ───────────────────────────────────────────
type Section = { id: string; title: string; level?: 2 | 3; body: string };
type Page = { slug: string; group: string; title: string; lead: string; table?: [string, string][]; sections: Section[] };

const spacingKeys = Object.entries(light.spacing);
const radiusKeys = Object.entries(light.borderRadii);
const colorKeys = Object.keys(light.colors).filter((k) => k.startsWith("$")).map((k) => kebab(k.slice(1)));
const textKeys = Object.entries(light.textVariants).filter(([k]) => k !== "defaults") as [string, { fontSize: number; fontWeight?: string; letterSpacing?: number; color: string }][];

const sideRows = (prefix: string, prop: string, sides: [string, string][]) =>
  sides.flatMap(([s, cssProp]) => spacingKeys.map(([k, v]) => [`${prefix}${s}-${k}`, `${prop}${cssProp}: var(--spacing-${k}); /* ${px(v)} */`] as [string, string]));

const box = (cls: string, label = cls) =>
  `<div class="hatch rounded-md ${cls}"><div class="rounded-sm bg-primary px-md py-s text-label text-on-primary">${label}</div></div>`;

const pages: Page[] = [
  {
    slug: "ai", group: "시작하기", title: "AI와 쓰기",
    lead: "sonia-ui는 AI가 읽고 바로 쓰도록 만들었다. 링크 하나를 주면 규칙·설치법·모든 값을 안다.",
    sections: [
      { id: "prompt", title: "AI에게 이렇게 말하기", body: p("아무 AI 코딩 도구에 붙여 넣는다.") + code(`sonia-ui로 만들어줘.\n규칙과 사용법: https://ckdtjs505.github.io/sonia-ui/llms-full.txt`, "프롬프트") },
      { id: "files", title: "AI용 파일", body: table([
        ["llms.txt", "짧은 안내와 링크 (사이트 루트)"],
        ["llms-full.txt", "규칙 · 입구 고르기 · 설치 레시피 · 테마별 색 값 · 클래스 전부, 한 파일"],
        ["AGENTS.md", "sonia-ui 저장소를 고치는 AI용 안내 (CLAUDE.md도 같은 파일)"],
        ["node_modules/sonia-ui/llms-full.txt", "설치한 프로젝트에서는 로컬 파일로도 읽힌다"],
      ]) },
      { id: "cdn", title: "설치 없이 두 줄", body: p("데모·정적 페이지는 이 두 줄이면 색·컴포넌트·테마 선택까지 된다.") + code(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ckdtjs505/sonia-ui@1/src/css/base.css">\n<script src="https://cdn.jsdelivr.net/gh/ckdtjs505/sonia-ui@1/src/browser/theme.js"></script>\n\n<select data-theme-select></select>\n<button class="sn-btn sn-btn-primary">저장</button>`, "index.html") },
      { id: "rules", title: "AI가 지키는 규칙", body: table([
        ["색", "역할 이름만 (bg-primary, var(--color-surface)). hex 금지"],
        ["간격·모서리·글자", "이름 단계만 (p-lg, rounded-md, text-title)"],
        ["컴포넌트", "sn-btn · sn-card · sn-tag · sn-input 조합"],
        ["다크 모드", "따로 만들지 않음. data-theme가 해결"],
        ["값 바꾸기", "프로젝트에서 덮지 말고 sonia-ui를 고침"],
      ]) },
      { id: "claude-code", title: "Claude Code 스킬", body: p(`${c("skill/SKILL.md")}를 ${c("~/.claude/skills/sonia-ui")}로 연결해 두면, 어느 프로젝트에서든 \"sonia-ui로 만들어줘\", \"테마 붙여줘\"에 이 규칙대로 움직인다.`) + code(`ln -s ~/Desktop/web/sonia-ui/skill ~/.claude/skills/sonia-ui`, "Terminal") },
    ],
  },
  {
    slug: "installation", group: "시작하기", title: "설치",
    lead: "Tailwind CSS v4 프로젝트에 sonia-ui 테마를 붙인다. CSS 두 줄이면 끝.",
    sections: [
      { id: "install", title: "1. 패키지 설치", body: code("npm i github:ckdtjs505/sonia-ui", "Terminal") },
      { id: "import", title: "2. CSS에 가져오기", body: p(`Tailwind를 가져온 바로 아래에 ${c("sonia-ui/tailwind.css")}를 가져온다.`) + code(`@import "tailwindcss";\n@import "sonia-ui/tailwind.css";`, "app.css") },
      { id: "theme", title: "3. 테마 고르기", body: p(`${c("<html>")}에 ${c("data-theme")}를 단다. 없으면 라이트. 고를 수 있는 값은 <a class="text-primary underline" href="themes.html">테마</a>에.`) + code(`<html data-theme="dark">`, "index.html") },
      { id: "use", title: "4. 클래스 쓰기", body: p("이제 색·간격·모서리·글자를 이름으로 쓴다.") + example(
        `<div class="w-64 rounded-md bg-surface p-lg"><p class="text-title">안녕</p><p class="mt-xs text-caption text-muted">sonia-ui로 만든 카드</p><button class="mt-lg rounded-pill bg-primary px-lg py-s text-label text-on-primary">시작</button></div>`,
        `<div class="rounded-md bg-surface p-lg">\n  <p class="text-title">안녕</p>\n  <p class="mt-xs text-caption text-muted">sonia-ui로 만든 카드</p>\n  <button class="mt-lg rounded-pill bg-primary px-lg py-s text-label text-on-primary">시작</button>\n</div>`) },
      { id: "frameworks", title: "프레임워크별", body: p(`<b class="text-foreground">Vite</b>: ${c("@tailwindcss/vite")} 플러그인만 켜면 된다. <b class="text-foreground">Next.js</b>: ${c("next.config")}에 ${c('transpilePackages: ["sonia-ui"]')}를 넣는다.`) },
      { id: "font", title: "글꼴", body: p(`기본 글꼴은 Pretendard다. ${c("<head>")}에 한 줄 넣으면 되고, 없으면 시스템 글꼴로 보인다.`) + code(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />`, "index.html") },
      { id: "plain-css", title: "Tailwind 없이", body: p(`순수 HTML·CSS 프로젝트는 ${c("sonia-ui/base.css")} 하나만 가져온다. 색 변수, 기본 모양, ${c("sn-")} 컴포넌트, 글자 클래스(${c("sn-text-title")})가 다 들어 있다. 모두 ${c("@layer sonia")} 안에 있어서 프로젝트가 직접 쓴 CSS가 항상 이긴다.`) + code(`import "sonia-ui/base.css";\n\n/* 또는 */\n<link rel="stylesheet" href="node_modules/sonia-ui/src/css/base.css" />`) + p(`변수만 필요하면 ${c("sonia-ui/themes.css")}.`) },
    ],
  },
  {
    slug: "expo", group: "시작하기", title: "앱 (Expo)",
    lead: "React Native에서는 같은 값을 Restyle의 Box · Text로 쓴다. 이름이 웹 클래스와 1:1로 맞는다.",
    sections: [
      { id: "install", title: "1. 설치", body: code("npm i github:ckdtjs505/sonia-ui @shopify/restyle react-native-safe-area-context", "Terminal") },
      { id: "provider", title: "2. ThemeProvider로 감싸기", body: code(`import { ThemeProvider, getTheme } from "sonia-ui/native";\n\nexport default function App() {\n  return (\n    <ThemeProvider theme={getTheme("dark")}>\n      <Home />\n    </ThemeProvider>\n  );\n}`, "App.tsx") },
      { id: "use", title: "3. Box · Text 쓰기", body: code(`import { Box, Text } from "sonia-ui/native";\n\n<Box backgroundColor="$surface" padding="lg" borderRadius="md">\n  <Text variant="title">안녕</Text>\n  <Text variant="caption">sonia-ui로 만든 카드</Text>\n</Box>`, "Home.tsx") },
      { id: "mapping", title: "웹 ↔ 앱 이름", body: table([
        ["bg-primary", 'backgroundColor="$primary"'], ["text-muted", 'color="$muted"'], ["p-lg", 'padding="lg"'],
        ["gap-md", 'gap="md"'], ["rounded-md", 'borderRadius="md"'], ["text-title", 'variant="title"'], ['data-theme="dark"', 'getTheme("dark")'],
      ]) },
      { id: "jest", title: "Jest", body: p(`TS 소스를 그대로 배포하므로 ${c("transformIgnorePatterns")} 허용 목록에 ${c("sonia-ui")}를 넣는다.`) },
    ],
  },
  {
    slug: "themes", group: "시작하기", title: "테마",
    lead: "모든 테마는 같은 색 이름을 갖고 값만 다르다. data-theme 하나로 화면 전체가 바뀐다.",
    table: themeList.map((t) => [`data-theme="${t.id}"`, `${t.name}`]),
    sections: [
      { id: "preview", title: "미리보기", body: `<div class="mt-lg grid gap-md sm:grid-cols-2">${themeList.map((t) => `
        <div data-theme="${t.id}" class="rounded-lg border border-border bg-background p-lg">
          <div class="flex items-center justify-between"><span class="text-heading text-foreground">${t.name}</span><code class="text-micro text-muted">${t.id}</code></div>
          <div class="mt-md rounded-md bg-surface p-md"><p class="text-body text-foreground">작은 불씨가 큰 들을 태운다.</p><p class="text-caption text-muted">오늘의 명언</p></div>
          <div class="mt-md flex gap-s"><span class="rounded-pill bg-primary px-md py-xs text-label text-on-primary">버튼</span><span class="rounded-pill bg-primary-soft px-md py-xs text-label text-primary">칩</span><span class="ml-auto size-6 rounded-pill bg-flame"></span></div>
        </div>`).join("")}</div>` },
      { id: "switch", title: "테마 바꾸기", body: p("속성만 바꾸면 된다. 부분에만 다른 테마를 쓰려면 그 요소에 달면 된다.") + code(`document.documentElement.dataset.theme = "ocean";\n\n<section data-theme="gold">...</section>`) },
    ],
  },
  {
    slug: "customizing", group: "시작하기", title: "값 고치기",
    lead: "값은 src/tokens 한 곳에만 있다. 고치고 빌드하면 Tailwind CSS · 앱 테마 · 이 문서가 같이 바뀐다.",
    sections: [
      { id: "edit", title: "1. tokens 고치기", body: code(`// src/tokens/light.ts\nspacing: { xs: 4, s: 8, md: 12, lg: 16, ... }`, "src/tokens/light.ts") },
      { id: "build", title: "2. 빌드", body: code("npm run build", "Terminal") + p(`${c("src/tailwind/theme.css")}와 ${c("docs/")}가 다시 만들어진다. 커밋·푸시하면 앱들은 ${c("npm i github:ckdtjs505/sonia-ui")}로 최신을 받는다.`) },
      { id: "new-theme", title: "새 테마 추가", body: code(`// src/tokens/forest.ts\nimport light, { makeColors } from "./light";\n\nexport default { ...light, colors: makeColors({ background: "#0E1A12", ... }), barStyle: "light" };`) + p(`그다음 ${c("src/tokens/index.ts")}의 ${c("themeList")}와 ${c("ThemeId")}에 추가한다.`) },
    ],
  },
  {
    slug: "components", group: "컴포넌트", title: "버튼 · 카드 · 태그",
    lead: "모든 프로젝트가 같은 모양을 쓰도록 만든 클래스. 기존 .btn 등과 겹치지 않게 sn- 을 붙였다. Tailwind와 순수 CSS 둘 다 같은 이름.",
    table: [
      ["sn-btn", "버튼 기본 (모양 클래스와 함께)"], ["sn-btn-primary", "주요 동작"], ["sn-btn-soft", "보조 동작"],
      ["sn-btn-outline", "취소 · 덜 중요한 동작"], ["sn-btn-ghost", "툴바 · 아이콘 옆"], ["sn-btn-sm / sn-btn-lg", "크기"],
      ["sn-btn-pill", "알약 모양"], ["sn-card", "떠 있는 면"], ["sn-card-muted", "들어간 면"],
      ["sn-tag", "태그 · 칩"], ["sn-tag-muted", "회색 태그"], ["sn-input", "입력창"],
    ],
    sections: [
      { id: "buttons", title: "버튼", body: example(
        `<button class="sn-btn sn-btn-primary">저장</button><button class="sn-btn sn-btn-soft">임시 저장</button><button class="sn-btn sn-btn-outline">취소</button><button class="sn-btn sn-btn-ghost">더 보기</button><button class="sn-btn sn-btn-primary" disabled>비활성</button>`,
        `<button class="sn-btn sn-btn-primary">저장</button>\n<button class="sn-btn sn-btn-soft">임시 저장</button>\n<button class="sn-btn sn-btn-outline">취소</button>\n<button class="sn-btn sn-btn-ghost">더 보기</button>\n<button class="sn-btn sn-btn-primary" disabled>비활성</button>`) },
      { id: "sizes", title: "크기 · 모양", body: example(
        `<button class="sn-btn sn-btn-primary sn-btn-sm">작게</button><button class="sn-btn sn-btn-primary">보통</button><button class="sn-btn sn-btn-primary sn-btn-lg">크게</button><button class="sn-btn sn-btn-primary sn-btn-pill">알약</button>`,
        `<button class="sn-btn sn-btn-primary sn-btn-sm">작게</button>\n<button class="sn-btn sn-btn-primary">보통</button>\n<button class="sn-btn sn-btn-primary sn-btn-lg">크게</button>\n<button class="sn-btn sn-btn-primary sn-btn-pill">알약</button>`) },
      { id: "cards", title: "카드", body: example(
        `<div class="flex flex-wrap gap-lg rounded-lg bg-background p-lg"><div class="sn-card w-64"><p class="text-heading">오늘의 불씨</p><p class="mt-xs text-caption text-muted">12일째 이어지는 중</p><div class="mt-md flex gap-s"><span class="sn-tag">습관</span><span class="sn-tag sn-tag-muted">아침</span></div></div><div class="sn-card sn-card-muted w-64"><p class="text-heading">들어간 면</p><p class="mt-xs text-caption text-muted">입력 영역 · 인용 · 요약</p></div></div>`,
        `<div class="sn-card">\n  <p class="text-heading">오늘의 불씨</p>\n  <p class="text-caption text-muted">12일째 이어지는 중</p>\n  <span class="sn-tag">습관</span>\n  <span class="sn-tag sn-tag-muted">아침</span>\n</div>\n<div class="sn-card sn-card-muted">...</div>`) },
      { id: "inputs", title: "입력창", body: example(
        `<div class="w-72 space-y-s"><input class="sn-input" placeholder="오늘 할 일" /><div class="flex gap-s"><input class="sn-input" placeholder="이메일" /><button class="sn-btn sn-btn-primary">구독</button></div></div>`,
        `<input class="sn-input" placeholder="오늘 할 일" />`) },
      { id: "plain", title: "Tailwind 없이", body: p(`${c("sonia-ui/base.css")}를 가져오면 같은 클래스를 쓴다. 글자는 ${c("text-title")} 대신 ${c("sn-text-title")}.`) + code(`<div class="sn-card">\n  <h2 class="sn-text-heading">제목</h2>\n  <button class="sn-btn sn-btn-primary">저장</button>\n</div>`) },
    ],
  },
  {
    slug: "colors", group: "색", title: "색",
    lead: "색은 값이 아니라 역할로 부른다. bg-* · text-* · border-* · ring-* 어디에나 붙는다.",
    table: colorKeys.map((k) => [`bg-${k}`, `background-color: var(--color-${k});`]),
    sections: [
      { id: "palette", title: "테마별 팔레트", body: themeList.map((t) => `
        <div data-theme="${t.id}" class="mt-md rounded-lg border border-border bg-background p-md">
          <p class="text-label text-foreground">${t.name} <span class="text-micro text-muted">${t.id}</span></p>
          <div class="mt-s grid grid-cols-5 gap-s sm:grid-cols-10">${colorKeys.map((k) => `<div><div class="h-10 rounded-sm border border-border bg-${k}"></div><p class="mt-xs truncate text-micro text-muted">${k}</p></div>`).join("")}</div>
        </div>`).join("") },
      { id: "roles", title: "역할", body: table([
        ["background", "화면 바탕"], ["surface", "카드·시트처럼 떠 있는 면"], ["surface-muted", "입력창·칩처럼 한 단계 들어간 영역"],
        ["foreground", "본문 글자"], ["muted", "보조 글자"], ["border", "얇은 구분선"], ["primary", "강조 · 주요 버튼"],
        ["primary-soft", "강조색을 옅게 깐 배경"], ["on-primary", "primary 위의 글자"], ["flame", "불씨 · 스트릭"],
      ]) },
      { id: "example", title: "예시", body: example(
        `<div class="flex gap-md"><button class="rounded-md bg-primary px-lg py-s text-label text-on-primary">저장</button><button class="rounded-md bg-primary-soft px-lg py-s text-label text-primary">임시 저장</button><button class="rounded-md border border-border px-lg py-s text-label text-foreground">취소</button></div>`,
        `<button class="bg-primary text-on-primary ...">저장</button>\n<button class="bg-primary-soft text-primary ...">임시 저장</button>\n<button class="border border-border text-foreground ...">취소</button>`) },
    ],
  },
  {
    slug: "padding", group: "간격", title: "padding",
    lead: "요소 안쪽 여백. Tailwind 숫자(p-4)와 함께 sonia-ui 이름(p-lg)을 쓴다.",
    table: sideRows("p", "padding", [["", ""], ["x", "-inline"], ["y", "-block"], ["t", "-top"], ["r", "-right"], ["b", "-bottom"], ["l", "-left"]]),
    sections: [
      { id: "basic", title: "기본", body: p(`${c("p-xs")}, ${c("p-lg")}, ${c("p-xl")}처럼 네 방향을 한 번에.`) + example(box("p-xs") + box("p-lg") + box("p-xl"), `<div class="p-xs ...">p-xs</div>\n<div class="p-lg ...">p-lg</div>\n<div class="p-xl ...">p-xl</div>`) },
      { id: "one-side", title: "한쪽만", body: example(box("pt-xl") + box("pr-lg") + box("pb-xl") + box("pl-s"), `<div class="pt-xl ...">pt-xl</div>\n<div class="pr-lg ...">pr-lg</div>\n<div class="pb-xl ...">pb-xl</div>\n<div class="pl-s ...">pl-s</div>`) },
      { id: "axis", title: "가로 · 세로", body: example(box("px-xl") + box("py-xl"), `<div class="px-xl ...">px-xl</div>\n<div class="py-xl ...">py-xl</div>`) },
    ],
  },
  {
    slug: "margin", group: "간격", title: "margin",
    lead: "요소 바깥 여백.",
    table: sideRows("m", "margin", [["", ""], ["x", "-inline"], ["y", "-block"], ["t", "-top"], ["r", "-right"], ["b", "-bottom"], ["l", "-left"]]),
    sections: [
      { id: "basic", title: "기본", body: example(
        ["m-s", "m-lg", "m-xl"].map((k) => `<div class="hatch rounded-md"><div class="${k} rounded-sm bg-primary px-md py-s text-label text-on-primary">${k}</div></div>`).join(""),
        `<div class="m-s ...">m-s</div>\n<div class="m-lg ...">m-lg</div>\n<div class="m-xl ...">m-xl</div>`) },
      { id: "stack", title: "쌓기", body: p(`세로로 쌓을 때는 ${c("mt-*")}보다 부모의 ${c("space-y-*")}나 ${c("gap-*")}가 편하다.`) + example(
        `<div class="w-56 space-y-md">${["하나", "둘", "셋"].map((t) => `<div class="rounded-sm bg-surface p-md text-label">${t}</div>`).join("")}</div>`,
        `<div class="space-y-md">\n  <div>하나</div>\n  <div>둘</div>\n  <div>셋</div>\n</div>`) },
    ],
  },
  {
    slug: "gap", group: "간격", title: "gap",
    lead: "flex · grid 자식 사이 간격.",
    table: [["", ""], ["-x", "column-"], ["-y", "row-"]].flatMap(([s, pre]) => spacingKeys.map(([k, v]) => [`gap${s}-${k}`, `${pre}gap: var(--spacing-${k}); /* ${px(v)} */`] as [string, string])),
    sections: [
      { id: "basic", title: "기본", body: example(
        ["gap-xs", "gap-md", "gap-xl"].map((g) => `<div class="grid grid-cols-3 ${g}">${[1, 2, 3, 4, 5, 6].map(() => `<div class="size-8 rounded-xs bg-primary"></div>`).join("")}</div>`).join(""),
        `<div class="grid grid-cols-3 gap-xs">...</div>\n<div class="grid grid-cols-3 gap-md">...</div>\n<div class="grid grid-cols-3 gap-xl">...</div>`) },
    ],
  },
  {
    slug: "border-radius", group: "모서리", title: "border-radius",
    lead: "모서리 둥글기. 카드는 md, 시트는 lg, 버튼·칩은 pill.",
    table: [["", ""], ["-t", "top"], ["-b", "bottom"], ["-l", "left"], ["-r", "right"]].flatMap(([s, side]) =>
      radiusKeys.map(([k, v]) => [`rounded${s}-${k}`, side ? `border-${side}-*-radius: var(--radius-${k}); /* ${px(v)} */` : `border-radius: var(--radius-${k}); /* ${px(v)} */`] as [string, string])),
    sections: [
      { id: "basic", title: "기본", body: example(
        radiusKeys.map(([k]) => `<div class="flex size-20 items-center justify-center rounded-${k} bg-primary text-label text-on-primary">${k}</div>`).join(""),
        radiusKeys.map(([k]) => `<div class="rounded-${k} ..."></div>`).join("\n")) },
      { id: "sides", title: "한쪽만", body: example(
        ["rounded-t-lg", "rounded-b-lg", "rounded-l-lg", "rounded-r-lg"].map((k) => `<div class="flex size-20 items-center justify-center ${k} bg-primary text-micro text-on-primary">${k}</div>`).join(""),
        `<div class="rounded-t-lg ..."></div>\n<div class="rounded-b-lg ..."></div>\n<div class="rounded-l-lg ..."></div>\n<div class="rounded-r-lg ..."></div>`) },
    ],
  },
  {
    slug: "font-size", group: "글자", title: "font-size",
    lead: "글자 크기 · 굵기 · 자간을 한 클래스로. 앱의 <Text variant>와 같은 값.",
    table: textKeys.map(([k, s]) => [`text-${k}`, [`font-size: ${px(s.fontSize)};`, s.fontWeight && `font-weight: ${s.fontWeight};`, s.letterSpacing !== undefined && `letter-spacing: ${px(s.letterSpacing)};`].filter(Boolean).join("\n")]),
    sections: [
      { id: "scale", title: "단계", body: `<div class="mt-lg divide-y divide-border rounded-xl border border-border">${textKeys.map(([k, s]) => `
        <div class="flex items-baseline gap-lg p-lg"><code class="w-32 shrink-0 text-caption text-primary">text-${k}</code><span class="text-${k} ${s.color === "$muted" ? "text-muted" : "text-foreground"}">작은 불씨가 큰 들을 태운다</span></div>`).join("")}</div>` },
      { id: "color", title: "색은 따로", body: p(`Tailwind처럼 크기와 색을 나눈다. 보조 글자는 ${c("text-caption text-muted")}처럼 함께 쓴다.`) + example(
        `<div class="w-64"><p class="text-overline uppercase text-muted">오늘</p><p class="text-title">불 지피기</p><p class="text-caption text-muted">3분이면 끝나요</p></div>`,
        `<p class="text-overline uppercase text-muted">오늘</p>\n<p class="text-title">불 지피기</p>\n<p class="text-caption text-muted">3분이면 끝나요</p>`) },
    ],
  },
];

// ── 레이아웃 ─────────────────────────────────────────────
const groups = [...new Set(pages.map((pg) => pg.group))];

const sidebar = (active: string) => groups.map((g) => `
  <h5 class="mb-s mt-xl text-label text-foreground first:mt-0">${g}</h5>
  <ul class="space-y-xs border-l border-border">${pages.filter((pg) => pg.group === g).map((pg) => `
    <li><a href="${pg.slug}.html" class="-ml-px block border-l py-[3px] pl-md text-caption ${pg.slug === active ? "border-primary font-semibold text-primary" : "border-transparent text-muted hover:border-muted hover:text-foreground"}">${pg.title}</a></li>`).join("")}
  </ul>`).join("");

const themeSelect = `<select data-theme-select aria-label="테마" class="rounded-pill border border-border bg-surface px-md py-xs text-micro text-foreground"></select>`;

const render = (pg: Page) => {
  const toc: Section[] = [...(pg.table ? [{ id: "reference", title: "빠른 참조", body: "" }] : []), ...pg.sections];
  return `<!doctype html>
<html lang="ko" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${pg.title} - ${pg.group} - sonia-ui</title>
  <meta name="description" content="${esc(pg.lead)}" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
  <link rel="stylesheet" href="../site.css" />
  <script>try{const t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch{}</script>
</head>
<body>
  <header class="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
    <div class="flex h-14 items-center gap-md px-lg">
      <a href="../index.html" class="flex items-center gap-s text-heading text-foreground"><span class="inline-block size-5 rounded-xs bg-primary"></span>sonia-ui</a>
      <span class="rounded-pill bg-surface-muted px-s py-[2px] text-micro">v1.0</span>
      <div class="ml-auto flex items-center gap-lg text-label">
        <a href="installation.html" class="text-foreground">Docs</a>
        <a href="https://github.com/ckdtjs505/sonia-ui" class="text-muted hover:text-foreground">GitHub</a>
        ${themeSelect}
      </div>
    </div>
    <div class="flex items-center gap-s border-t border-border px-lg py-s text-caption lg:hidden">
      <button id="menu" aria-label="메뉴" class="text-foreground">☰</button><span>${pg.group}</span><span>›</span><span class="text-foreground">${pg.title}</span>
    </div>
  </header>

  <div class="mx-auto flex max-w-[1440px]">
    <nav id="sidebar" class="fixed inset-y-0 left-0 top-14 z-20 hidden w-72 overflow-y-auto border-r border-border bg-background px-xl py-xl lg:sticky lg:block lg:h-[calc(100vh-3.5rem)]">${sidebar(pg.slug)}</nav>

    <main class="min-w-0 flex-1 px-lg py-xxl sm:px-xxl">
      <div class="mx-auto max-w-3xl">
        <p class="text-overline uppercase text-primary">${pg.group}</p>
        <h1 class="mt-s text-3xl font-extrabold tracking-tight text-foreground">${pg.title}</h1>
        <p class="mt-md text-lg text-muted">${esc(pg.lead)}</p>
        ${pg.table ? `<section id="reference" class="scroll-mt-24">${table(pg.table)}</section>` : ""}
        ${pg.sections.length && pg.table ? `<p class="mt-xxl text-overline uppercase">예제</p>` : ""}
        ${pg.sections.map((s) => `<section id="${s.id}" class="scroll-mt-24"><h2 class="mt-xxl text-heading text-foreground"><a href="#${s.id}">${s.title}</a></h2>${s.body}</section>`).join("")}
        ${(() => { const i = pages.indexOf(pg); const prev = pages[i - 1], next = pages[i + 1]; return `
        <div class="mt-hg flex justify-between border-t border-border pt-xl text-label">
          ${prev ? `<a href="${prev.slug}.html" class="text-muted hover:text-foreground">← ${prev.title}</a>` : "<span></span>"}
          ${next ? `<a href="${next.slug}.html" class="text-muted hover:text-foreground">${next.title} →</a>` : ""}
        </div>`; })()}
      </div>
    </main>

    <aside class="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto py-xxl pr-xl xl:block">
      <p class="text-label text-foreground">이 페이지</p>
      <ul class="mt-md space-y-s text-caption">${toc.map((s) => `<li><a href="#${s.id}" class="text-muted hover:text-foreground">${s.title}</a></li>`).join("")}</ul>
    </aside>
  </div>

  <script>
    document.getElementById("menu").onclick = () => document.getElementById("sidebar").classList.toggle("hidden");
    for (const w of document.querySelectorAll(".table-wrap.collapsed")) {
      w.querySelector(".more button").onclick = () => { w.classList.remove("collapsed"); w.querySelector(".more").remove(); };
    }
  </script>
  <script src="../theme.js"></script>
</body>
</html>
`;
};

const out = new URL("../docs/docs/", import.meta.url);
mkdirSync(out, { recursive: true });
for (const pg of pages) writeFileSync(new URL(`${pg.slug}.html`, out), render(pg));
console.log(`docs: ${pages.length} pages`);

// 어디서나 넣기만 하면 되는 테마 스크립트 (sonia-ui/theme.js). 랜딩·문서도 이걸 쓴다.
// <head>에 두면 그리기 전에 저장된 테마를 적용하고, 문서가 준비되면 [data-theme-select] · [data-theme-buttons]를 채운다.
const themeScript = `// 자동 생성 파일 — scripts/build-docs.ts. 직접 고치지 말 것.
// sonia-ui 테마 선택. <head>에 넣기만 하면 된다.
//   <select data-theme-select></select>      테마 고르는 상자 (자동으로 채움)
//   <div data-theme-buttons></div>           테마 버튼들 (자동으로 채움)
//   window.sonia.setTheme("ocean")           코드로 바꾸기
//   addEventListener("sonia:themechange", e => e.detail.id)   바뀔 때 알림
// 고른 값은 localStorage "theme"에 남는다. 없으면 <html data-theme> 값, 그것도 없으면 기기 설정(light/dark).
(() => {
  const themes = ${JSON.stringify(themeList.map((t) => ({ id: t.id, name: t.name, scheme: (t.theme as { barStyle: string }).barStyle === "light" ? "dark" : "light" })))};
  const root = document.documentElement;
  const find = (id) => themes.find((t) => t.id === id);
  const system = () => (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch {}

  const apply = (id) => {
    const t = find(id) || find(system());
    root.dataset.theme = t.id;
    root.dataset.scheme = t.scheme;
    return t;
  };
  apply(saved || root.dataset.theme);

  const btnOn = "sn-btn sn-btn-primary sn-btn-sm sn-btn-pill";
  const btnOff = "sn-btn sn-btn-outline sn-btn-sm sn-btn-pill";
  const sync = () => {
    for (const sel of document.querySelectorAll("[data-theme-select]")) sel.value = root.dataset.theme;
    for (const b of document.querySelectorAll("[data-theme-buttons] button")) {
      const on = b.value === root.dataset.theme;
      b.className = on ? btnOn : btnOff;
      b.setAttribute("aria-pressed", String(on));
    }
  };

  const setTheme = (id) => {
    const t = apply(id);
    try { localStorage.setItem("theme", t.id); } catch {}
    sync();
    dispatchEvent(new CustomEvent("sonia:themechange", { detail: t }));
  };

  const wire = () => {
    for (const sel of document.querySelectorAll("[data-theme-select]")) {
      if (!sel.options.length) sel.innerHTML = themes.map((t) => \`<option value="\${t.id}">\${t.name}</option>\`).join("");
      sel.addEventListener("change", () => setTheme(sel.value));
    }
    for (const box of document.querySelectorAll("[data-theme-buttons]")) {
      box.innerHTML = themes.map((t) => \`<button type="button" value="\${t.id}">\${t.name}</button>\`).join("");
      box.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) setTheme(b.value); });
    }
    sync();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire); else wire();

  window.sonia = { themes, setTheme, getTheme: () => root.dataset.theme };
})();
`;
writeFileSync(new URL("../docs/theme.js", import.meta.url), themeScript);
mkdirSync(new URL("../src/browser/", import.meta.url), { recursive: true });
writeFileSync(new URL("../src/browser/theme.js", import.meta.url), themeScript);
