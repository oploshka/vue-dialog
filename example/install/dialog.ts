import { facadeConfig } from './facadeConfig'
import { store } from './store'

export const dialog = Object.fromEntries(
  Object.entries(facadeConfig).map(([name, createFacade]) => [
    name,
    createFacade(store.modal),
  ]),
)
