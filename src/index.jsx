import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppState from './AppState';
import ListStore from './ListStore';
import App from './App';
import ReactiveList from './ReactiveList';

const appState = new AppState();
const liststore = new ListStore();
console.log(liststore);

render(
  <AppContainer>
    {/*<App appState={appState} />*/}
    <ReactiveList liststore={liststore} />
  </AppContainer>,
  document.getElementById('root')
);

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     const NextApp = require('./App').default;

//     render(
//       <AppContainer>
//         <NextApp appState={appState} />
//       </AppContainer>,
//       document.getElementById('root')
//     );
//   });
// }
