import { useEffect } from "react";

/** Progressive enhancement: content is always readable, even before observation. */
export function useScrollReveals(pathname: string) {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const targets = document.querySelectorAll<HTMLElement>(
      ".skills-panel, .about-overview > div, .about-focus article, .experience-list article, .achievement-grid article, .project-card, .case-sections > section, [data-reveal]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        let stagger = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const isAchievement = entry.target.classList.contains("achievement-card");
          // Wait for enough of a shelf card to appear, including when browsing sideways.
          if (isAchievement && entry.intersectionRatio < 0.15) return;
          observer.unobserve(entry.target);
          if (media.matches) return;
          const animation = entry.target.animate(
            isAchievement
              ? [
                  { translate: "0 26px", scale: "0.94", opacity: 0.55 },
                  { translate: "0 -4px", scale: "1", opacity: 1, offset: 0.72 },
                  { translate: "0 0", scale: "1", opacity: 1 },
                ]
              : [{ translate: "0 24px" }, { translate: "0 0" }],
            {
              duration: 650,
              delay: Math.min(stagger++ * (isAchievement ? 85 : 55), 170),
              easing: "cubic-bezier(.16,1,.3,1)",
              fill: "backwards",
            },
          );
          animations.add(animation);
          animation.finished
            .then(() => animations.delete(animation))
            .catch(() => {});
        });
      },
      { threshold: [0, 0.15], rootMargin: "0px 0px -24px 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    const stopMotion = () => {
      if (media.matches) animations.forEach((animation) => animation.cancel());
    };
    media.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      media.removeEventListener("change", stopMotion);
    };
  }, [pathname]);
}
