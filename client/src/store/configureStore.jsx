import * as redux from 'redux';
import thunk from 'redux-thunk';

import signUpReducer from '../containers/SignUp/SignUpReducer';
import loginReducer from '../containers/Login/LoginReducer';

export var configure = () => { //eslint-disable-line
  const reducer = redux.combineReducers({
    register: signUpReducer,
    login: loginReducer,
  });

  const store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
