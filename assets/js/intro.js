(() => {
  "use strict";

  const root = document.documentElement;
  const intro = document.getElementById("siteIntro");
  const skip = document.getElementById("introSkip");
  const replay = document.getElementById("introReplay");
  const main = document.getElementById("main");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const introClasses = ["intro-pending", "intro-running", "intro-leaving"];
  const duration = 3200;
  const exitDuration = 420;
  let phase = "idle";
  let durationTimer = 0;
  let exitTimer = 0;
  let backgroundState = [];

  const clearWatchdog = () => {
    window.clearTimeout(window.__leslieIntroWatchdog);
    window.__leslieIntroWatchdog = 0;
  };

  if (!intro || !skip) {
    root.classList.remove(...introClasses);
    clearWatchdog();
    return;
  }

  const markSeen = () => {
    try { window.sessionStorage.setItem("leslie-intro-seen", "1"); } catch (_) {}
  };

  const updateReplay = () => {
    if (!replay) return;
    replay.hidden = reducedMotion.matches;
    replay.disabled = phase !== "idle";
  };

  const restoreBackground = () => {
    backgroundState.forEach(({ element, inert, ariaHidden }) => {
      if (inert === null) element.removeAttribute("inert");
      else element.setAttribute("inert", inert);
      if (ariaHidden === null) element.removeAttribute("aria-hidden");
      else element.setAttribute("aria-hidden", ariaHidden);
    });
    backgroundState = [];
  };

  const reset = ({ restoreFocus = true, userInitiated = false, remember = true } = {}) => {
    const hadIntro = phase !== "idle" || root.classList.contains("intro-pending");
    const focusInside = intro.contains(document.activeElement);
    window.clearTimeout(durationTimer);
    window.clearTimeout(exitTimer);
    clearWatchdog();
    phase = "idle";
    root.classList.remove(...introClasses);
    restoreBackground();
    intro.hidden = true;
    intro.setAttribute("aria-hidden", "true");
    intro.removeAttribute("aria-modal");
    updateReplay();
    if (remember && hadIntro) markSeen();
    if (restoreFocus && (userInitiated || focusInside)) main?.focus({ preventScroll: true });
    if (hadIntro) window.dispatchEvent(new CustomEvent("leslie:intro-end"));
  };

  const finish = ({ immediate = false, userInitiated = false, restoreFocus = true } = {}) => {
    if (phase === "idle") {
      if (root.classList.contains("intro-pending")) reset({ restoreFocus, userInitiated });
      return;
    }
    if (immediate || reducedMotion.matches) {
      reset({ restoreFocus, userInitiated });
      return;
    }
    if (phase === "leaving") return;
    window.clearTimeout(durationTimer);
    phase = "leaving";
    root.classList.add("intro-leaving");
    exitTimer = window.setTimeout(() => reset({ restoreFocus, userInitiated }), exitDuration);
  };

  const play = ({ isReplay = false } = {}) => {
    if (reducedMotion.matches || document.body.classList.contains("lightbox-open")) {
      if (root.classList.contains("intro-pending")) reset({ restoreFocus: false, remember: false });
      return;
    }
    if (phase !== "idle") return;
    const keepHeadWatchdog = !isReplay && Boolean(window.__leslieIntroWatchdog);
    window.clearTimeout(durationTimer);
    window.clearTimeout(exitTimer);
    if (!keepHeadWatchdog) clearWatchdog();
    root.classList.remove("intro-running", "intro-leaving");
    root.classList.add("intro-pending");
    intro.hidden = false;
    intro.setAttribute("role", "dialog");
    intro.setAttribute("aria-labelledby", "introTitle");
    intro.setAttribute("aria-hidden", "false");
    intro.setAttribute("aria-modal", "true");
    backgroundState = Array.from(document.querySelectorAll(".page-shell, .skip-link"), (element) => ({
      element,
      inert: element.getAttribute("inert"),
      ariaHidden: element.getAttribute("aria-hidden")
    }));
    backgroundState.forEach(({ element }) => {
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
    });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    phase = "playing";
    updateReplay();
    // Reading the initial state makes a replay restart the CSS sequence cleanly.
    void intro.offsetWidth;
    root.classList.add("intro-running");
    skip.focus({ preventScroll: true });
    durationTimer = window.setTimeout(() => finish(), duration);
    if (!keepHeadWatchdog) {
      window.__leslieIntroWatchdog = window.setTimeout(() => {
        root.classList.remove(...introClasses);
        window.dispatchEvent(new Event("leslie:intro-timeout"));
      }, 5000);
    }
    window.dispatchEvent(new CustomEvent("leslie:intro-start", { detail: { replay: isReplay } }));
  };

  skip.addEventListener("click", () => finish({ userInitiated: true }));
  replay?.addEventListener("click", () => play({ isReplay: true }));

  document.addEventListener("keydown", (event) => {
    if (phase === "idle") return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      finish({ userInitiated: true });
    } else if (event.key === "Tab") {
      // The welcome screen has one control. Its decorative graph is not tabbable.
      event.preventDefault();
      skip.focus({ preventScroll: true });
    }
  }, true);

  document.addEventListener("focusin", (event) => {
    if (phase !== "idle" && !intro.contains(event.target)) skip.focus({ preventScroll: true });
  });

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) finish({ immediate: true });
    updateReplay();
  });

  window.addEventListener("leslie:intro-timeout", () => {
    // The head-script watchdog can fire even if setup did not finish.
    reset({ restoreFocus: true });
  });

  window.addEventListener("pagehide", () => reset({ restoreFocus: false }));
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) reset({ restoreFocus: false, remember: false });
    updateReplay();
  });

  updateReplay();
  if (root.classList.contains("intro-pending")) play();
  else {
    intro.hidden = true;
    intro.setAttribute("aria-hidden", "true");
    intro.removeAttribute("aria-modal");
    clearWatchdog();
  }
})();
