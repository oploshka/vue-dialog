# App.vue

```
<template>
  <RouterView />
  <OverlayHost :layers="layerConfig" />
</template>

<script setup>
import OverlayHost from './overlays/OverlayHost.vue'
import { layerConfig } from './overlays/overlays'
</script>
```

# Пример использования

```ts
import { overlays } from './overlays/overlays'
import MyModal from './components/MyModal.vue'

// Модальное окно
overlays.modal.open(MyModal, { title: 'Настройки' }, 'modal', 'medium')

// Диалог подтверждения
overlays.modal.open(ConfirmDialog, { message: 'Удалить?' }, 'dialog', 'alert', {
  closeOnEsc: false,
  closeOnBackdrop: false,
})

// Сайдбар (singleton)
overlays.modal.open(SidebarMenu, {}, 'sidebar-left', undefined, { singleton: true })

// Уведомление
overlays.notify.show('Файл сохранён', 'success', 3000)

// Уведомление с действием
overlays.notify.show('Файл удалён', 'warning', 0, {
  label: 'Отменить',
  callback: () => { /* ... */ }
})
```