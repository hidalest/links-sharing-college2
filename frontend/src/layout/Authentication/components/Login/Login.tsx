import { LoginProps } from '../../../../interfaces';
import Card from '../../../../components/UI/Card/Card';
import InputText from '../../../../components/UI/InputText/InputText';
import { emailRegex, passwordRegex } from '../../../../utils/regex';
import Button from '../../../../components/UI/Button/Button';

import styles from './Login.module.scss';
import { useAppDispatch } from '../../../../hooks/hooks';
import { appActions } from '../../../../store/store';

function Login(props: LoginProps) {
  const { className, loginPhase } = props;
  const {
    loginHeader,
    loginButton,
    loginInstructions,
    emailIcon,
    emailLabel,
    emailPlaceholder,
    passwordLabel,
    passwordPlaceholder,
    passwordIcon,
    registerBtn,
    registerInstructionsBtn,
  } = loginPhase;

  const dispatch = useAppDispatch();
  const getEmailInputInfo = (isValid: boolean, inputValue: string) => {
    console.log(isValid, inputValue);
  };
  const getPasswordInput = (isValid: boolean, inputValue: string) => {
    console.log(isValid, inputValue);
  };

  const onChangeViewToSignup = () =>
    dispatch(appActions.changeAuthenticationView());

  return (
    <Card priority='white' className={`${styles.loginContainer} ${className}`}>
      <h1>{loginHeader}</h1>
      <p>{loginInstructions}</p>
      <div className={styles.inputsContainer}>
        <label htmlFor='inputEmail'>{emailLabel}</label>
        <InputText
          errorMessageProp={''}
          id={'inputEmail'}
          inputLinkIcon={emailIcon}
          isRequired
          label={emailLabel}
          placeholder={emailPlaceholder}
          returnIsInputValid={getEmailInputInfo}
          shouldValidate={false}
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
          shouldValidate={false}
          validationregex={passwordRegex}
        />
      </div>
      <Button priority='primary' className={styles.buttonLogin}>
        {loginButton}
      </Button>
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
