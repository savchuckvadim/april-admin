import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import reportWebVitals from './reportWebVitals'
import store from './modules/redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
import AppContainer from './App-Container.tsx'
// import {firebase} from 'firebase'
import { firestore } from './modules/services/firebase-api/firebase-api'




export const Context = createContext()

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{
      // firebase,
      firestore,
      // auth
    }}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>

          <AppContainer />

        </Provider>
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById("root"))


// const root = ReactDOM.createRoot(document.getElementById("root"))


// const startApp = (store) => {
//   root.render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </Provider>

//     </React.StrictMode>
//   )
// }

window.store = store
// let state = store.getState()
// startApp(store)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
