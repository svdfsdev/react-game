import { RESET_USER, SET_USER } from './actionsTypes';

export function setUser() {
  const userTest = {
    name: 'Vasiliy',
    email: 'svf.fsdev@gmail.com',
    isLogin: true,
  };

  return {
    type: SET_USER,
    payload: userTest,
  };
}

export function resetUser() {
  return {
    type: RESET_USER,
  };
}
