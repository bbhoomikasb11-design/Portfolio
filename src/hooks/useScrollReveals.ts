import { useEffect } from "react";

/** Progressive enhancement: content is always readable, even before observation. */
export function useScrollReveals(pathname: string) {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const targets = document.querySelectorAll<HTMLElement>(
      ".skills-panel, .about-grid > div, .experience-list article, .recognition-grid article, .project-card, .case-sections > section, [data-reveal]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        let stagger = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (media.matches) return;
          const animation = entry.target.animate(
            [{ translate: "0 24px" }, { translate: "0 0" }],
            {
              duration: 650,
              delay: Math.min(stagger++ * 55, 165),
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
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
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
