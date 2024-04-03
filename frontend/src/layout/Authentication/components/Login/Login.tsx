import { FindUserInterface, LoginProps } from '../../../../interfaces';
import Card from '../../../../components/UI/Card/Card';
import InputText from '../../../../components/UI/InputText/InputText';
import { emailRegex, passwordRegex } from '../../../../utils/regex';
import Button from '../../../../components/UI/Button/Button';

import styles from './Login.module.scss';
import { useAppDispatch } from '../../../../hooks/hooks';
import {
  appActions,
  linkActions,
  userProfileActions,
} from '../../../../store/store';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/apiConfig';
import { useNavigate } from 'react-router-dom';

function Login(props: LoginProps) {
  const { className, loginPhase } = props;
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();
  const {
    emailIcon,
    emailLabel,
    emailPlaceholder,
    loginButton,
    loginHeader,
    loginInstructions,
    passwordIcon,
    passwordLabel,
    passwordPlaceholder,
    registerBtn,
    registerInstructionsBtn,
  } = loginPhase;

  const dispatch = useAppDispatch();
  const getEmailInputInfo = (isValid: boolean, inputValue: string) => {
    setUserEmail(inputValue);
  };
  const getPasswordInput = (isValid: boolean, inputValue: string) => {
    setUserPassword(inputValue);
  };

  const onChangeViewToSignup = () =>
    dispatch(appActions.changeAuthenticationView());

  const onSubmitLoginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await axios.get(SERVER_URL).then((res) => res.data.data);

    /**
     * Type will be:
     * email: string
     * password: string
     * links: [{
     *
     * }]
     */
    const findUser = data.find(
      (item: FindUserInterface) => item.email === userEmail
    );
    if (findUser.password !== userPassword)
      return console.log('Wrong password');

    navigate('/home');

    // Updates the user information in the store
    dispatch(
      userProfileActions.updateUserProfile({
        username: findUser.username || '',
        email: findUser.email || '',
      })
    );

    dispatch(
      linkActions.updateUserFromFetch({
        username: findUser.username,
        email: findUser.email,
      })
    );

    // Updates the user links in the store
    dispatch(linkActions.updateLinksFromFetch(findUser.links));
  };

  return (
    <Card priority='white' className={`${styles.loginContainer} ${className}`}>
      <h1>{loginHeader}</h1>
      <p>{loginInstructions}</p>
      <form className={styles.inputsContainer} onSubmit={onSubmitLoginHandler}>
        <label htmlFor='inputEmail'>{emailLabel}</label>
        <InputText
          errorMessageProp={''}
          id={'inputEmail'}
          inputLinkIcon={emailIcon}
          isRequired
          label={emailLabel}
          placeholder={emailPlaceholder}
          returnIsInputValid={getEmailInputInfo}
          shouldValidate={true}
          validationregex={emailRegex}
        />
        <label htmlFor='inputPassword'>{passwordLabel}</label>
        <InputText
          errorMessageProp={''}
          id={'inputPassword'}
          inputLinkIcon={passwordIcon}
          isRequired
          label={passwordLabel}
          placeholder={passwordPlaceholder}
          returnIsInputValid={getPasswordInput}
          shouldValidate={true}
          validationregex={passwordRegex}
        />
        <Button priority='primary' className={styles.buttonLogin} type='submit'>
          {loginButton}
        </Button>
      </form>
      <div className={styles.buttonCombo}>
        <p className={styles.pButtonCombo}>{registerInstructionsBtn}</p>
        <Button priority='tertiary' onClick={onChangeViewToSignup}>
          {registerBtn}
        </Button>
      </div>
    </Card>
  );
}

export default Login;
