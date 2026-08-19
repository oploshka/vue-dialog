# Vue Dialog

Vue 3 library for programmatic modal layers. The library core manages layer state and lifecycle; presentation, styles and application-specific facades stay outside the core.

Current repository version: **3.0.0-alpha.3**.

> The `develop` branch contains the current v3 rewrite. The old v2 documentation and examples are kept only as historical material.

## Main ideas

- User content remains a normal Vue component.
- `ModalController.open()` returns a live `Modal` handle with `close()` and optional component-ref access.
- Modal interaction results are delivered through props/callbacks instead of Promise-based APIs.
- Presentation is split into `Presenter`, `Position`, `Wrapper` and `Bridge` responsibilities.
- `NotificationController` has its own queue, duration and pause/resume lifecycle.
- Application-specific facades (`Alert`, `Confirm`, `Prompt`, sidebars, fullscreen, notifications) are built on top of the core controllers.
- `LayerHost` decides when a layer requires body-scroll locking, while the application supplies lock/unlock callbacks.
- Core components do not impose application styling or direct `document.body` mutations.

## Architecture

```text
LayerHost
└─ Teleport → body
   ├─ ModalLayout
   │  └─ Presenter
   │     ├─ Overlay
   │     └─ Position
   │        └─ Wrapper
   │           └─ Bridge
   │              └─ User component
   └─ NotificationLayout
      └─ Notification items
```

The core package exports the controllers, default presenter parts, mixins and `LayerHost`. A complete application setup is available in `example/install`.

## Installation

```bash
pnpm add vue-dlg
# or
npm install vue-dlg
```

For the current alpha architecture, use `example/install` as the reference application configuration. It intentionally lives outside `src`: window appearance and convenience facades are application policy, not core policy.

## Minimal core usage

```ts
import {
  LayerHost,
  ModalController,
  ModalLayout,
  NotificationController,
} from 'vue-dlg'

const modalController = new ModalController()
const notificationController = new NotificationController({
  maxVisible: 3,
  duration: 5000,
})

export const layers = [
  {
    manager: modalController,
    template: ModalLayout,
    lockBodyScroll: true,
  },
]
```

Mount the host once in the application root and provide the body-scroll implementation explicitly:

```vue
<template>
  <LayerHost
    :layers="layers"
    :on-lock-body-scroll="lockBodyScroll"
    :on-unlock-body-scroll="unlockBodyScroll"
  />
  <router-view />
</template>

<script>
import { LayerHost } from 'vue-dlg'

export default {
  components: { LayerHost },

  methods: {
    lockBodyScroll() {
      document.body.classList.add('body-scroll--locked')
    },
    unlockBodyScroll() {
      document.body.classList.remove('body-scroll--locked')
    },
  },
}
</script>
```

`LayerHost` calls lock only on the transition from no lock-enabled items to at least one such item, calls unlock when the last one disappears, and releases its active lock on unmount.

Open an arbitrary component:

```ts
const modal = modalController.open(UserComponent, {
  title: 'Example',
  onSave(payload) {
    console.log(payload)
    modal.close()
  },
})
```

The returned `Modal` is a live handle:

```ts
modal.close()
modal.getComponentRef()
```

## Application facade example

`example/install` builds convenience APIs on the same controllers:

```js
this.$dialog.Alert.success('Запись добавлена')
this.$dialog.Alert.warning('Сервис временно недоступен')
this.$dialog.Alert.error('Ошибка сервера')

this.$dialog.Confirm.add('Добавить запись?', {
  onPositive(event) {},
  onNegative(event) {},
})

this.$dialog.Confirm.delete('Удалить запись?')

this.$dialog.Prompt.text('Как к Вам обратиться?', {
  onSubmit(event) {
    console.log(event.value)
  },
})

this.$dialog.Prompt.choice([
  { id: 1, name: 'Первый вариант' },
  { id: 2, name: 'Второй вариант' },
], {
  onSubmit(event) {
    console.log(event.value)
  },
})

this.$dialog.Notification.success('Успешно', 'Запись добавлена')
```

Window facades are also provided by the example configuration:

```js
this.$dialog.Modal.open(Component, props, options)
this.$dialog.Fullscreen.open(Component, props, options)
this.$dialog.SidebarLeft.open(Component, props, options)
this.$dialog.SidebarRight.open(Component, props, options)
```

`Alert`, `Confirm`, `Prompt`, `Modal`, `Fullscreen` and both sidebars use the same `ModalController`, so stacking and z-index ordering are shared naturally.

## Notification behavior

`NotificationController` supports:

- `maxVisible` visible items;
- FIFO queue for overflow;
- default controller duration;
- per-notification duration override;
- pause/resume of an individual notification timer;
- live `Notification.close()` handle.

A duration of `0` disables automatic closing.

## Project aliases

The repository separates internal source imports from the public package entry:

```text
@/*          → src/*
@app/*       → test/app/*
@example/*   → example/*
vue-dlg      → src/install.ts
```

Code inside `src` uses `@/*`. Application/example code imports the library through `vue-dlg`, so it exercises the same public exports as a package consumer. There is intentionally no `vue-dlg/*` source alias: internal folders are not public package subpaths.

The aliases are defined in `tsconfig.paths.json` and consumed by the Vite configs.

## Development

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
pnpm build:library
```

- `pnpm typecheck` runs strict Vue/TypeScript validation for `src`, `example`, `test` and the Vite configs.
- `pnpm build` builds the demo application.
- `pnpm build:library` builds the ESM library entry as `lib/index.js` from `src/install.ts`.

The current stabilization baseline is a clean typecheck, demo build, library build and package dry-run. Automated controller/lifecycle tests are the next validation layer.

## Documentation

- `doc/readme-plugin-install.md` — current application integration notes.
- `doc/development/history.md` — project history.
- `doc/development/run-and-publication.md` — development/publication notes.
- `doc/development/todo.md` — current development roadmap.

## Development roadmap

The short version:

1. Add controller/lifecycle tests for Modal, Notification and LayerHost behavior.
2. Add focus management and accessibility behavior for modal-like windows.
3. Review the final public facade surface (`Dialog.open`, specialized facades, exported types).
4. Prepare the v3 release documentation and package metadata.

See `doc/development/todo.md` for the maintained roadmap.

## License

⚠️ **STRICT PROPRIETARY LICENSE**

- Commercial use requires written agreement with the Author.
- AI usage strictly prohibited.
- Reverse engineering prohibited.
- See `LICENSE` (English) for full legal terms.
- Russian translation: `LICENSE.ru`.
- In case of conflict, the English version prevails.
