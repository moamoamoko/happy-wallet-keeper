
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Find the root element for mounting the React app
const rootElement = document.getElementById("root");

// Check if the root element exists
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
