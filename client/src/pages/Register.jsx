import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { CLEAR_ALERT, DISPLAY_ALERT } from '../actions';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: false,
};

function Register() {
  const [state, setState] = useState(initialState);
  const { isLoading, showAlert } = useSelector((state) => state);
  const dispatch = useDispatch();

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
        {/*
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>

          <input type='text' name='name' onChange={handleChange} className='form-input' />
        </div>

        <button type='submit' className='btn btn-block'>
          submit
        </button>
       */}
      </form>
    </Wrapper>
  );
}

export default Register;
