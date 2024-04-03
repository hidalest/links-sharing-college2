import { SignupProps } from '../../../../interfaces';
import Card from '../../../../components/UI/Card/Card';
import InputText from '../../../../components/UI/InputText/InputText';
import {
  emailRegex,
  passwordRegex,
  usernameRegex,
} from '../../../../utils/regex';
import Button from '../../../../components/UI/Button/Button';
import { useAppDispatch } from '../../../../hooks/hooks';
import { appActions } from '../../../../store/store';
import { FormEvent, useReducer, useState } from 'react';

import styles from './Signup.module.scss';
import axios from 'axios';
import { SERVER_URL } from '../../../../config/apiConfig';
import { handleRequest } from '../../../../utils/handlePostRequest';

type InputsProperties = {
  value: string;
  isValid: boolean | null;
};
interface inputsInitialValuesProps {
  inputEmail: InputsProperties;
  inputUsername: InputsProperties;
  inputPassword: InputsProperties;
  inputConfirmPassword: InputsProperties;
}

const inputsInitialValues: inputsInitialValuesProps = {
  inputEmail: {
    value: '',
    isValid: null,
  },
  inputUsername: {
    value: '',
    isValid: null,
  },
  inputPassword: {
    value: '',
    isValid: null,
  },
  inputConfirmPassword: {
    value: '',
    isValid: null,
  },
};

type ReducerPayload = {
  value: string;
  isValid: boolean | null;
};

type ReducerType =
  | 'InputEmail'
  | 'InputUsername'
  | 'InputPassword'
  | 'InputConfirmPassword';

type ReducerActions = { type: ReducerType; payload: ReducerPayload };

const reducer = (state: inputsInitialValuesProps, action: ReducerActions) => {
  switch (action.type) {
    case 'InputEmail':
      return {
        ...state,
        inputEmail: {
          value: action.payload.value,
          isValid: action.payload.isValid,
        },
      };

    case 'InputUsername':
      return {
        ...state,
        inputUsername: {
          value: action.payload.value,
          isValid: action.payload.isValid,
        },
      };
    case 'InputPassword':
      return {
        ...state,
        inputPassword: {
          value: action.payload.value,
          isValid: action.payload.isValid,
        },
      };
    case 'InputConfirmPassword':
      return {
        ...state,
        inputConfirmPassword: {
          value: action.payload.value,
          isValid: action.payload.isValid,
        },
      };

    default:
      return state;
  }
};

function Signup(props: SignupProps) {
  const { className, signupPhase } = props;
  const [inputsElements, dispatch] = useReducer(reducer, inputsInitialValues);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<
    null | boolean
  >(null);
  const {
    loginHeader,
    loginButton,
    loginInstructions,
    emailLabel,
    emailPlaceholder,
    inputPasswordIcon,
    inputPasswordEmailIcon,
    passwordLabel,
    passwordPlaceholder,
    confirmPasswordLabel,
    confirmPasswordPlaceholder,
    registerBtn,
    registerInstructionsBtn,
    usernameIcon,
    usernamePlaceholder,
    usernameLabel,
    passwordInstructions,
  } = signupPhase;

  const reduxDispatch = useAppDispatch();

  const onChangeToLoginView = () =>
    reduxDispatch(appActions.changeAuthenticationView());

  const getUsernameInfo = (isValid: boolean, value: string) => {
    dispatch({ type: 'InputUsername', payload: { value, isValid } });
  };

  const getEmailInputInfo = (isValid: boolean, value: string) => {
    dispatch({ type: 'InputEmail', payload: { value, isValid } });
  };

  const getPasswordInput = (isValid: boolean, value: string) => {
    dispatch({ type: 'InputPassword', payload: { value, isValid } });
  };
  const getConfirmPassword = (isValid: boolean, value: string) => {
    dispatch({ type: 'InputConfirmPassword', payload: { value, isValid } });
    console.log(isValid);
  };

  const onSubmitAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputsElements);
    console.log('click');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (
      isConfirmPasswordValid === false ||
      !inputsElements.inputEmail.isValid ||
      !inputsElements.inputPassword.isValid ||
      !inputsElements.inputUsername.isValid
    ) {
      alert('You entered something wrong. Please review your information');
      return;
    }

    const data = await axios.get(SERVER_URL).then((res) => res.data.data);
    data.push({
      email: inputsElements.inputEmail.value,
      password: inputsElements.inputPassword.value,
      username: inputsElements.inputUsername.value,
      links: [],
    });

    try {
      console.log('getting here');
      await handleRequest(
        data,
        'User created Successfully',
        'Something went wrong while saving.'
      );
    } catch (error) {
      console.error('Error:', error);
    }
    console.log(data);
    console.log('Successfull register!');
  };

  const getConfirmationPassword = (text: string) => {
    if (inputsElements.inputPassword.value !== text) {
      setIsConfirmPasswordValid(false);
      console.log("Passwords don't match!");
    } else {
      setIsConfirmPasswordValid(true);
    }
  };

  return (
    <Card priority='white' className={`${styles.loginContainer} ${className}`}>
      <h1>{loginHeader}</h1>
      <p>{loginInstructions}</p>
      <form className={styles.inputsContainer} onSubmit={onSubmitAccount}>
        {/* TODO, username placeholder doesnt look in line with the icon */}
        <label htmlFor='inputEmail'>{usernameLabel}</label>
        {/*  Username */}
        <InputText
          placeholder={usernamePlaceholder}
          label={usernameLabel}
          returnIsInputValid={getUsernameInfo}
          validationregex={usernameRegex}
          inputLinkIcon={usernameIcon}
          errorMessageProp={''}
          isRequired
          id={'inputEmail'}
          autocomplete='email'
        />
        {/*  Email */}
        <label htmlFor='inputEmail'>{emailLabel}</label>
        <InputText
          placeholder={emailPlaceholder}
          label={emailLabel}
          returnIsInputValid={getEmailInputInfo}
          validationregex={emailRegex}
          inputLinkIcon={inputPasswordEmailIcon}
          errorMessageProp={''}
          isRequired
          id={'inputEmail'}
          type='email'
          autocomplete='email'
        />
        {/*  Password */}
        <label htmlFor='inputPassword'>{passwordLabel}</label>
        <InputText
          autocomplete='new-password'
          placeholder={passwordPlaceholder}
          label={passwordLabel}
          returnIsInputValid={getPasswordInput}
          validationregex={passwordRegex}
          inputLinkIcon={inputPasswordIcon}
          errorMessageProp={''}
          isRequired
          id={'inputPassword'}
          type='password'
          shouldValidate
        />
        {/* Confirm Password */}
        <label htmlFor='inputConfirmPassword'>{confirmPasswordLabel}</label>
        <InputText
          autocomplete='new-password'
          placeholder={confirmPasswordPlaceholder}
          label={confirmPasswordLabel}
          returnIsInputValid={getConfirmPassword}
          validationregex={passwordRegex}
          errorMessageProp={"Password don't match"}
          isRequired
          id={'inputConfirmPassword'}
          inputLinkIcon={inputPasswordIcon}
          type='password'
          isValid={isConfirmPasswordValid}
          onChange={getConfirmationPassword}
          shouldValidate
        />
        <p>{passwordInstructions}</p>
        <Button
          priority='primary'
          type='submit'
          className={`${styles.buttonLogin} ${styles.submitButton}`}
        >
          {registerBtn}
        </Button>
        <div className={styles.buttonCombo}>
          <p className={styles.pButtonCombo}>{registerInstructionsBtn}</p>
          <Button priority='tertiary' onClick={onChangeToLoginView}>
            {loginButton}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Signup;
