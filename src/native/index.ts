// React Native 전용: Restyle 위에 만든 Box/Text와 테마 훅. 디자인 값은 tokens에서 그대로 다시 내보낸다.
import { useTheme } from "@shopify/restyle";
import { Theme } from "../tokens";

export * from "../tokens";

/** 지금 테마(색·간격·글자 스타일). ThemeProvider 안에서만 쓴다. */
export const useAppTheme = () => useTheme<Theme>();

export { ThemeProvider } from "@shopify/restyle";
export { default as Box } from "./box";
export { default as Text, MAX_FONT_SIZE_MULTIPLIER } from "./text";
export { default as SafeAreaView } from "./safeAreaView";
