# Application integration

The v3 core deliberately does not ship a single mandatory visual configuration. The current reference setup is `example/install`.

## Structure

```text
example/install/
├─ Window/
│  ├─ Dialog/
│  │  ├─ Alert/
│  │  ├─ Confirm/
│  │  ├─ Prompt/
│  │  ├─ Wrapper.vue
│  │  ├─ config.ts
│  │  └─ facade.ts
│  ├─ Modal/
│  ├─ Fullscreen/
│  ├─ SidebarLeft/
│  ├─ SidebarRight/
│  └─ Notification/
├─ bodyScroll.ts
├─ facadeConfig.ts
├─ index.ts
├─ layerConfig.ts
└─ style.scss
```

`src` contains the generic runtime. `example/install` contains application decisions: presenter composition, wrapper appearance, window sizes, body-scroll DOM behavior, dialog wording and facade names.

## 1. Controllers and layers

`layerConfig.ts` creates the controllers and describes which layer template renders each controller:

```ts
import {
  ModalController,
  ModalLayout,
  NotificationController,
} from 'vue-dlg'
import NotificationLayout from '@example/install/Window/Notification/Layout.vue'

export const modalController = new ModalController()
export const notificationController = new NotificationController({
  maxVisible: 3,
  duration: 5000,
})

export const layerConfig = [
  {
    manager: modalController,
    template: ModalLayout,
    lockBodyScroll: true,
  },
  {
    manager: notificationController,
    template: NotificationLayout,
    lockBodyScroll: false,
  },
]
```

`lockBodyScroll` is layer policy: modal-like windows request a body lock, notifications do not.

## 2. LayerHost and body scroll

Core decides *when* a lock is needed, but does not mutate `document.body` itself. The reference application keeps that code in `example/install/bodyScroll.ts`:

```ts
const bodyScrollClass = 'body-scroll--locked'

export function lockBodyScroll(): void {
  document.body.classList.add(bodyScrollClass)
}

export function unlockBodyScroll(): void {
  document.body.classList.remove(bodyScrollClass)
}
```

Mount `LayerHost` in the application root and pass both callbacks:

```vue
<template>
  <LayerHost
    :layers="layerConfig"
    :on-lock-body-scroll="lockBodyScroll"
    :on-unlock-body-scroll="unlockBodyScroll"
  />
  <router-view />
</template>

<script>
import { LayerHost } from 'vue-dlg'
import { layerConfig } from '@example/install/layerConfig'
import {
  lockBodyScroll,
  unlockBodyScroll,
} from '@example/install/bodyScroll'

export default {
  components: { LayerHost },
  data() {
    return { layerConfig }
  },
  methods: {
    lockBodyScroll,
    unlockBodyScroll,
  },
}
</script>
```

`LayerHost` invokes the callbacks only when the aggregate lock state changes and calls unlock during unmount if that host still owns an active lock state.

## 3. Window configuration

Every modal-like facade ultimately calls:

```ts
modalController.open(component, props, settings)
```

A settings object can replace the rendering pieces:

```text
presenterComp / presenterProps
overlayComp   / overlayProps
wrapComp      / wrapProps
bridgeComp    / bridgeProps
closeOnEsc
closeOnBackdrop
onClose
```

The reference application uses separate presenters/wrappers for centered modal, fullscreen and sidebars. `Alert`, `Confirm` and `Prompt` share the dialog shell.

## 4. Facades

`facadeConfig.ts` builds convenience APIs using the same controller instances:

```ts
export const facadeConfig = {
  Modal: createModalFacade(modalController),
  Dialog: createDialogFacade(modalController),
  Alert: createAlertFacade(modalController),
  Confirm: createConfirmFacade(modalController),
  Prompt: createPromptFacade(modalController),
  Fullscreen: createFullscreenFacade(modalController),
  SidebarLeft: createSidebarLeftFacade(modalController),
  SidebarRight: createSidebarRightFacade(modalController),
  Notification: createNotificationFacade(notificationController),
}
```

The example plugin exposes this object as `$dialog` and through Vue `provide`.

## 5. Result handling

The v3 API does not use Promise results for modal actions. Pass event callbacks as component props/facade options:

```js
this.$dialog.Confirm.delete('Удалить запись?', {
  onPositive(event) {
    // confirmed
  },
  onNegative(event) {
    // cancelled
  },
})
```

`Prompt` returns the entered/selected value through `onSubmit`:

```js
this.$dialog.Prompt.text('Введите имя', {
  onSubmit(event) {
    console.log(event.value)
  },
})
```

The `Modal` returned by `open()` is still live and may be closed imperatively:

```ts
const modal = this.$dialog.Modal.open(Component)
modal.close()
```

## 6. Aliases

Repository code uses:

```text
vue-dlg/*   → src/*
@example/*  → example/*
@app/*      → test/app/*
```

When copying `example/install` into another application, replace `@example/*` with that application's own alias/path while leaving public `vue-dlg` imports unchanged.
