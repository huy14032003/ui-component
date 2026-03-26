import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Test from './Test'
import './styles/index.css'
import { Theme , ThemePanel} from "@radix-ui/themes";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Theme >
      {/* <ThemePanel /> */}
      <Test />
    </Theme>
  </StrictMode>,
)
