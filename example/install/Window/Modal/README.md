# Modal

`Modal` is an application-level `Window` preset built on top of the core `ModalController`.

For now the preset only needs `config.ts`. Core components are used by default while the config does not override them.

Planned decomposition when `Modal` needs its own implementation:

```text
Presenter
├─ FocusTrap
├─ OverlayDefault
└─ Position
   └─ WrapperDefault
      └─ BridgeDefault
         └─ UserComponent
```

Responsibilities:

- `Presenter` composes one modal window and owns the focus trap.
- `Position` owns only placement and geometry.
- `Wrapper` is the visual shell; scrolling can live here when the preset needs it, or inside the user component.
- `Bridge` renders the user component and binds its component ref.
- `Overlay`, `Wrapper` and `Bridge` stay on core defaults until this preset actually needs different behavior.

`Teleport` is not part of this preset. It belongs to `LayerHost`, which mounts the whole layer system.
