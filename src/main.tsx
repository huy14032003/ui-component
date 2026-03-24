import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OverlayProvider } from 'react-aria'
import Test from './Test'
import './styles/index.css'
import { MyToastRegion } from './components/ui/toast/Toast'
import { ThemeProvider } from './lib/theme/ThemeProvider'
import { ThemeSwitcher } from './lib/theme/ThemeSwitcher'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OverlayProvider>
      <ThemeProvider>
        <ThemeSwitcher />
        <MyToastRegion placement="bottom-right" />
        <Test />
      </ThemeProvider>
    </OverlayProvider>
  </StrictMode>,
)
