import { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: false,
};

function Register() {
  const [state, setState] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const handleChange = (e) => {
    console.log(e.target);
  };

  const toggleMember = () => {
    setState({ ...state, isMember: !state.isMember });
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{state.isMember ? 'Login' : 'Register'}</h3>
        {state.showAlert && <Alert />}
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
