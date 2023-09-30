import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ru from 'date-fns/locale/ru';
// import DateChooser from './components/DateChooser';
import ImageUploader from './components/ImageUploader';
import UsersList from './components/UsersList';

function App() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ru}
    >
      {/* <DateChooser /> */}
      <ImageUploader view="both" />
      {/* <UsersList /> */}
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
