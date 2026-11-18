// tokens + src/styles → CSS 세 벌. 값은 tokens, 모양은 src/styles에서만 고치고 `npm run build`로 다시 만든다.
//   src/css/themes.css     순수 CSS 변수만 (:root + data-theme별)
//   src/css/base.css       themes + 요소 기본 모양 + sn-* 컴포넌트 (@layer sonia)
//   src/tailwind/theme.css Tailwind v4용 @theme + data-theme별 + 같은 기본 모양·컴포넌트
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { themeList, light, Theme } from "../src/tokens/index.ts";

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const px = (n: number) => `${n}px`;
const indent = (lines: string[]) => lines.map((l) => `  ${l}`).join("\n");
const indentText = (text: string) => text.trim().split("\n").map((l) => (l ? `  ${l}` : l)).join("\n");
const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const write = (path: string, text: string) => {
  const url = new URL(path, import.meta.url);
  mkdirSync(new URL(".", url), { recursive: true });
  writeFileSync(url, text);
};

const HEADER = "/* 자동 생성 파일 — scripts/build-css.ts. 직접 고치지 말 것. */";

// 글꼴: Pretendard를 쓰는 쪽에서 불러오면 그걸, 없으면 시스템 글꼴
const fontVars = [
  `--font-sans: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;`,
  `--font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;`,
];

const colorVars = (t: Theme) =>
  Object.entries(t.colors)
    .filter(([k]) => k.startsWith("$"))
    .map(([k, v]) => `--color-${kebab(k.slice(1))}: ${v};`);

// barStyle "light"(밝은 상태바 글자)인 테마가 어두운 테마다.
const scheme = (t: Theme) => `color-scheme: ${(t as { barStyle: string }).barStyle === "light" ? "dark" : "light"};`;

type TextStyle = { fontSize: number; fontWeight?: string; letterSpacing?: number };
const textEntries = Object.entries(light.textVariants).filter(([k]) => k !== "defaults") as [string, TextStyle][];

const tokenVars = [
  ...colorVars(light),
  ...fontVars,
  ...Object.entries(light.spacing).map(([k, v]) => `--spacing-${k}: ${px(v)};`),
  ...Object.entries(light.borderRadii).map(([k, v]) => `--radius-${k}: ${px(v)};`),
  ...textEntries.flatMap(([k, s]) => [
    `--text-${k}: ${px(s.fontSize)};`,
    s.fontWeight && `--text-${k}--font-weight: ${s.fontWeight};`,
    s.letterSpacing !== undefined && `--text-${k}--letter-spacing: ${px(s.letterSpacing)};`,
  ].filter(Boolean) as string[]),
];

const themeBlocks = (withScheme: boolean) =>
  themeList
    .map(({ id, theme }) => `[data-theme="${id}"] {\n${indent([...colorVars(theme), ...(withScheme ? [scheme(theme)] : [])])}\n}`)
    .join("\n\n");

// 순수 CSS용 글자 클래스 (Tailwind에는 text-title 등이 이미 있다)
const textClasses = textEntries
  .map(([k, s]) => `.sn-text-${k} {\n${indent([
    `font-size: var(--text-${k});`,
    s.fontWeight && `font-weight: var(--text-${k}--font-weight);`,
    s.letterSpacing !== undefined && `letter-spacing: var(--text-${k}--letter-spacing);`,
  ].filter(Boolean) as string[])}\n}`)
  .join("\n");

const baseCss = read("../src/styles/base.css");
const componentsCss = read("../src/styles/components.css");

// 1) themes.css
const themesCss = `${HEADER}
:root {
${indent([...tokenVars, scheme(light)])}
}

${themeBlocks(true)}
`;
write("../src/css/themes.css", themesCss);

// 2) base.css — 레이어 안에 두어 프로젝트 CSS가 항상 이기게 한다
write("../src/css/base.css", `${themesCss}
@layer sonia {
${indentText(baseCss)}

${indentText(componentsCss)}

${indentText(textClasses)}
}
`);

// 3) Tailwind v4
write("../src/tailwind/theme.css", `${HEADER}
@theme {
${indent(tokenVars)}
}

${themeBlocks(false)}

@layer base {
${indentText(baseCss)}
}

@layer components {
${indentText(componentsCss)}
}
`);

console.log(`css: ${tokenVars.length} tokens, ${themeList.length} themes`);
