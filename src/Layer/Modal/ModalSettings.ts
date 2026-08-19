import OverlayDefault from '../../Default/OverlayDefault.vue'
import PresenterDefault from '../../Default/PresenterDefault.vue'
import WrapperDefault from '../../Default/WrapperDefault.vue'
import BridgeDefault from '../../Default/BridgeDefault.vue'
import type { sModalSettings, sResolvedModalSettings } from '../../Type/Type'

export function resolveModalSettings(
  settings: sModalSettings = {},
): sResolvedModalSettings {
  return {
    presenterComp: settings.presenterComp ?? PresenterDefault,
    presenterProps: settings.presenterProps ?? {},

    overlayComp: settings.overlayComp ?? OverlayDefault,
    overlayProps: settings.overlayProps ?? {},

    wrapComp: settings.wrapComp ?? WrapperDefault,
    wrapProps: settings.wrapProps ?? {},

    bridgeComp: settings.bridgeComp ?? BridgeDefault,
    bridgeProps: settings.bridgeProps ?? {},

    closeOnEsc: settings.closeOnEsc ?? true,
    closeOnBackdrop: settings.closeOnBackdrop ?? true,
    onClose: settings.onClose,
  }
}
