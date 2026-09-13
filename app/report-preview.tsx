"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ReportPreview({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const [actualSize, setActualSize] = useState(false);
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    const gutter = innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gutter) document.body.style.paddingRight = `${gutter}px`;
    const current = dialog.current;
    current?.showModal();
    close.current?.focus({ preventScroll: true });
    return () => {
      current?.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = padding;
      trigger?.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={dialog} className="preview-modal" aria-label="Synthetic report preview" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }}>
    <div className="preview-toolbar"><div role="group" aria-label="Report zoom"><button type="button" aria-pressed={!actualSize} onClick={() => setActualSize(false)}>Fit to window</button><button type="button" aria-pressed={actualSize} onClick={() => setActualSize(true)}>Actual size</button></div><button ref={close} type="button" onClick={onClose} aria-label="Close enlarged preview">Close ×</button></div>
    <div className={`preview-canvas${actualSize ? " actual-size" : ""}`} tabIndex={0} aria-label="Report image; scroll to inspect at actual size"><Image src="/synthetic-report-summary.png" width={2172} height={1097} alt="Enlarged synthetic reporting workbook summary showing operational measures and evidence status"/></div>
  </dialog>;
}
