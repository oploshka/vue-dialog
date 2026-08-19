# Vue Dialog v3 roadmap

## Completed in the current rewrite

- Vue 3 modal runtime based on `ModalController` and live `Modal` handles.
- LayerHost + Teleport rendering.
- Presenter / Position / Wrapper / Bridge composition.
- Modal stacking, z-index ordering, ESC and backdrop policies.
- Notification controller with `maxVisible`, FIFO queue, duration overrides and per-item pause/resume.
- Application facades for Alert, Confirm, Prompt and Notification.
- Application window facades for Modal, Fullscreen, SidebarLeft and SidebarRight.
- Shared dialog shell and application presenters/wrappers.
- Window/notification animations and interactive showcase examples.
- Repository aliases:
  - `@/*` for `src/*`;
  - `@example/*` for `example/*`;
  - `@app/*` for `test/app/*`;
  - `vue-dlg` for the public `src/install.ts` package entry.
- v3 README and application integration documentation.
- LayerHost body-scroll lifecycle delegated through `onLockBodyScroll` / `onUnlockBodyScroll` callbacks, including unlock on host unmount.
- Strict `npm run typecheck` covering `src`, `example`, `test` and Vite configs.
- TypeScript 6.x pinned while the current `vue-tsc` integration is incompatible with TypeScript 7.
- Obsolete `src/Layers.ts` / old `Layer/Notify/*` bootstrap removed.
- Demo build, library build and `npm pack --dry-run` verified together with typecheck.

## Next

### 1. Automated tests

Cover controller behavior first.

`ModalController`:

- open/close;
- top item;
- stacking and z-index;
- closeAll;
- ESC policy;
- onClose lifecycle.

`NotificationController`:

- maxVisible;
- FIFO promotion;
- default/per-item duration;
- pause/resume remaining time;
- closing queued notifications;
- closeAll.

`LayerHost`:

- aggregate lock state;
- lock/unlock callback transitions;
- unlock on unmount;
- ESC delegation by layer z-index.

### 2. Focus and accessibility

Deferred until the runtime/build are stable.

- move focus into modal-like windows;
- focus trap;
- restore previous focus on close;
- review dialog semantics/ARIA labels;
- reduced-motion behavior already exists in the example animations.

### 3. Public API review

Before v3 release decide/finalize:

- whether generic `Dialog.open` remains public;
- recommended facade names and casing;
- exported public types;
- component-ref escape hatch documentation;
- which parts of `example/install` remain examples versus become package helpers.

### 4. Release preparation

- final package output/metadata check;
- remove or archive remaining obsolete v2 material;
- update publication notes;
- verify GitHub Pages demo;
- prepare v3 changelog/migration notes.

## Not planned as core behavior

- Promise-based dialog results;
- mandatory application themes/styles;
- width/height preset systems in core;
- application-specific Alert/Confirm/Prompt wording in core;
- direct body-scroll DOM mutations inside core.
