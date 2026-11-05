(() => {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = themeToggle?.querySelector(".theme-toggle__label");
  const themeIcon = themeToggle?.querySelector(".theme-toggle__icon");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let explicitTheme = null;

  const validTheme = (value) => value === "dark" || value === "light";

  try {
    const saved = window.localStorage.getItem("theme");
    if (validTheme(saved)) explicitTheme = saved;
  } catch {
    // Theme switching still works when browser storage is unavailable.
  }

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (themeLabel) themeLabel.textContent = theme === "dark" ? "Dark" : "Light";
    if (themeIcon) themeIcon.dataset.state = theme;
    if (themeToggle) {
      const action = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
      themeToggle.setAttribute("aria-label", action);
      themeToggle.setAttribute("title", action);
      themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    }
  };

  applyTheme(explicitTheme || (systemTheme.matches ? "dark" : "light"));

  themeToggle?.addEventListener("click", () => {
    explicitTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(explicitTheme);
    try {
      window.localStorage.setItem("theme", explicitTheme);
    } catch {
      // Keep the choice for this page even when persistence is unavailable.
    }
  });

  systemTheme.addEventListener("change", (event) => {
    if (!explicitTheme) applyTheme(event.matches ? "dark" : "light");
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== "theme" && event.key !== null) return;
    explicitTheme = validTheme(event.newValue) ? event.newValue : null;
    applyTheme(explicitTheme || (systemTheme.matches ? "dark" : "light"));
  });

  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  const closeNavigation = (restoreFocus = false) => {
    if (!navToggle || !siteNav) return;
    siteNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    if (restoreFocus) navToggle.focus();
  };

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = !siteNav.classList.contains("is-open");
      siteNav.classList.toggle("is-open", open);
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      if (open) siteNav.querySelector("a")?.focus({ preventScroll: true });
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeNavigation());
    });

    document.addEventListener("pointerdown", (event) => {
      if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
        closeNavigation();
      }
    }, { passive: true });

    siteNav.addEventListener("keydown", (event) => {
      if (siteNav.classList.contains("is-open") && event.key === "Tab" && event.shiftKey && document.activeElement === siteNav.querySelector("a")) {
        event.preventDefault();
        closeNavigation(true);
      }
    });

    siteNav.addEventListener("focusout", (event) => {
      if (event.relatedTarget && !siteNav.contains(event.relatedTarget) && event.relatedTarget !== navToggle) {
        closeNavigation();
      }
    });

    // A closed mobile menu must not retain its open state after a desktop visit.
    window.matchMedia("(max-width: 769px)").addEventListener("change", () => closeNavigation());
  }

  const imageLightbox = document.getElementById("imageLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const pageShell = document.querySelector(".page-shell");
  let lightboxTrigger = null;
  let shellWasInert = false;

  const lightboxIsOpen = () => imageLightbox?.classList.contains("is-open");

  const openLightbox = (image) => {
    if (!imageLightbox || !lightboxImage || !lightboxClose) return;
    closeNavigation();
    lightboxTrigger = image;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "Expanded project image";
    imageLightbox.classList.add("is-open");
    imageLightbox.setAttribute("aria-hidden", "false");
    imageLightbox.setAttribute("aria-modal", "true");
    document.body.classList.add("lightbox-open");
    if (pageShell && "inert" in pageShell) {
      shellWasInert = pageShell.inert;
      pageShell.inert = true;
    }
    lightboxClose.focus({ preventScroll: true });
  };

  const closeLightbox = () => {
    if (!imageLightbox || !lightboxImage || !lightboxIsOpen()) return;
    if (pageShell && "inert" in pageShell) pageShell.inert = shellWasInert;
    imageLightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    if (lightboxTrigger?.isConnected) lightboxTrigger.focus({ preventScroll: true });
    imageLightbox.setAttribute("aria-hidden", "true");
    imageLightbox.removeAttribute("aria-modal");
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    lightboxTrigger = null;
  };

  if (imageLightbox && lightboxImage && lightboxClose) {
    document.querySelectorAll(".project-showcase .media-frame img").forEach((image) => {
      image.classList.add("expandable-image");
      image.setAttribute("tabindex", "0");
      image.setAttribute("role", "button");
      image.setAttribute("aria-haspopup", "dialog");
      image.setAttribute("aria-controls", "imageLightbox");
      image.setAttribute("aria-label", `Expand image: ${image.alt || "project image"}`);
      image.addEventListener("click", () => openLightbox(image));
      image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(image);
        }
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxBackdrop?.addEventListener("click", (event) => {
      if (event.target === lightboxBackdrop) closeLightbox();
    });

    imageLightbox.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(imageLightbox.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) {
        event.preventDefault();
        imageLightbox.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Keep focus inside the viewer even on browsers without native inert support.
    document.addEventListener("focusin", (event) => {
      if (lightboxIsOpen() && !imageLightbox.contains(event.target)) {
        lightboxClose.focus({ preventScroll: true });
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (lightboxIsOpen()) {
      event.preventDefault();
      closeLightbox();
    } else if (siteNav?.classList.contains("is-open")) {
      closeNavigation(true);
    }
  });

  // A flat brush traces one small geometric drawing, then washes in two panels.
  const svgNamespace = "http://www.w3.org/2000/svg";
  const brushDrawings = [
    {
      outline: [[0, 0], [44, 0], [44, -52], [-32, -52], [-32, 0], [0, 0]],
      divisions: [[[0, -52], [0, 0]], [[0, -24], [44, -24]]],
      panels: [[-32, -52, 32, 52], [0, -24, 44, 24]]
    },
    {
      outline: [[0, 0], [0, -44], [64, -44], [64, 20], [0, 20], [0, 0]],
      divisions: [[[24, -44], [24, 20]], [[24, -8], [64, -8]]],
      panels: [[24, -44, 40, 36], [0, -44, 24, 64]]
    },
    {
      outline: [[0, 0], [44, 0], [44, 28], [-28, 28], [-28, -40], [0, -40], [0, 0]],
      divisions: [[[-28, 0], [0, 0]], [[14, 0], [14, 28]]],
      panels: [[-28, -40, 28, 40], [14, 0, 30, 28]]
    }
  ];
  const paintColors = ["var(--red)", "var(--blue)", "var(--yellow)"];
  const activeDrawings = new Set();
  let pointerStart = null;
  let drawingCount = 0;

  const svgElement = (name, attributes = {}) => {
    const element = document.createElementNS(svgNamespace, name);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
    return element;
  };

  const removeDrawing = (drawing) => {
    window.cancelAnimationFrame(drawing.frame);
    window.clearTimeout(drawing.timeout);
    drawing.element.remove();
    activeDrawings.delete(drawing);
  };

  const createBrushDrawing = (x, y) => {
    if (motionPreference.matches || root.classList.contains("intro-pending")) return;
    if (activeDrawings.size >= 4) removeDrawing(activeDrawings.values().next().value);
    const index = drawingCount++;
    const pattern = brushDrawings[index % brushDrawings.length];
    const element = document.createElement("span");
    element.className = "paint-click";
    element.setAttribute("aria-hidden", "true");
    element.dataset.pattern = String(index % brushDrawings.length);
    element.style.setProperty("--x", `${x}px`);
    element.style.setProperty("--y", `${y}px`);
    const svg = svgElement("svg", {
      class: "paint-click__drawing", viewBox: "-80 -80 160 160", focusable: "false"
    });
    const composition = svgElement("g", { transform: `scale(${index % 2 ? -1 : 1}, 1)` });
    const panels = pattern.panels.map(([left, top, width, height], i) => {
      const panel = svgElement("rect", { x: left, y: top, width, height, class: "paint-click__wash" });
      panel.style.fill = paintColors[(index + i) % paintColors.length];
      composition.appendChild(panel);
      return panel;
    });
    const paths = [pattern.outline, ...pattern.divisions].map((points, i) => {
      const path = svgElement("path", {
        d: points.map(([px, py], point) => `${point ? "L" : "M"}${px} ${py}`).join(" "),
        pathLength: "1", class: "paint-click__stroke"
      });
      path.style.stroke = i === 0 ? paintColors[index % paintColors.length] : "var(--text)";
      composition.appendChild(path);
      return { element: path, start: i === 0 ? 0 : 590 + (i - 1) * 210, duration: i === 0 ? 560 : 180 };
    });
    // The nib sits exactly on the growing line; the handle stays at a natural tilt.
    const brush = svgElement("g", { class: "paint-click__brush" });
    brush.appendChild(svgElement("path", { d: "M-1 -5 L8 -18 L12 -15 L3 -3 Z", class: "paint-click__handle" }));
    const nib = svgElement("path", { d: "M-4 -3 L2 -7 L6 -2 L0 3 Z", class: "paint-click__nib" });
    brush.appendChild(nib);
    composition.appendChild(brush);
    svg.appendChild(composition);
    element.appendChild(svg);
    document.body.appendChild(element);
    paths.forEach((path) => { path.length = path.element.getTotalLength(); });
    const drawing = { element, frame: 0, timeout: 0 };
    activeDrawings.add(drawing);
    const started = performance.now();
    const trace = (now) => {
      const elapsed = now - started;
      let workingPath = null;
      paths.forEach((path) => {
        const progress = Math.min(1, Math.max(0, (elapsed - path.start) / path.duration));
        path.element.style.strokeDashoffset = String(1 - progress);
        if (elapsed >= path.start && progress < 1) workingPath = { ...path, progress };
      });
      if (workingPath) {
        const point = workingPath.element.getPointAtLength(workingPath.length * workingPath.progress);
        brush.setAttribute("transform", `translate(${point.x} ${point.y})`);
        brush.style.opacity = "1";
        nib.style.fill = workingPath.element.style.stroke;
      } else {
        brush.style.opacity = "0";
      }
      const wash = Math.min(1, Math.max(0, (elapsed - 980) / 160));
      panels.forEach((panel) => {
        panel.style.opacity = String(wash * 0.24);
        panel.style.transform = `scaleX(${wash})`;
      });
      svg.style.opacity = String(Math.min(1, Math.max(0, (1480 - elapsed) / 220)));
      if (elapsed >= 1480) {
        removeDrawing(drawing);
      } else {
        drawing.frame = window.requestAnimationFrame(trace);
      }
    };
    drawing.frame = window.requestAnimationFrame(trace);
    drawing.timeout = window.setTimeout(() => removeDrawing(drawing), 1600);
  };

  document.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || motionPreference.matches || root.classList.contains("intro-pending") || event.target.closest("#siteIntro, #introReplay")) {
      pointerStart = null;
      return;
    }
    pointerStart = { id: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now(), moved: false };
  }, { passive: true });

  document.addEventListener("pointermove", (event) => {
    if (!pointerStart || pointerStart.id !== event.pointerId) return;
    if (Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 8) {
      pointerStart.moved = true;
    }
  }, { passive: true });

  document.addEventListener("pointerup", (event) => {
    const start = pointerStart;
    pointerStart = null;
    if (!start || start.id !== event.pointerId || start.moved || event.button !== 0 || performance.now() - start.time > 700) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) return;
    if (window.getSelection()?.isCollapsed === false) return;
    createBrushDrawing(event.clientX, event.clientY);
  }, { passive: true });

  document.addEventListener("pointercancel", () => { pointerStart = null; }, { passive: true });
  window.addEventListener("blur", () => { pointerStart = null; });
  document.addEventListener("scroll", () => { pointerStart = null; }, { passive: true, capture: true });

  motionPreference.addEventListener("change", (event) => {
    if (event.matches) {
      pointerStart = null;
      activeDrawings.forEach(removeDrawing);
    }
  });

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !motionPreference.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-revealed"));
  }
})();
