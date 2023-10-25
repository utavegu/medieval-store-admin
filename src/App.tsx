// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ru from 'date-fns/locale/ru';
import { useAppSelector } from './hooks/redux';
import { useCheckauthQuery } from './api/auth-api';
import { authorizedUserSelector } from './store/selectors/authSelectors';
import Wrapper from './layouts/Wrapper/Wrapper';
import PrivateRoutesList from './components/Router/PrivateRoutesList';
import PublicRoutesList from './components/Router/PublicRoutesList';

function App() {
  useCheckauthQuery(undefined, { pollingInterval: 60000 }); // время жизни access token
  const user = useAppSelector(authorizedUserSelector);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ru}
    >
      <Wrapper>
        {/* TODO: Хотя, пожалуй, лучше будет прямо тут проверять, что роль не клиент, и если клиент, то в паблик роутесах показывать всплывашку с предупреждением. Та же история с активацией. */}
        {user ? (
          <PrivateRoutesList
            role={user.role}
            isActivatedProfile={user.isActivated}
          />
        ) : (
          <PublicRoutesList />
        )}
      </Wrapper>
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
