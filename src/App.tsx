import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ru from 'date-fns/locale/ru';
import Wrapper from './layouts/Wrapper/Wrapper';
import PrivateRoutesList from './components/Router/PrivateRoutesList';
import PublicRoutesList from './components/Router/PublicRoutesList';

function App() {
  const isAuth = true; // TODO: в перспективе - из стора. А лучше сразу юзера - если его нет, значит неавторизован. Заодно сразу роль достанешь и прокинешь в приват-роутер-лист

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ru}
    >
      <Wrapper>{isAuth ? <PrivateRoutesList /> : <PublicRoutesList />}</Wrapper>
    </LocalizationProvider>

    // <div className="app">
    //   <header className="app-header">
    //     <img
    //       src={logo}
    //       className="app-logo"
    //       alt="logo"
    //     />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="app-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
