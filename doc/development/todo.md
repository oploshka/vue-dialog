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
  - `vue-dlg/*` for `src/*`;
  - `@example/*` for `example/*`;
  - `@app/*` for `test/app/*`.
- v3 README and application integration documentation.

## Next

### 1. LayerHost lifecycle / body scroll

Move the concrete body-scroll DOM implementation out of core.

Target API:

```vue
<LayerHost
  :layers="layers"
  :on-lock-body-scroll="lockBodyScroll"
  :on-unlock-body-scroll="unlockBodyScroll"
/>
```

LayerHost remains responsible for deciding *when* a configured layer requires scroll locking. The application decides *how* body scroll is locked/unlocked.

Requirements:

- lock callback fires when the first lock-enabled layer becomes non-empty;
- unlock callback fires when no lock-enabled layers contain items;
- unmount must release a lock owned by that host;
- avoid embedding application-specific CSS/body mutations in core.

### 2. Build stabilization

Run and fix:

```bash
pnpm build
pnpm build:library
```

Expected cleanup areas:

- stale v2/dead runtime files still included by TypeScript config;
- unresolved legacy imports;
- TypeScript strict/no-unused errors;
- package output metadata and library entry verification.

Do not hide build failures by weakening TypeScript settings without a concrete reason.

### 3. Automated tests

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

### 4. Focus and accessibility

Deferred until the runtime/build are stable.

- move focus into modal-like windows;
- focus trap;
- restore previous focus on close;
- review dialog semantics/ARIA labels;
- reduced-motion behavior already exists in the example animations.

### 5. Public API review

Before v3 release decide/finalize:

- whether generic `Dialog.open` remains public;
- recommended facade names and casing;
- exported public types;
- component-ref escape hatch documentation;
- which parts of `example/install` remain examples versus become package helpers.

### 6. Release preparation

- final package build/output check;
- remove or archive obsolete v2 runtime files;
- update publication notes;
- verify GitHub Pages demo;
- prepare v3 changelog/migration notes.

## Not planned as core behavior

- Promise-based dialog results;
- mandatory application themes/styles;
- width/height preset systems in core;
- application-specific Alert/Confirm/Prompt wording in core.
