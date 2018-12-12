export interface MinimalPropRequirement {
  container: string | Element | null
  name: string
  debug?: boolean
}

export interface BaseUiState {
  uiActive: boolean
}

export interface GlobalBaseUiState {
  UiActiveState: BaseUiState
}