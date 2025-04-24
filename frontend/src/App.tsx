
import { RouterProvider } from 'react-router'
import './App.css'

import router from './router/router'
import { Provider } from 'react-redux'
import store from './redux/store'
import { CookiesProvider } from 'react-cookie'
function App() {


  return (
    <>
      <CookiesProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </CookiesProvider>
    </>
  )
}

export default App