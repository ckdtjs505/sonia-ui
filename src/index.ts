import { useTheme } from "@shopify/restyle";
import light, { Theme, Palette, makeColors } from "./light";
import dark from "./dark";
import nature from "./nature";
import ocean from "./ocean";
import sunset from "./sunset";
import sepia from "./sepia";
import ember from "./ember";
import gold from "./gold";

export type ThemeId = "light" | "dark" | "nature" | "ocean" | "sunset" | "sepia" | "ember" | "gold";

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
];

export const getTheme = (themeId: ThemeId): Theme =>
  themeList.find((meta) => meta.id === themeId)!.theme;

/** 지금 테마(색·간격·글자 스타일). ThemeProvider 안에서만 쓴다. */
export const useAppTheme = () => useTheme<Theme>();

export { ThemeProvider } from "@shopify/restyle";
export { light, dark, nature, ocean, sunset, sepia, ember, gold, makeColors };
export type { Theme, Palette };
export { default as Box } from "./box";
export { default as Text, MAX_FONT_SIZE_MULTIPLIER } from "./text";
export { default as SafeAreaView } from "./safeAreaView";
