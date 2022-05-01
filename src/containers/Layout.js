import React, { useContext, Suspense, useEffect, lazy } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes from '../routes'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from '../containers/Main'
import ThemedSuspense from '../components/ThemedSuspense'
import { SidebarContext } from '../context/SidebarContext'
import { AdvertisementProvider } from '../context/AdvertisementContext'
import { FileProvider } from '../context/FileContext'
import { Toaster } from 'react-hot-toast'
import { ModalProvider } from '../context/ModalContext'

const Page404 = lazy(() => import('../pages/404'))

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  let location = useLocation()

  useEffect(() => {
    closeSidebar()
  }, [location])

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Toaster position='bottom-right' toastOptions={{ className: "dark:bg-gray-700 dark:text-white" }} />
          <ModalProvider>
          <Suspense fallback={<ThemedSuspense />}>
            <FileProvider>
              <AdvertisementProvider>
                <Switch>
                  {routes.map((route, i) => {
                    return route.component ? (
                      <Route
                        key={i}
                        exact={true}
                        path={`/app${route.path}`}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null
                  })}
                  <Redirect exact from="/app" to="/app/dashboard" />
                  <Route component={Page404} />
                </Switch>

              </AdvertisementProvider>
            </FileProvider>
            </Suspense>
          </ModalProvider>
        </Main>
      </div>
    </div>
  )
}

export default Layout
