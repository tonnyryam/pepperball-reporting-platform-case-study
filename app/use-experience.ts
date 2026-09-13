"use client";

import { useEffect, useRef, useState } from "react";

const sectionIds = ["outputs", "workflow", "technical", "depth"];

export function useExperience() {
  const [active, setActive] = useState("");
  const progress = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const header = document.querySelector<HTMLElement>(".sticky-shell");
    const details = [...document.querySelectorAll<HTMLDetailsElement>(".depth-list > details")];
    const animations = new Map<HTMLDetailsElement, Animation>();
    const desired = new Map<HTMLDetailsElement, boolean>();
    const cleanups: (() => void)[] = [];
    let frame = 0;
    let hashFrame = 0;
    const update = () => {
      frame = 0;
      const offset = (header?.getBoundingClientRect().height || 64) + 20;
      root.style.setProperty("--header-offset", `${offset}px`);
      const maximum = root.scrollHeight - innerHeight;
      progress.current?.style.setProperty("transform", `scaleX(${maximum > 0 ? Math.max(0, Math.min(1, scrollY / maximum)) : 0})`);
      let current = "";
      sectionIds.forEach(id => { if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= offset + 1) current = id; });
      if (current && maximum > 0 && scrollY >= maximum - 2) current = "depth";
      setActive(previous => previous === current ? previous : current);
      document.querySelector(".assistant-tabs")?.setAttribute("aria-orientation", matchMedia("(max-width: 700px)").matches ? "horizontal" : "vertical");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    if (header) resize?.observe(header);
    resize?.observe(document.body);

    // Arm only below-fold elements; initial and fallback content always stays visible.
    const reveal = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        entry.target.classList.remove("reveal-pending");
        reveal?.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -24px" }) : null;
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(element => {
      if (!reduced.matches && reveal && element.getBoundingClientRect().top >= innerHeight) {
        element.classList.add("reveal-pending");
        reveal.observe(element);
      } else element.classList.add("in-view");
    });

    const settle = (detail: HTMLDetailsElement, open: boolean, animate = true) => {
      const from = detail.getBoundingClientRect().height;
      const old = animations.get(detail);
      if (old) { old.onfinish = null; old.cancel(); animations.delete(detail); }
      desired.set(detail, open);
      detail.style.height = "";
      detail.style.overflow = "";
      const summary = detail.querySelector("summary")!;
      summary.setAttribute("aria-expanded", String(open));
      if (!open && detail.contains(document.activeElement) && document.activeElement !== summary) summary.focus({ preventScroll: true });
      if (reduced.matches || !animate || typeof detail.animate !== "function") { detail.open = open; schedule(); return; }
      detail.open = true;
      const to = open ? detail.getBoundingClientRect().height : summary.getBoundingClientRect().height + 1;
      detail.style.overflow = "hidden";
      const animation = detail.animate([{ height: `${from}px` }, { height: `${to}px` }], { duration: 220, easing: "cubic-bezier(.2,.7,.2,1)" });
      animations.set(detail, animation);
      animation.onfinish = () => {
        detail.open = open;
        detail.style.overflow = "";
        animations.delete(detail);
        schedule();
      };
    };
    const openOnly = (target: HTMLDetailsElement | null, animate: boolean) => {
      details.forEach(detail => { if (detail === target || detail.open || desired.get(detail)) settle(detail, detail === target, animate); });
    };
    details.forEach(detail => {
      const summary = detail.querySelector("summary")!;
      const content = detail.querySelector<HTMLElement>(".depth-content")!;
      content.id = `${detail.id}-content`;
      summary.setAttribute("aria-controls", content.id);
      summary.setAttribute("aria-expanded", String(detail.open));
      const click = (event: MouseEvent) => {
        event.preventDefault();
        const opening = !(desired.get(detail) ?? detail.open);
        if (opening) openOnly(detail, true); else settle(detail, false);
        history.replaceState(null, "", opening ? `#${detail.id}` : "#depth");
      };
      summary.addEventListener("click", click);
      cleanups.push(() => summary.removeEventListener("click", click));
    });
    const hashTarget = () => {
      let id = "";
      try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!(target instanceof HTMLDetailsElement)) return;
      openOnly(target, false);
      cancelAnimationFrame(hashFrame);
      hashFrame = requestAnimationFrame(() => { target.scrollIntoView({ block: "start", behavior: "instant" }); schedule(); });
    };
    hashTarget();
    addEventListener("hashchange", hashTarget);
    addEventListener("popstate", hashTarget);
    const reduceChanged = () => {
      if (!reduced.matches) return;
      document.querySelectorAll(".reveal-pending").forEach(element => { element.classList.remove("reveal-pending"); element.classList.add("in-view"); });
      details.forEach(detail => settle(detail, desired.get(detail) ?? detail.open, false));
    };
    reduced.addEventListener("change", reduceChanged);
    return () => {
      cancelAnimationFrame(frame); cancelAnimationFrame(hashFrame);
      removeEventListener("scroll", schedule); removeEventListener("resize", schedule);
      removeEventListener("hashchange", hashTarget); removeEventListener("popstate", hashTarget);
      reduced.removeEventListener("change", reduceChanged);
      resize?.disconnect(); reveal?.disconnect();
      animations.forEach(animation => { animation.onfinish = null; animation.cancel(); });
      details.forEach(detail => { detail.style.overflow = ""; });
      document.querySelectorAll(".reveal-pending").forEach(element => element.classList.remove("reveal-pending"));
      cleanups.forEach(cleanup => cleanup());
      root.style.removeProperty("--header-offset");
    };
  }, []);
  return { active, progress };
}
