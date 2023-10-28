import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AdminApp from './modules/components/Admin-App/AdminApp'
import LoginRedirect from './modules/components/Login-Page/Login-Redirect'
import { LightLoadingPageContainer } from './modules/components/Elements/Loading/Light-Loading-Page-Container'
import { useContext, useEffect } from 'react'
import { Context } from '.'
import ClientTemplateContainer from './modules/components/Main/ClientTemplate/ClientTemplateContainer'


type AppPropsType = {
  isAuth: boolean
  initialized: boolean
  preloader: boolean
}


const App: React.FC<AppPropsType> = (props) => {

  const { auth } = useContext(Context)
  const login = () => {

  }

  return (
    <div className="App">
      {!props.preloader

        ? <Routes>
          <Route path="/*" element={<AdminApp />} />
          <Route path="login" element={<LoginRedirect />} />
        </Routes>

        : <div className='preloader__wrapper'><LightLoadingPageContainer /></div>
      }
      {/* <ClientTemplateContainer /> */}
    </div>

  )
}

export default App
