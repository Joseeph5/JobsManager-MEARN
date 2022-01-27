import { Link } from 'react-router-dom';
import main from '../assets/images/secure_login.svg';
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/LandingPage';

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Simple online job tracking software for tracking hours spent on tasks. Track
            what you and your team are working, check project progress, and calculate
            billable hours.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
}

export default Landing;
