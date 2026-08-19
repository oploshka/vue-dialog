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
- Core components do not impose application styling.

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

Mount the host once in the application root:

```vue
<template>
  <LayerHost :layers="layers" />
  <router-view />
</template>
```

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

The repository uses explicit aliases instead of deep relative imports:

```text
vue-dlg/*   → src/*
@app/*      → test/app/*
@example/*  → example/*
```

The aliases are defined in `tsconfig.paths.json` and consumed by the Vite configs.

## Development

```bash
pnpm install
pnpm dev
pnpm build
pnpm build:library
```

- `pnpm build` builds the demo application.
- `pnpm build:library` builds the library package.

The project is currently in alpha; build/type cleanup is part of the active v3 stabilization work.

## Documentation

- `doc/readme-plugin-install.md` — current application integration notes.
- `doc/development/history.md` — project history.
- `doc/development/run-and-publication.md` — development/publication notes.
- `doc/development/todo.md` — current development roadmap.

## Development roadmap

The short version:

1. Move body-scroll implementation out of core policy and expose LayerHost lock/unlock callbacks.
2. Stabilize demo and library builds and remove stale v2 runtime files caught by the build.
3. Add controller/lifecycle tests for Modal and Notification behavior.
4. Add focus management and accessibility behavior for modal-like windows.
5. Review the final public facade surface (`Dialog.open`, specialized facades, exported types).
6. Prepare the v3 release documentation and package metadata.

See `doc/development/todo.md` for the maintained roadmap.

## License

⚠️ **STRICT PROPRIETARY LICENSE**

- Commercial use requires written agreement with the Author.
- AI usage strictly prohibited.
- Reverse engineering prohibited.
- See `LICENSE` (English) for full legal terms.
- Russian translation: `LICENSE.ru`.
- In case of conflict, the English version prevails.
