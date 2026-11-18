// 자동 생성 파일 — scripts/build-docs.ts. 직접 고치지 말 것.
(() => {
  const themes = [["light","라이트"],["dark","다크"],["nature","숲"],["ocean","바다"],["sunset","노을"],["sepia","세피아"],["ember","잉걸불"],["gold","황금 불꽃"]];
  const root = document.documentElement;
  const on = "rounded-pill bg-primary px-md py-xs text-label text-on-primary";
  const off = "rounded-pill border border-border px-md py-xs text-label text-muted hover:text-foreground";

  const set = (id) => {
    root.dataset.theme = id;
    try { localStorage.setItem("theme", id); } catch {}
    sync();
  };

  const sync = () => {
    for (const sel of document.querySelectorAll("[data-theme-select]")) sel.value = root.dataset.theme;
    for (const b of document.querySelectorAll("[data-theme-buttons] button")) {
      const active = b.value === root.dataset.theme;
      b.className = active ? on : off;
      b.setAttribute("aria-pressed", String(active));
    }
  };

  for (const sel of document.querySelectorAll("[data-theme-select]")) {
    sel.innerHTML = themes.map(([id, name]) => `<option value="${id}">${name}</option>`).join("");
    sel.onchange = () => set(sel.value);
  }
  for (const box of document.querySelectorAll("[data-theme-buttons]")) {
    box.innerHTML = themes.map(([id, name]) => `<button type="button" value="${id}">${name}</button>`).join("");
    box.onclick = (e) => { const b = e.target.closest("button"); if (b) set(b.value); };
  }
  sync();
})();
