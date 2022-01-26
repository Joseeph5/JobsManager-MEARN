import { FormRow, Alert, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLEAR_ALERT,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  DISPLAY_ALERT,
  HANDLE_CHANGE,
  LOGOUT_USER,
} from '../../store/actions';
import { jobTypeOptions, statusOptions } from '../../utils/options';
import useShared from '../../utils/shared';

function AddJob() {
  const { isEditing, showAlert, position, company, jobLocation, jobType, status } =
    useSelector((state) => state);
  const dispatch = useDispatch();
  const { authService, removeUserFromLocalStorage } = useShared();

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { data } = await authService.post('/jobs', {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      console.log('data', data);
      dispatch({
        type: CREATE_JOB_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ALERT,
        });
      }, 2000);
    } catch (error) {
      if (error.response.status === 401) {
        logoutUser();
      } else {
        dispatch({
          type: CREATE_JOB_ERROR,
          payload: { msg: error.response.data.msg },
        });
        setTimeout(() => {
          dispatch({
            type: CLEAR_ALERT,
          });
        }, 2000);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      dispatch({ type: DISPLAY_ALERT });
      setTimeout(() => {
        dispatch({ type: CLEAR_ALERT });
      }, 2000);
      return;
    }
    if (isEditing) {
      console.log('isEditing');
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'} </h3>
        {showAlert && <Alert />}

        {/* position */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job type */}
          <FormRowSelect
            labelText='type'
            name='jobType'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* job status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* submit button */}
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}>
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddJob;
