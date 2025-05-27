
import { RouterProvider } from 'react-router'
import './App.css'

import router from './router/router'
import { Provider } from 'react-redux'
import store from './redux/store'
import { CookiesProvider } from 'react-cookie'
import { LoadScript } from '@react-google-maps/api'
const KEY_API = 'AIzaSyBxB7-a9FdZheIkxwUyIuUG4z1aMRr6tEE';

function App() {
  return (
    <>
      <CookiesProvider>
        <Provider store={store}>
             <LoadScript googleMapsApiKey={KEY_API}>
          <RouterProvider router={router} />
          </LoadScript>
        </Provider>
      </CookiesProvider>
    </>
  )
}

export default App