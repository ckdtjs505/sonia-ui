# sonia-ui

내 모든 앱이 함께 쓰는 디자인 시스템. 색·간격·글자 스타일을 한 곳에서 관리한다.
TS 소스를 그대로 배포하므로 쓰는 쪽 번들러(Metro·Vite·Next)가 빌드한다.

| 경로 | 무엇 | 어디서 |
|---|---|---|
| `sonia-ui/tokens` | 테마 8종 값, `getTheme`, `themeList`, `toCssVars` | 웹·앱 모두 |
| `sonia-ui/native` | tokens 전부 + `Box` `Text` `SafeAreaView` `ThemeProvider` `useAppTheme` | React Native(Expo) |

## 앱 (Expo)

```sh
npm i github:ckdtjs505/sonia-ui @shopify/restyle react-native-safe-area-context
```

```tsx
import { ThemeProvider, getTheme, Box, Text } from "sonia-ui/native";

<ThemeProvider theme={getTheme("dark")}>
  <Box flex={1} backgroundColor="$background" padding="lg">
    <Text variant="title">안녕</Text>
  </Box>
</ThemeProvider>
```

Jest를 쓰면 `transformIgnorePatterns`의 허용 목록에 `sonia-ui`를 넣는다.

## 웹 (React · Vite · Next)

```sh
npm i github:ckdtjs505/sonia-ui
```

```tsx
import { getTheme, toCssVars } from "sonia-ui/tokens";

<div style={toCssVars(getTheme("dark"))}>
  <h1 style={{ color: "var(--primary)", padding: "var(--space-lg)" }}>안녕</h1>
</div>
```

Next는 `next.config`에 `transpilePackages: ["sonia-ui"]`를 넣는다.

## 값

- 색 변수: `background surface surfaceMuted foreground muted border primary primarySoft onPrimary flame`
- 간격 `--space-*`: `0 xs s md lg xl xxl hg` / 모서리 `--radius-*`: `xs sm md lg xl pill`
- 글자 variant(native): `display title heading body caption label stat micro overline`
- 새 테마: `{ ...light, colors: makeColors({...}) }`
