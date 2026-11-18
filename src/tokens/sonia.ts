import light, { makeColors } from "./light";

// 블로그 — ckdtjs505.github.io(Sonia.dev)의 globals.css 색. 깃허브 다크 바탕에 파란 강조
const theme = {
  ...light,
  colors: makeColors({
    background: "#0D1117", // --bg-color
    surface: "#161B22", // --card-bg 불투명
    surfaceMuted: "rgba(110,118,129,0.3)", // 코드·칩 배경
    foreground: "#E6EDF3", // --text-primary
    muted: "#8B949E", // --text-secondary
    border: "rgba(48,54,61,0.5)", // --card-border
    primary: "#58A6FF", // --accent-color
    primarySoft: "rgba(88,166,255,0.1)",
    onPrimary: "#0D1117",
    flame: "#E3B341", // 강조 노랑
  }),
  barStyle: "light",
};

export default theme;
