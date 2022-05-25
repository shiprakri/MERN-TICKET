import { AUTH } from '../action/ticket-action';
import * as api from '../service/api';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
  
    dispatch({ type: AUTH, data });

    navigate('/ticket');
  } catch (error) {
 
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);

    navigate('/login');
  } catch (error) {

  }
};
