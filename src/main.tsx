import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { legacy_createStore } from 'redux'
import { Appreducer } from './store/AppReducer'

const store = legacy_createStore(Appreducer)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>    
  </StrictMode>,
)