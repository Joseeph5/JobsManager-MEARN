import { useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from '../../store/actions';
import { addUserToLocalStorage } from '../../utils/shared';

function Profile() {
  const { user, showAlert, isLoading, token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const updaterUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await axios.patch('/api/v1/auth/updateUser', currentUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { user, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });

      addUserToLocalStorage({ user, location, token });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ALERT,
        });
      }, 2000);
      console.log(data);
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.error.msg },
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ALERT,
        });
      }, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      console.log('failed');
      dispatch({ type: DISPLAY_ALERT });
      setTimeout(() => {
        dispatch({ type: CLEAR_ALERT });
      }, 2000);
      return;
    }
    const currentUser = { name, email, lastName, location };
    console.log(currentUser);
    updaterUser(currentUser);
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText='last name'
            type='text'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default Profile;
