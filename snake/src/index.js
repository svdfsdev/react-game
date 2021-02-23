import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './index.scss';
import App from './App';

// switch - без javascript
// collapsible
// sidenav
// materialboxed
// tooltipped

document.addEventListener('DOMContentLoaded', function () {
  // var fullScreen = document.querySelectorAll('.materialboxed'); //materialboxed
  var dropdown = document.querySelectorAll('.dropdown-trigger');
  // eslint-disable-next-line
  var dropdownInstances = M.Dropdown.init(dropdown, {});
  // var fullScreenInstance = M.Materialbox.init(fullScreen, {});
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
