import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Reducer, AnyAction, Store, createStore, Dispatch } from 'redux'
import { connect, Provider } from 'react-redux'

import { MinimalPropRequirement, BaseView, BaseUiState, GlobalBaseUiState } from './'

const initalBaseUiState: BaseUiState = {
  uiActive: false
}

export class BaseControl extends BaseView {
  componentClass: React.ComponentClass<MinimalPropRequirement, any> = BaseControl
  defaultReducerNames: string[] = ['UiActiveState']
  callbacks: { callback: Function; args: object }[] = []

  constructor(props: MinimalPropRequirement) {
    super(props)
    this.reducers['UiActiveState'] = this.uiActiveReducer
  }

  addCallback(callback: Function, args: object) {
    this.callbacks = [...this.callbacks, { callback: callback, args: args }]
  }

  uiActiveReducer(state: BaseUiState = initalBaseUiState, action: AnyAction): BaseUiState {
    switch (action.type) {
      case 'ACTIVATE_UI':
        return { ...state, uiActive: true }
      case 'DEACTIVATE_UI':
        return { ...state, uiActive: false }
      default:
        return state
    }
  }

  addDispatcher(name: string, callback: Function, args?: object) {
    this.dispatchers = { ...this.dispatchers, [name]: callback }
  }

  getMapDispatchToProps(dispatchers: { [callbackName: string]: Function }) {
    return (dispatch: Dispatch): { [callbackName: string]: Dispatch } => {
      let dispatchObj: { [callbackName: string]: Dispatch } = {}
      for (let callbackName in dispatchers) {
        let callback: Function = dispatchers[callbackName]
        dispatchObj[callbackName] = args => dispatch(callback(args))
      }
      return dispatchObj
    }
  }

  getMapStateToProps(state: GlobalBaseUiState): object {
    return { uiActive: state.UiActiveState.uiActive }
  }
}