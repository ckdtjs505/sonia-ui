import light, { makeColors } from "./light";

// 숲 — 이끼와 잎사귀의 차분한 초록
const theme = {
  ...light,
  colors: makeColors({
    background: "#EDF1E8",
    surface: "#F9FBF6",
    surfaceMuted: "#E2E8DA",
    foreground: "#1D2A1E",
    muted: "#5C6A55",
    border: "rgba(29,42,30,0.09)",
    primary: "#2C7347",
    primarySoft: "rgba(44,115,71,0.11)",
    onPrimary: "#FFFFFF",
    flame: "#E0571F",
  }),
  barStyle: "dark",
};

export default theme;
