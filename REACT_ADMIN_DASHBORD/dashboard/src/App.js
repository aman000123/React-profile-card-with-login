
import './App.css';
import AppRouters from './AppRoutes';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <div className="App">
        <AppRouters />
      </div>
      <ToastContainer position="top-right" />

    </>
  );
}

export default App;
