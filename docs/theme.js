// 자동 생성 파일 — scripts/build-docs.ts. 직접 고치지 말 것.
// sonia-ui 테마 선택. <head>에 넣기만 하면 된다.
//   <select data-theme-select></select>      테마 고르는 상자 (자동으로 채움)
//   <div data-theme-buttons></div>           테마 버튼들 (자동으로 채움)
//   window.sonia.setTheme("ocean")           코드로 바꾸기
//   addEventListener("sonia:themechange", e => e.detail.id)   바뀔 때 알림
// 고른 값은 localStorage "theme"에 남는다. 없으면 <html data-theme> 값, 그것도 없으면 기기 설정(light/dark).
(() => {
  const themes = [{"id":"light","name":"라이트","scheme":"light"},{"id":"dark","name":"다크","scheme":"dark"},{"id":"nature","name":"숲","scheme":"light"},{"id":"ocean","name":"바다","scheme":"dark"},{"id":"sunset","name":"노을","scheme":"dark"},{"id":"sepia","name":"세피아","scheme":"light"},{"id":"ember","name":"잉걸불","scheme":"dark"},{"id":"gold","name":"황금 불꽃","scheme":"dark"},{"id":"sonia","name":"블로그","scheme":"dark"}];
  const root = document.documentElement;
  const find = (id) => themes.find((t) => t.id === id);
  const system = () => (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch {}

  const apply = (id) => {
    const t = find(id) || find(system());
    root.dataset.theme = t.id;
    root.dataset.scheme = t.scheme;
    return t;
  };
  apply(saved || root.dataset.theme);

  const btnOn = "sn-btn sn-btn-primary sn-btn-sm sn-btn-pill";
  const btnOff = "sn-btn sn-btn-outline sn-btn-sm sn-btn-pill";
  const sync = () => {
    for (const sel of document.querySelectorAll("[data-theme-select]")) sel.value = root.dataset.theme;
    for (const b of document.querySelectorAll("[data-theme-buttons] button")) {
      const on = b.value === root.dataset.theme;
      b.className = on ? btnOn : btnOff;
      b.setAttribute("aria-pressed", String(on));
    }
  };

  const setTheme = (id) => {
    const t = apply(id);
    try { localStorage.setItem("theme", t.id); } catch {}
    sync();
    dispatchEvent(new CustomEvent("sonia:themechange", { detail: t }));
  };

  const wire = () => {
    for (const sel of document.querySelectorAll("[data-theme-select]")) {
      if (!sel.options.length) sel.innerHTML = themes.map((t) => `<option value="${t.id}">${t.name}</option>`).join("");
      sel.addEventListener("change", () => setTheme(sel.value));
    }
    for (const box of document.querySelectorAll("[data-theme-buttons]")) {
      box.innerHTML = themes.map((t) => `<button type="button" value="${t.id}">${t.name}</button>`).join("");
      box.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) setTheme(b.value); });
    }
    sync();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire); else wire();

  window.sonia = { themes, setTheme, getTheme: () => root.dataset.theme };
})();
