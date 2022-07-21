import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { UserProvider } from './context/UserContext'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <UserProvider>
            <Route path="/app" component={Layout} />
          </UserProvider>
        </Switch>
      </Router>
      <Toaster position='top-center' toastOptions={{ className: "dark:bg-gray-700 dark:text-white" }} />
    </>
  )
}

export default App
