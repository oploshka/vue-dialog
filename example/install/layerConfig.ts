import type { Component } from 'vue'

export type tLayerConfig = {
  modal?: {
    zIndex?: number | null
    layout?: Component | null
  } | null
}

export const layerConfig: tLayerConfig = {
  modal: {
    zIndex: null,
    layout: null,
  },
}
