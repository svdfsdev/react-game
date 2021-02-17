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
// select

document.addEventListener('DOMContentLoaded', function () {
  var select = document.querySelectorAll('select');
  var selectInstances = M.FormSelect.init(select, {});

  var dropdown = document.querySelectorAll('.dropdown-trigger');
  var dropdownInstances = M.Dropdown.init(dropdown, {});
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
