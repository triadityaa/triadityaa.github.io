import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import './styles/global.css'

// Always start at the top so the intro and hero reveal play from the beginning.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

// NOTE: StrictMode is intentionally omitted. Its dev-only double-mount reverts
// and re-runs GSAP intro timelines, which breaks one-shot animations like the
// preloader. Production builds never double-invoke, so this keeps dev === prod.
ReactDOM.createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
)
