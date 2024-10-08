import ReactDOM from 'react-dom/client';
import 'bootswatch/dist/united/bootstrap.min.css';
import App from './App';
import './../index.css';
import { BloglistContextProvider } from './context/BloglistContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BloglistContextProvider>
    <App />
  </BloglistContextProvider>
);
