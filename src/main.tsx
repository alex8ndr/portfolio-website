import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AppProvider } from './contexts/AppContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find root element');
}

createRoot(rootElement).render(
  <ThemeProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </ThemeProvider>
);
