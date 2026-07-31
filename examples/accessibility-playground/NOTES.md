# Accessible widgets notes

The playground contains hand-built React + TypeScript implementations of a modal, tabs, and disclosure. They use native buttons, explicit ARIA relationships, keyboard handlers, and no component library.

## What the manual version covers

- The modal moves focus into the dialog, traps Tab/Shift+Tab, closes on Escape, and returns focus to its trigger.
- Tabs expose `role=tablist`, `role=tab`, and `role=tabpanel`; Left/Right arrows move selection and focus while inactive tabs leave the tab order.
- The disclosure exposes `aria-expanded` and `aria-controls` and works with Enter/Space through the native button behavior.

## Gaps compared with shadcn/ui

1. shadcn's generated dialog composes a stronger portal/overlay primitive and handles scroll locking and outside-click behavior; this playground keeps the focus logic visible and intentionally small.
2. shadcn's tabs utility manages orientation, disabled tabs, and more complete roving-focus state; this version covers the required horizontal three-tab case only.
3. shadcn also ships consistent focus-ring and design-token styling through its utility classes; this playground leaves styling to the host app so the accessibility behavior stays easy to inspect.
