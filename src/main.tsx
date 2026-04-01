import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Test from './Test'
import './styles/index.css'
import { Toaster } from './components/ui/toast/Toaster'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Test />
      <Toaster position="top-center" expand={true} richColors />
  </StrictMode>,
)
