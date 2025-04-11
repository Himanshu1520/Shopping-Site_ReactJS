
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './AppRoutes'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
createRoot(document.getElementById("root")).render(<AppRoutes />);
