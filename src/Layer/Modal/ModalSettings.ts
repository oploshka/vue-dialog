import OverlayDefault from 'vue-dlg/Default/OverlayDefault.vue'
import PresenterDefault from 'vue-dlg/Default/PresenterDefault.vue'
import WrapperDefault from 'vue-dlg/Default/WrapperDefault.vue'
import BridgeDefault from 'vue-dlg/Default/BridgeDefault.vue'
import type { sModalSettings, sResolvedModalSettings } from 'vue-dlg/Type/Type'

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
