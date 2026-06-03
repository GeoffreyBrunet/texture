/* ============================================================
   texture — theme.js
   menu mobile · tiroir panier AJAX · stepper · variantes
   ============================================================ */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- money ---------- */
  let CURRENCY = (window.Shopify && Shopify.currency && Shopify.currency.active) || "EUR";
  const money = (cents) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: CURRENCY }).format((cents || 0) / 100);

  /* ---------- mobile menu ---------- */
  const menuPanel = $("[data-menu-panel]");
  const menuScrim = $("[data-menu-scrim]");
  const openMenu = () => { menuPanel.classList.add("open"); menuScrim.classList.add("open"); menuPanel.setAttribute("aria-hidden", "false"); };
  const closeMenu = () => { menuPanel.classList.remove("open"); menuScrim.classList.remove("open"); menuPanel.setAttribute("aria-hidden", "true"); };
  $$("[data-menu-open]").forEach((b) => b.addEventListener("click", openMenu));
  $$("[data-menu-close]").forEach((b) => b.addEventListener("click", closeMenu));
  if (menuScrim) menuScrim.addEventListener("click", closeMenu);

  /* ---------- cart drawer ---------- */
  const drawer = $("[data-cart-drawer]");
  const drawerScrim = $("[data-cart-scrim]");
  const openCart = () => { drawer.classList.add("open"); drawerScrim.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); refreshCart(); };
  window.__textureOpenCart = openCart;
  const closeCart = () => { drawer.classList.remove("open"); drawerScrim.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); };
  $$("[data-cart-open]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); openCart(); }));
  $$("[data-cart-close]").forEach((b) => b.addEventListener("click", closeCart));
  if (drawerScrim) drawerScrim.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); closeMenu(); } });

  /* ---------- render drawer from /cart.js ---------- */
  function lineHTML(item) {
    const img = item.image
      ? `<img src="${item.image.replace(/(\.[^.]+)(\?|$)/, "_120x120$1$2")}" alt="" style="width:100%;height:100%;object-fit:cover;">`
      : `<div class="pmedia" style="background:var(--card-2);"></div>`;
    const variant = item.variant_title && !/default/i.test(item.variant_title)
      ? `<div style="font:400 11px/1.2 var(--ui);color:var(--mono);text-transform:lowercase;margin-top:4px;">${item.variant_title.toLowerCase()}</div>` : "";
    return `
      <div class="cart-line" data-line-key="${item.key}">
        <a class="thumb" href="${item.url}">${img}</a>
        <div style="flex:1;min-width:0;">
          <div class="flex between gap8">
            <a class="name" href="${item.url}" style="font:500 14px/1.2 var(--ui);text-transform:lowercase;">${item.product_title.toLowerCase()}</a>
            <span class="dymo">${money(item.final_line_price)}</span>
          </div>
          ${variant}
          <div class="flex between" style="margin-top:10px;">
            <div class="stepper" data-drawer-stepper data-key="${item.key}">
              <button type="button" class="minus" aria-label="moins"><svg width="12" height="2" viewBox="0 0 12 2" fill="currentColor" aria-hidden="true"><rect width="12" height="2" rx="1"/></svg></button>
              <span class="q">${item.quantity}</span>
              <button type="button" class="plus" aria-label="plus"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
            </div>
            <button class="remove" data-remove="${item.key}">retirer</button>
          </div>
        </div>
      </div>`;
  }

  function paintCart(cart) {
    CURRENCY = cart.currency || CURRENCY;
    // header counts
    $$("[data-cart-count]").forEach((el) => { el.textContent = cart.item_count; el.toggleAttribute("hidden", cart.item_count === 0); });
    const dc = $("[data-drawer-count]"); if (dc) dc.textContent = cart.item_count || "";
    if (!drawer) return;
    const items = $("[data-drawer-items]");
    const foot = $("[data-drawer-foot]");
    if (cart.item_count === 0) {
      items.innerHTML = `
        <div class="cart-empty">
          <p style="font:500 15px/1.4 var(--ui);color:var(--ink-soft);text-transform:lowercase;margin:0;">votre panier est vide.</p>
          <a class="btn btn-acc" href="/collections/all" data-cart-close>voir la carte</a>
        </div>`;
      foot.hidden = true;
      $$("[data-cart-close]", items).forEach((b) => b.addEventListener("click", closeCart));
    } else {
      items.innerHTML = cart.items.map(lineHTML).join("");
      $("[data-drawer-total]").textContent = money(cart.total_price);
      foot.hidden = false;
      bindDrawerLines();
    }
  }

  function refreshCart() {
    fetch("/cart.js", { headers: { "Content-Type": "application/json" } })
      .then((r) => r.json()).then(paintCart).catch(() => {});
  }

  function changeLine(key, qty) {
    fetch("/cart/change.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ id: key, quantity: qty }),
    }).then((r) => r.json()).then((cart) => { paintCart(cart); if (window.location.pathname === "/cart") window.location.reload(); }).catch(() => {});
  }

  function bindDrawerLines() {
    $$("[data-drawer-stepper]").forEach((st) => {
      const key = st.dataset.key;
      const q = +$(".q", st).textContent;
      $(".minus", st).addEventListener("click", () => changeLine(key, Math.max(0, q - 1)));
      $(".plus", st).addEventListener("click", () => changeLine(key, q + 1));
    });
    $$("[data-remove]").forEach((b) => b.addEventListener("click", () => changeLine(b.dataset.remove, 0)));
  }

  /* ---------- AJAX add to cart ---------- */
  $$(".js-add-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn ? btn.innerHTML : "";
      const svgDots = `<svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor" aria-hidden="true"><circle cx="2" cy="2" r="1.5"/><circle cx="8" cy="2" r="1.5"/><circle cx="14" cy="2" r="1.5"/></svg>`;
      const svgCheck = `<svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden="true"><path d="M1 5l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      if (btn) { btn.disabled = true; btn.innerHTML = svgDots; }
      fetch("/cart/add.js", { method: "POST", body: new FormData(form), headers: { "Accept": "application/json" } })
        .then((r) => r.json())
        .then(() => { if (btn) btn.innerHTML = svgCheck; refreshCart(); openCart(); })
        .catch(() => { if (btn) { btn.disabled = false; btn.innerHTML = original; } })
        .finally(() => { if (btn) setTimeout(() => { btn.disabled = false; btn.innerHTML = original; }, 900); });
    });
  });

  /* ---------- product page: stepper, variants, total ---------- */
  const pform = $("#product-form");
  if (pform) {
    const qtyEl = $("[data-qty]", pform);
    const qtyInput = $("[data-qty-input]", pform);
    const stepper = $("[data-stepper]", pform);
    const priceEl = $("[data-price]");
    const totalEl = $("[data-total]");
    let unitText = priceEl ? priceEl.textContent : "";

    const parseMoney = (t) => parseFloat((t || "0").replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3})/g, "").replace(",", ".")) || 0;
    const updateTotal = () => {
      const q = +qtyInput.value || 1;
      if (totalEl) totalEl.textContent = new Intl.NumberFormat("fr-FR", { style: "currency", currency: CURRENCY }).format(parseMoney(unitText) * q);
    };

    if (stepper) {
      $(".minus", stepper).addEventListener("click", () => { const q = Math.max(1, (+qtyInput.value || 1) - 1); qtyInput.value = q; qtyEl.textContent = q; updateTotal(); });
      $(".plus", stepper).addEventListener("click", () => { const q = (+qtyInput.value || 1) + 1; qtyInput.value = q; qtyEl.textContent = q; updateTotal(); });
    }
    // variant radios update price
    $$("[data-variant-radios] input[type=radio]", pform).forEach((r) => {
      r.addEventListener("change", () => {
        $$("[data-variant-radios] .pill", pform).forEach((p) => p.classList.remove("on"));
        r.closest(".pill").classList.add("on");
        if (r.dataset.price) { unitText = r.dataset.price; if (priceEl) priceEl.textContent = r.dataset.price; updateTotal(); }
      });
    });
    updateTotal();
  }

  /* ---------- cart page steppers ---------- */
  $$("[data-cart-stepper]").forEach((st) => {
    const key = st.dataset.key;
    const q = +$(".q", st).textContent;
    $(".minus", st).addEventListener("click", () => changeLine(key, Math.max(0, q - 1)));
    $(".plus", st).addEventListener("click", () => changeLine(key, q + 1));
  });

  /* header scroll shadow */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* nav active */
  const currentPath = window.location.pathname;
  $$('.nav-desktop a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) a.classList.add('is-active');
  });

  /* initial count sync */
  refreshCart();
})();
