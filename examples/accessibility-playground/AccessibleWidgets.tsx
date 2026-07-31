import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export function AccessibleModal() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) { triggerRef.current?.focus(); return; }
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])');
    focusable?.[0]?.focus();
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return <div><button ref={triggerRef} onClick={() => setOpen(true)}>Open dialog</button>{open && <div className="modal-backdrop" role="presentation"><div ref={dialogRef} className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}><h2 id={titleId}>Confirm change</h2><p>This dialog traps focus and closes with Escape.</p><button onClick={() => setOpen(false)}>Cancel</button><button onClick={() => setOpen(false)}>Confirm</button></div></div>}</div>;
}

export function AccessibleTabs() {
  const [selected, setSelected] = useState(0);
  const tabs = ["Overview", "Details", "History"];
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => { const next = event.key === "ArrowRight" ? (selected + 1) % tabs.length : event.key === "ArrowLeft" ? (selected + tabs.length - 1) % tabs.length : selected; if (next !== selected) { event.preventDefault(); setSelected(next); document.getElementById(`tab-${next}`)?.focus(); } };
  return <div><div role="tablist" aria-label="Account information">{tabs.map((tab, index) => <button key={tab} id={`tab-${index}`} role="tab" aria-selected={selected === index} aria-controls={`panel-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={onKeyDown}>{tab}</button>)}</div>{tabs.map((tab, index) => selected === index && <div key={tab} id={`panel-${index}`} role="tabpanel" tabIndex={0} aria-labelledby={`tab-${index}`}>Showing {tab.toLowerCase()} content.</div>)}</div>;
}

export function AccessibleDisclosure() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return <div><button aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>{open ? "Hide" : "Show"} details</button>{open && <div id={panelId} role="region">Keyboard users can toggle this disclosure with Enter or Space.</div>}</div>;
}
