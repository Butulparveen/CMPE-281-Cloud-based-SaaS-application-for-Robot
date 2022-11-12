import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './user.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
});

export default rootReducer;