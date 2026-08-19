# Modal

`Modal` is the ordinary centered application-level window preset over the core `ModalController`.

```text
Presenter
├─ Overlay (resolved by core)
└─ Position
   └─ Wrapper (resolved by core)
      └─ Bridge (resolved by core)
         └─ UserComponent
```

`Presenter.vue` defines the composition and `Position.vue` centers the window. Overlay, Wrapper and Bridge still use core defaults until Modal needs its own visual shell or bridge behavior.

Focus trapping belongs to the concrete Presenter when it is introduced. Teleport stays in `LayerHost`.
