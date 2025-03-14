
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Find the root element for mounting the React app
const rootElement = document.getElementById("root");

// Check if the root element exists
if (rootElement) {
  try {
    createRoot(rootElement).render(<App />);
    console.log("App successfully rendered");
  } catch (error) {
    console.error("Failed to render the application:", error);
  }
} else {
  console.error("Root element not found");
}
