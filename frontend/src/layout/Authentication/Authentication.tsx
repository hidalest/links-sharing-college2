import { AuthenticationPageProps } from '../../interfaces';

import Login from './components/Login/Login';

import styles from './Authentication.module.scss';
import Signup from './components/Signup/Signup';
import { useAppSelector } from '../../hooks/hooks';

const Authentication = (props: AuthenticationPageProps) => {
  const viewState = useAppSelector(
    (state) => state.app.currentAuthenticationView
  );
  const { className, mainLogoDesktop, authenticationPhaseProps } = props;
  const { loginPhase, signupPhase } = authenticationPhaseProps;
  return (
    <section className={`${className} ${styles.authenticationContainer}`}>
      <img src={mainLogoDesktop} alt='dev links logo' />

      {viewState === 'login' && (
        <Login loginPhase={loginPhase} className={''} />
      )}
      {viewState === 'signup' && (
        <Signup signupPhase={signupPhase} className={''} />
      )}
    </section>
  );
};

export default Authentication;
