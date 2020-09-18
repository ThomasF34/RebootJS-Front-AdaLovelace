import { combineReducers } from "redux";
import { profile } from './profile/reducer';

export const appReducer = combineReducers({
  profile
});

export type IAppState = ReturnType<typeof appReducer>;