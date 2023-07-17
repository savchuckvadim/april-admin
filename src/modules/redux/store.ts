import { Action, applyMiddleware, combineReducers, createStore } from "redux"
import { ThunkAction } from '@reduxjs/toolkit'
import ThunkMiddleware from 'redux-thunk'
// @ts-ignore
// import dialogsReducer from "./reducers/dialogs/dialogs-reducer"
// import newMessageReducer from "./reducers/dialogs/new-message-reducer"
// import profileReducer from "./reducers/profile/profile-reducer"
import navMenuReducer from "./reducers/nav-menu/nav-menu-reducer"
// import usersReducer from "./reducers/users/users-reducer"
import authReducer from "./reducers/auth/auth-reducer"
import { reducer as formReducer } from 'redux-form'
import LoginRegistrationReducer from "./reducers/login-registaration/login-registration-reducer"
import appReducer from "./reducers/app-reducer"
import preloader from "./reducers/preloader/preloader-reducer"
import paginatorReducer from "./reducers/paginator/paginator-reducer"
import notifications from "./reducers/notifications/notifications-reducer"
import field from "./reducers/field/field-reducer"
import client from "./reducers/client/client-reducer"
import product from "./reducers/product/product-reducer"
import complect from "./reducers/complect/complect-reducer"
import supply from "./reducers/supply/supply-reducer"
import region from "./reducers/region/region-reducer"
import contract from "./reducers/contract/contract-reducer"
import consalting from "./reducers/consalting/consalting-reducer"
import legalTech from "./reducers/legal-tech/legal-tech-reducer"
import price from "./reducers/price/price-reducer"
import settings from "./reducers/settings/settings"


// import { LoginRegistrationType } from "./reducers/login-registaration/login-registration-reducer"
// import { NavMenuStateType } from "./reducers/nav-menu/nav-menu-reducer"
// import { PaginatorStateType } from "./reducers/paginator/paginator-reducer"
// import { PreloaderStateType } from "./reducers/preloader/preloader-reducer"
// import { ProfileStateType } from "./reducers/profile/profile-reducer"
// import { UsersStateType } from "./reducers/users/users-reducer"


let rootReducer = combineReducers({
  app: appReducer,
  // as () => AppStateType,
  auth: authReducer,
  //  as () => AuthStateType,
  loginRegistration: LoginRegistrationReducer,
  //  as () => LoginRegistrationType,
  
  navMenu: navMenuReducer,
  // as () => NavMenuStateType,
  
  preloader: preloader,
  //  as () => PreloaderStateType,
  paginator: paginatorReducer,
  //  as () => PaginatorStateType,
  
  notifications,


  field,
  client,
  complect,
  product,
  supply,
  region,
  contract,
  consalting,
  legalTech,
  price,
  settings,

  form: formReducer
})

export type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>
export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

// const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(

//   applyMiddleware(ThunkMiddleware)
// ))

let store = createStore(rootReducer, applyMiddleware(ThunkMiddleware))
export default store