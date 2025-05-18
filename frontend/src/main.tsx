import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./locales/init.ts";
import { I18nextProvider } from "react-i18next";
import i18n from './locales/init.ts';
createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18n}>
  <StrictMode>
    <App />
  </StrictMode>
  </I18nextProvider>
)
