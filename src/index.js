import ReactDOM from 'react-dom'
import { StrictMode } from 'react'
import { RecoilRoot } from 'recoil'
import 'react-confirm-alert/src/react-confirm-alert.css'

import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.scss'

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
