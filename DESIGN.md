---
name: sonia-ui
description: 한 사람의 앱·웹이 함께 쓰는 디자인 시스템. 뼈대는 하나, 색은 테마로 갈아입는다.
colors:
  background: "#F6F3EE"
  surface: "#FFFFFF"
  surface-muted: "#EFEAE3"
  foreground: "#1F1B17"
  muted: "#6E655C"
  border: "rgba(31,27,23,0.09)"
  primary: "#B74018"
  primary-soft: "rgba(183,64,24,0.10)"
  on-primary: "#FFFFFF"
  flame: "#F0521F"
typography:
  hero:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, system-ui, Apple SD Gothic Neo, Noto Sans KR, sans-serif"
    fontSize: "48px"
    fontWeight: 900
    letterSpacing: "-1.4px"
  display:
    fontSize: "34px"
    fontWeight: 900
    letterSpacing: "-0.8px"
  title:
    fontSize: "26px"
    fontWeight: 800
    letterSpacing: "-0.6px"
  heading:
    fontSize: "19px"
    fontWeight: 700
    letterSpacing: "-0.3px"
  body:
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.6
  stat:
    fontSize: "15px"
    fontWeight: 800
  label:
    fontSize: "13px"
    fontWeight: 700
  caption:
    fontSize: "13px"
  overline:
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.4px"
  micro:
    fontSize: "11px"
    fontWeight: 600
  code:
    fontFamily: "ui-monospace, SF Mono, Menlo, Consolas, monospace"
rounded:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  pill: "999px"
spacing:
  xs: "4px"
  s: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "48px"
  hg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-soft:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-ghost-hover:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.foreground}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "16px"
  card-muted:
    backgroundColor: "{colors.surface-muted}"
    rounded: "{rounded.md}"
    padding: "16px"
  tag:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 12px"
  tag-muted:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 12px"
  input:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
---

# Design System: sonia-ui

## Overview

**Creative North Star: "한 사람의 작업대"**

한 사람이 여러 앱을 만들면서 늘 같은 손맛을 내기 위한 작업대다. 공구(간격·모서리·글자 단계와 `sn-*` 컴포넌트)는 언제나 같은 자리에 같은 모양으로 놓여 있다. 바뀌는 것은 작업대에 드는 빛, 곧 테마의 색뿐이다. 새 화면을 만들 때는 새 공구를 깎지 말고 있는 공구를 집어 든다.

밀도는 모바일 앱 기준이다. 본문은 15px, 라벨은 13px 굵은 글자, 제목은 26px 800 굵기로 짧고 단단하다. 기본(라이트) 테마는 따뜻한 종이빛 바탕에 테라코타 주황 강조색 하나를 쓴다. 다른 테마는 같은 열 개의 색 역할에 숲·밤바다·노을·세피아·잉걸불 같은 값을 넣은 것이다. 층은 바탕, 면, 움푹한 면의 세 단계 색과 아주 옅은 테두리로 나눈다. 그림자는 평소에 쓰지 않는다.

**Key Characteristics:**
- 열 개의 색 역할은 고정이고, 테마는 값만 바꾼다(`<html data-theme>` 하나로 전환).
- 강조색은 한 테마에 하나(primary), 따로 불씨색(flame)은 실천·연속 기록에만 쓴다.
- 둥글고 단단한 모양: 넉넉한 모서리(10·16px)와 굵은 라벨(700).
- 평소에는 평평하고, 떠오르는 요소에만 그림자를 쓴다.
- 웹과 Expo가 같은 토큰을 쓴다.

## Colors

색은 이름이 아니라 역할로 쓴다. 아래 값은 기본 라이트 테마이고, 다른 테마는 같은 역할에 다른 값이 들어간다(`src/tokens/*.ts`).

### Primary
- **테라코타 불빛** (primary): 주요 버튼, 선택 상태, 링크, 포커스 링. 한 화면에서 가장 눈에 띄어야 할 행동 하나에 쓴다.
- **옅은 테라코타** (primary-soft): 강조색을 10% 정도로 깐 배경. 보조 버튼(soft)과 태그 바탕에 쓴다.
- **강조 위 글자** (on-primary): primary 바탕 위의 글자색.

### Secondary
- **불씨** (flame): 실천·스트릭·연속 기록을 나타내는 색. primary와 비슷한 계열이지만 역할이 다르며, 일반 버튼이나 링크에는 쓰지 않는다.

### Neutral
- **종이 바탕** (background): 화면 전체 바탕.
- **떠 있는 면** (surface): 카드·시트·헤더 버튼처럼 바탕 위에 올라온 면.
- **움푹한 면** (surface-muted): 입력창·칩·muted 카드처럼 면 안으로 한 단계 들어간 영역. 버튼 hover 바탕으로도 쓴다.
- **먹색 글자** (foreground): 본문 글자.
- **흐린 글자** (muted): 설명, 작성자, 날짜 같은 보조 글자.
- **실선** (border): 9% 정도의 아주 옅은 구분선과 테두리.

### 테마
| 테마 | 성격 |
|---|---|
| 라이트 `light` | 따뜻한 종이 + 테라코타 (기본) |
| 다크 `dark` | 꺼지지 않는 잉걸불 같은 따뜻한 검정 + 주황 |
| 숲 `nature` | 이끼와 잎사귀의 차분한 초록 |
| 바다 `ocean` | 깊은 밤바다의 남색 + 하늘색 |
| 노을 `sunset` | 해 질 녘의 짙은 적갈색 + 주황 |
| 세피아 `sepia` | 오래된 종이와 잉크 |
| 잉걸불 `ember` | 30일 연속 보상. 숯 위의 붉은 불씨 |
| 황금 불꽃 `gold` | 100일 연속 보상. 금빛 불꽃 |
| 블로그 `sonia` | Sonia.dev: 깃허브 다크 + 파란 강조 |

### Named Rules
**The Role-Not-Hex Rule.** 화면 코드에 hex·rgba를 쓰지 않는다. `bg-primary`, `var(--color-surface)`처럼 역할 이름만 쓴다. 역할 이름으로 쓰지 않으면 테마를 바꿔도 그 부분은 따라 바뀌지 않는다.

**The One Light Rule.** 강조색(primary)은 한 테마에 하나다. 두 번째 강조색이 필요해 보이면 soft·muted 단계로 풀고, 새 색 역할은 이 저장소에서만 추가한다.

**The No Separate Dark Rule.** 다크 모드도 테마 하나일 뿐이다. 화면에 `dark:` 분기나 테마별 예외 스타일을 두지 않는다.

## Typography

**Body Font:** Pretendard Variable (with -apple-system, system-ui, Apple SD Gothic Neo, Noto Sans KR)
**Label/Mono Font:** ui-monospace, SF Mono, Menlo, Consolas (코드에만)

**Character:** 한 가지 글꼴로 굵기 차이만으로 위계를 만든다. 제목일수록 굵고(800~900) 자간이 좁아지며, 한국어 화면에서 촘촘하고 단단하게 읽힌다.

### Hierarchy
- **Hero** (900, 48px, 자간 -1.4px): 랜딩·첫 화면의 큰 제목. 화면당 하나.
- **Display** (900, 34px, 자간 -0.8px): 큰 숫자 하나. 모닥불 일수처럼 화면의 주인공이 되는 값.
- **Title** (800, 26px, 자간 -0.6px): 화면 제목.
- **Heading** (700, 19px, 자간 -0.3px): 시트·섹션 제목.
- **Body** (500, 15px, 줄 간격 1.6): 본문.
- **Stat** (800, 15px): 통계 칸·배지 안의 숫자.
- **Label** (700, 13px): 버튼·칩·태그 글자.
- **Caption** (13px, muted): 설명·보조 글.
- **Overline** (700, 12px, 자간 0.4px, muted): 섹션 머리말.
- **Micro** (600, 11px, muted): 요일, 워터마크 같은 아주 작은 보조 글자.

### Named Rules
**The Named Step Rule.** 글자 크기를 숫자로 쓰지 않는다. `text-title`, `text-label` 같은 단계 이름(Expo는 `variant`)만 쓴다. 맞는 단계가 없으면 이 저장소에 단계를 추가한다.

## Layout

간격은 4px에서 시작하는 이름 단계 xs 4, s 8, md 12, lg 16, xl 24, xxl 48, hg 128을 쓴다. 컴포넌트 안쪽은 s~lg, 카드 사이와 섹션 안은 lg~xl, 섹션 사이는 xxl을 쓴다. hg는 랜딩의 큰 여백에만 쓴다. 기준 화면은 phone(0)과 tablet(768px) 두 가지이고, 모바일을 먼저 설계한다.

**The Named Step Rule (간격).** `p-lg`, `gap-s`처럼 이름 단계만 쓴다. px를 직접 적지 않는다.

## Elevation & Depth

평소에는 평평하다. 깊이는 세 단계 색(바탕 → 떠 있는 면 → 움푹한 면)과 옅은 테두리로 만든다. 그림자는 화면 위로 떠오르는 상태에만 쓴다. 메뉴, 시트, 드래그 중인 요소가 여기에 해당한다. 아직 그림자 토큰은 없으므로, 처음 필요해지면 이 저장소에 토큰으로 추가한 다음 쓴다.

### Named Rules
**The Flat-At-Rest Rule.** 카드·버튼·입력은 그림자 없이 둔다. 그림자는 '지금 떠 있다'는 상태를 알릴 때만 쓴다.

## Shapes

둥글고 단단한 모양이다. 모서리는 xs 6, sm 10, md 16, lg 24, xl 32, pill 999 단계를 쓴다. 버튼과 입력은 sm(10px), 카드는 md(16px), 시트와 큰 면은 lg~xl, 태그와 칩은 pill이다. 테두리는 1px 옅은 실선(border) 하나만 쓰며, 굵은 테두리나 색 있는 테두리는 쓰지 않는다. 포커스 링은 예외로, 2px primary 외곽선을 쓴다.

## Components

모든 컴포넌트는 `sn-` 접두어를 붙인 클래스다. 순수 CSS에서는 `@layer sonia`, Tailwind에서는 `@layer components` 안에 들어가므로, 프로젝트가 직접 쓴 CSS가 항상 이긴다. Expo는 같은 토큰을 Restyle `Box`·`Text`로 쓴다.

### Buttons
`sn-btn`에 모양 하나를 조합한다. 둥글고 단단하며, 상태 변화는 색으로만 보여 준다.
- **Shape:** 둥근 모서리(10px). `sn-btn-pill`이면 완전히 둥글게.
- **Primary** (`sn-btn-primary`): primary 바탕, on-primary 글자, 13px 700, 안쪽 여백 8·16. 한 화면에 하나.
- **Soft** (`sn-btn-soft`): 옅은 강조 바탕, 강조색 글자. 두 번째로 중요한 행동.
- **Outline** (`sn-btn-outline`): 테두리 + 본문 글자. 중립 행동.
- **Ghost** (`sn-btn-ghost`): 바탕 없는 muted 글자. 툴바나 덜 중요한 행동.
- **Hover:** primary는 글자색 쪽으로 12% 섞어 살짝 어두워지고, 나머지는 surface-muted 바탕이 깔린다. 전환 시간은 0.15s.
- **Size:** `sn-btn-sm`(여백 4·12), `sn-btn-lg`(여백 12·24, 15px).
- **Disabled:** 투명도 0.5, `not-allowed` 커서.

### Chips (`sn-tag`)
- **Style:** pill 모양, 옅은 강조 바탕, 강조색 13px 700 글자, 여백 2·12.
- **Muted** (`sn-tag-muted`): 움푹한 면 바탕 + 흐린 글자. 분류나 메타 정보에 쓴다.

### Cards / Containers (`sn-card`)
- **Corner Style:** 16px.
- **Background:** surface. `sn-card-muted`는 surface-muted 바탕에 테두리가 없다.
- **Shadow Strategy:** 없음(Flat-At-Rest).
- **Border:** 1px border.
- **Internal Padding:** lg(16px).

### Inputs / Fields (`sn-input`)
- **Style:** 움푹한 면 바탕, 1px 진한 테두리(muted 80%: 장식용 border보다 진해 모든 테마에서 3:1 이상), 10px 모서리, 15px 본문 글자, 여백 8·12. placeholder는 muted.
- **Disabled:** 투명도 0.5, `not-allowed` 커서.
- **Focus:** 2px primary 외곽선(offset -1px).

## Do's and Don'ts

### Do:
- **Do** 색은 역할 이름(`bg-primary`, `var(--color-surface)`), 간격·모서리·글자는 이름 단계(`p-lg`, `rounded-md`, `text-title`)로만 쓴다.
- **Do** 버튼·카드·태그·입력은 `sn-btn`·`sn-card`·`sn-tag`·`sn-input` 조합으로 만든다.
- **Do** 층은 바탕 → surface → surface-muted 순서로 쌓는다.
- **Do** 값을 바꿔야 하면 쓰는 프로젝트가 아니라 이 저장소의 `src/tokens/*.ts`를 고친다.
- **Do** 새 화면은 라이트·다크와 다른 테마 하나 이상으로 바꿔 보며 확인한다.

### Don't:
- **Don't** hex·rgba·px 값을 화면 코드에 직접 쓰지 않는다.
- **Don't** 다크 모드를 따로 만들거나 `dark:`·테마별 예외 스타일을 두지 않는다.
- **Don't** 카드·버튼에 평소 그림자를 주지 않는다.
- **Don't** 불씨색(flame)을 일반 버튼·링크 강조에 쓰지 않는다. 글자색으로도 쓰지 않는다(밝은 테마에서 대비 3.2~3.5). 점·아이콘 같은 그래픽에만 쓴다.
- **Don't** 테마 색을 바꿀 때 primary 글자/바탕, primary/옅은 강조, 흐린 글자/움푹한 면 대비를 4.5 아래로 떨어뜨리지 않는다.
- **Don't** 쓰는 프로젝트에서 `sn-*` 클래스를 덮어써 모양을 바꾸지 않는다.
