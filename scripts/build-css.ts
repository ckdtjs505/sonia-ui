// tokens → Tailwind v4 테마 CSS. 값은 tokens 한 곳에서만 고치고 `npm run build`로 다시 만든다.
import { writeFileSync } from "node:fs";
import { themeList, light, Theme } from "../src/tokens/index.ts";

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const px = (n: number) => `${n}px`;

const colorVars = (t: Theme) =>
  Object.entries(t.colors)
    .filter(([k]) => k.startsWith("$"))
    .map(([k, v]) => `--color-${kebab(k.slice(1))}: ${v};`);

const themeBlock = [
  ...colorVars(light),
  ...Object.entries(light.spacing).map(([k, v]) => `--spacing-${k}: ${px(v)};`),
  ...Object.entries(light.borderRadii).map(([k, v]) => `--radius-${k}: ${px(v)};`),
  ...Object.entries(light.textVariants)
    .filter(([k]) => k !== "defaults")
    .flatMap(([k, v]) => {
      const s = v as { fontSize: number; fontWeight?: string; letterSpacing?: number };
      return [
        `--text-${k}: ${px(s.fontSize)};`,
        s.fontWeight && `--text-${k}--font-weight: ${s.fontWeight};`,
        s.letterSpacing !== undefined && `--text-${k}--letter-spacing: ${px(s.letterSpacing)};`,
      ].filter(Boolean) as string[];
    }),
];

const indent = (lines: string[]) => lines.map((l) => `  ${l}`).join("\n");

const css = `/* 자동 생성 파일 — scripts/build-css.ts. 직접 고치지 말 것. */
@theme {
${indent(themeBlock)}
}

${themeList
  .map(({ id, theme }) => `[data-theme="${id}"] {\n${indent(colorVars(theme))}\n}`)
  .join("\n\n")}
`;

writeFileSync(new URL("../src/tailwind/theme.css", import.meta.url), css);
console.log(`theme.css: ${themeBlock.length} tokens, ${themeList.length} themes`);
