import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from '../actions';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
  showAlert: false,
};

function Register() {
  const [state, setState] = useState(initialState);
  const { isLoading, showAlert } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });

    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      console.log(response);
      const { user, token } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      });
      addUserToLocalStorage({
        user,
        token,
      });

      setTimeout(() => {
        navigate('/dashboard');
        dispatch({
          type: CLEAR_ALERT,
        });
      }, 2000);
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.error.msg },
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ALERT,
        });
      }, 2000);
    }
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });

    try {
      const response = await axios.post('/api/v1/auth/login', currentUser);
      console.log(response.data);
      const { user, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      });
      addUserToLocalStorage({
        user,
        token,
      });

      setTimeout(() => {
        navigate('/dashboard');
        dispatch({
          type: CLEAR_ALERT,
        });
      }, 2000);
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.error.msg },
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ALERT,
        });
      }, 2000);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = state;
    if (!email || !password || (!isMember && !name)) {
      dispatch({ type: DISPLAY_ALERT });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ALERT,
        });
      }, 2000);
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
      console.log();
    } else {
      registerUser(currentUser);
    }
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setState({ ...state, isMember: !state.isMember });
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{state.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!state.isMember && (
          <FormRow
            type='text'
            name='name'
            value={state.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type='email'
          name='email'
          value={state.email}
          handleChange={handleChange}
        />

        {/* password input */}
        <FormRow
          type='password'
          name='password'
          value={state.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          submit
        </button>

        <p>
          {state.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {state.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
