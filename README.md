# fire-theme

self-fire 앱의 테마(8종 색·간격·글자 스타일)와 Restyle `Box`/`Text`/`SafeAreaView`.
Expo/React Native 전용. TS 소스를 그대로 배포하므로 Metro가 빌드한다.

## 설치

```sh
npm i github:ckdtjs505/fire-theme @shopify/restyle react-native-safe-area-context
```

## 사용

```tsx
import { ThemeProvider, getTheme, Box, Text, useAppTheme } from "fire-theme";

export default function App() {
  return (
    <ThemeProvider theme={getTheme("dark")}>
      <Box flex={1} backgroundColor="$background" padding="lg">
        <Text variant="title">안녕</Text>
      </Box>
    </ThemeProvider>
  );
}
```

- 테마 목록: `themeList` (id·이름·theme), 하나 꺼내기: `getTheme(id)`
- 내 색으로 새 테마: `createTheme({ ...light, colors: makeColors({...}) })`
- 색 역할: `$background $surface $surfaceMuted $foreground $muted $border $primary $primarySoft $onPrimary $flame`
- 글자 variant: `display title heading body caption label stat micro overline`

## 업데이트 받기

```sh
npm i github:ckdtjs505/fire-theme   # 최신 main
```
