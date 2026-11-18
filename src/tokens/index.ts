// 플랫폼과 상관없는 디자인 값(색·간격·모서리·글자 스타일). React Native·웹 어디서나 쓴다.
import light, { Palette, makeColors } from "./light";
import dark from "./dark";
import nature from "./nature";
import ocean from "./ocean";
import sunset from "./sunset";
import sepia from "./sepia";
import ember from "./ember";
import gold from "./gold";
import sonia from "./sonia";

export type Theme = typeof light;
export type { Palette };

export type ThemeId = "light" | "dark" | "nature" | "ocean" | "sunset" | "sepia" | "ember" | "gold" | "sonia";

export type ThemeMeta = {
  id: ThemeId;
  name: string;
  theme: Theme;
};

export const themeList: ThemeMeta[] = [
  { id: "light", name: "라이트", theme: light },
  { id: "dark", name: "다크", theme: dark },
  { id: "nature", name: "숲", theme: nature },
  { id: "ocean", name: "바다", theme: ocean },
  { id: "sunset", name: "노을", theme: sunset },
  { id: "sepia", name: "세피아", theme: sepia },
  { id: "ember", name: "잉걸불", theme: ember },
  { id: "gold", name: "황금 불꽃", theme: gold },
  { id: "sonia", name: "블로그", theme: sonia },
];

export const getTheme = (themeId: ThemeId): Theme =>
  themeList.find((meta) => meta.id === themeId)!.theme;

/**
 * 웹용 CSS 변수. `<div style={toCssVars(getTheme("dark"))}>` 처럼 감싸면
 * 안쪽에서 `var(--primary)`, `var(--space-lg)`, `var(--radius-md)` 로 쓴다.
 */
export const toCssVars = (theme: Theme): Record<string, string> => ({
  ...Object.fromEntries(Object.entries(theme.colors).map(([k, v]) => [`--${k.replace("$", "")}`, v])),
  ...Object.fromEntries(Object.entries(theme.spacing).map(([k, v]) => [`--space-${k}`, `${v}px`])),
  ...Object.fromEntries(Object.entries(theme.borderRadii).map(([k, v]) => [`--radius-${k}`, `${v}px`])),
});

export { light, dark, nature, ocean, sunset, sepia, ember, gold, sonia, makeColors };
