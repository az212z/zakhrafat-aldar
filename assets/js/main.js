/* زخرفة الدار — main.js (vanilla, guarded) */
(function () {
  "use strict";

  /* ---------- Mobile menu (full-screen) ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobile-menu");
  var menuClose = document.getElementById("menu-close");

  function openMenu() {
    if (!menu) return;
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    if (burger) burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    if (burger) burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (burger) burger.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (menu) {
    menu.querySelectorAll(".mobile-nav a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeMenu(); closeLightbox(); }
  });

  /* ---------- Scroll reveal (IntersectionObserver + fallback) ---------- */
  var revealEls = [].slice.call(document.querySelectorAll(
    ".svc-card, .why-list li, .gallery-item, .section-head, .why-media, .location-card, .quote-form, .trust-chip"
  ));
  revealEls.forEach(function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = (Math.min(i % 6, 5) * 45) + "ms";
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
  // Safety fallback: nothing stays hidden
  window.setTimeout(function () {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }, 1500);

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  document.querySelectorAll(".gallery-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = btn.getAttribute("data-full");
      var img = btn.querySelector("img");
      openLightbox(src, img ? img.alt : "");
    });
  });
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------- Toast ---------- */
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove("show"); }, 4200);
  }

  /* ---------- Quote form → WhatsApp + localStorage + toast ---------- */
  var form = document.getElementById("quote-form");
  var WA_NUMBER = "966500943560";

  function setError(id, msg) {
    var field = document.getElementById(id);
    if (!field) return;
    var wrap = field.closest(".field");
    var err = document.querySelector('.field-error[data-for="' + id + '"]');
    if (wrap) wrap.classList.toggle("invalid", !!msg);
    if (err) err.textContent = msg || "";
  }

  function validPhone(v) {
    var digits = v.replace(/[\s-]/g, "");
    return /^(05\d{8}|9665\d{8}|\+9665\d{8})$/.test(digits);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("q-name");
      var phone = document.getElementById("q-phone");
      var service = document.getElementById("q-service");
      var notes = document.getElementById("q-notes");
      var ok = true;

      setError("q-name", ""); setError("q-phone", ""); setError("q-service", "");

      if (!name.value.trim()) { setError("q-name", "الرجاء كتابة الاسم"); ok = false; }
      if (!phone.value.trim()) { setError("q-phone", "الرجاء كتابة رقم الجوال"); ok = false; }
      else if (!validPhone(phone.value)) { setError("q-phone", "رقم جوال غير صحيح (مثال 05xxxxxxxx)"); ok = false; }
      if (!service.value) { setError("q-service", "الرجاء اختيار الخدمة"); ok = false; }

      if (!ok) return;

      var payload = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        service: service.value,
        notes: notes.value.trim(),
        at: new Date().toISOString()
      };

      // localStorage demo store
      try {
        var key = "zd_quotes";
        var arr = JSON.parse(localStorage.getItem(key) || "[]");
        arr.push(payload);
        localStorage.setItem(key, JSON.stringify(arr));
      } catch (err) { /* storage may be blocked; continue */ }

      var msg =
        "السلام عليكم، أرغب بطلب عرض سعر من زخرفة الدار.\n" +
        "الاسم: " + payload.name + "\n" +
        "الجوال: " + payload.phone + "\n" +
        "الخدمة: " + payload.service +
        (payload.notes ? "\nملاحظات: " + payload.notes : "");

      var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);

      showToast("تم تجهيز طلبك، يفتح واتساب الآن…");
      window.setTimeout(function () { window.open(url, "_blank"); }, 700);
      form.reset();
    });
  }

  /* ---------- Footer year (safety, already 2026 in markup) ---------- */
})();
