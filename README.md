# sonia-ui

내 모든 앱이 함께 쓰는 디자인 시스템. **Tailwind 클래스로 쓴다.**
문서: https://ckdtjs505.github.io/sonia-ui/

## 웹 (Tailwind v4)

```sh
npm i github:ckdtjs505/sonia-ui
```

```css
/* app.css */
@import "tailwindcss";
@import "sonia-ui/tailwind.css";
```

```html
<html data-theme="dark">
<div class="rounded-md bg-surface p-lg">
  <h1 class="text-title">안녕</h1>
</div>
```

## 앱 (Expo)

```sh
npm i github:ckdtjs505/sonia-ui @shopify/restyle react-native-safe-area-context
```

```tsx
import { ThemeProvider, getTheme, Box, Text } from "sonia-ui/native";

<ThemeProvider theme={getTheme("dark")}>
  <Box backgroundColor="$background" padding="lg">
    <Text variant="title">안녕</Text>
  </Box>
</ThemeProvider>
```

## 이름

| 종류 | 웹 클래스 | 앱 |
|---|---|---|
| 색 | `bg-primary` `text-muted` `border-border` … | `"$primary"` |
| 간격 | `p-lg` `gap-md` (`xs s md lg xl xxl hg`) | `padding="lg"` |
| 모서리 | `rounded-md` (`xs sm md lg xl pill`) | `borderRadius="md"` |
| 글자 | `text-title` (`display title heading body stat label caption overline micro`) | `variant="title"` |
| 테마 | `data-theme="dark"` (`light dark nature ocean sunset sepia ember gold`) | `getTheme("dark")` |

## 값 고치기

`src/tokens/`만 고치고 `npm run build` → `src/tailwind/theme.css`와 문서가 다시 만들어진다.
