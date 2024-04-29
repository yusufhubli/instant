import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider defaultSetOptions={{path:'/'}}>
      <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
)
