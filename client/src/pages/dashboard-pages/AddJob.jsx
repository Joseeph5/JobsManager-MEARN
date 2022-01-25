import { FormRow, Alert, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ALERT, DISPLAY_ALERT, HANDLE_CHANGE } from '../../store/actions';
import { jobTypeOptions, statusOptions } from '../../utils/options';

function AddJob() {
  const { isEditing, showAlert, position, company, jobLocation, jobType, status } =
    useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      dispatch({ type: DISPLAY_ALERT });
      setTimeout(() => {
        dispatch({ type: CLEAR_ALERT });
      }, 2000);
      return;
    }
    console.log('create job');
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
