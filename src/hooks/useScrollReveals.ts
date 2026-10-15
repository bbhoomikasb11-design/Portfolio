import { useEffect } from "react";
import { motionDuration, motionEase } from "../lib/motion";

/** Progressive enhancement: content is always readable, even before observation. */
export function useScrollReveals(pathname: string) {
  useEffect(() => {
    const root = document.querySelector("main");
    // The virtual canvas owns its own entrances and gesture animation.
    if (!root || pathname === "/playground") return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const pending = new Set<HTMLElement>();
    const easing = motionEase();
    const presets = {
      heading: {
        duration: motionDuration("heading"),
        frames: [
          { clipPath: "inset(-12% -6% 85% -6%)", translate: "0 16px" },
          { clipPath: "inset(-12% -6% -15% -6%)", translate: "0 0", opacity: 1 },
        ],
      },
      image: {
        duration: motionDuration("image"),
        frames: [
          { clipPath: "inset(0 0 18% 0)", translate: "0 24px", scale: "1.025", opacity: 0.5 },
          { clipPath: "inset(0)", translate: "0 0", scale: "1", opacity: 1 },
        ],
      },
      pop: {
        duration: motionDuration("card"),
        frames: [
          { translate: "0 26px", scale: "0.94" },
          { translate: "0 -4px", scale: "1", offset: 0.72 },
          { translate: "0 0", scale: "1", opacity: 1 },
        ],
      },
      rise: {
        duration: motionDuration("image"),
        frames: [{ translate: "0 14px" }, { translate: "0 0" }],
      },
    };
    const observer = new IntersectionObserver(
      (entries) => {
        let stagger = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          const kind = target.dataset.reveal as keyof typeof presets;
          const preset = presets[kind] || presets.rise;
          // Wait for enough of a shelf card to appear, including when browsing sideways.
          if (kind === "pop" && entry.intersectionRatio < 0.15) return;
          observer.unobserve(target);
          pending.delete(target);
          if (media.matches || target.contains(document.activeElement)) return;
          const animation = target.animate(
            preset.frames,
            {
              duration: preset.duration,
              delay: kind === "heading" || kind === "image" ? 0 : Math.min(stagger++ * 65, 130),
              easing,
              fill: "backwards",
            },
          );
          animation.id = `reveal-${kind || "rise"}`;
          animations.add(animation);
          animation.finished
            .then(() => animations.delete(animation), () => animations.delete(animation));
        });
      },
      { threshold: [0, 0.15], rootMargin: "0px 0px -24px 0px" },
    );
    const observe = (element: Element) => {
      const candidates = [...element.querySelectorAll<HTMLElement>("[data-reveal]")];
      if (element.matches("[data-reveal]")) candidates.unshift(element as HTMLElement);
      candidates.forEach(target => {
        if (seen.has(target)) return;
        seen.add(target);
        pending.add(target);
        observer.observe(target);
      });
    };
    observe(root);
    // Filtered projects and modal images mount after the initial route render.
    const additions = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node instanceof Element) observe(node);
      }));
      pending.forEach(target => {
        if (target.isConnected) return;
        observer.unobserve(target);
        pending.delete(target);
        seen.delete(target);
      });
      animations.forEach(animation => {
        const target = (animation.effect as KeyframeEffect | null)?.target;
        if (target && !target.isConnected) animation.cancel();
      });
    });
    additions.observe(root, { childList: true, subtree: true });
    const stopMotion = () => {
      if (media.matches) animations.forEach((animation) => animation.cancel());
    };
    const settleFocused = (event: FocusEvent) => {
      animations.forEach(animation => {
        const target = (animation.effect as KeyframeEffect | null)?.target;
        if (event.target instanceof Node && target?.contains(event.target)) animation.cancel();
      });
    };
    root.addEventListener("focusin", settleFocused);
    media.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      additions.disconnect();
      animations.forEach((animation) => animation.cancel());
      root.removeEventListener("focusin", settleFocused);
      media.removeEventListener("change", stopMotion);
    };
  }, [pathname]);
}
