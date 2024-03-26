import { FormEvent, useState } from 'react';
import Card from '../../../components/UI/Card/Card';
import InputText from '../../../components/UI/InputText/InputText';
import { profileDetailsProps } from '../../../interfaces';
import { emailRegex, usernameRegex } from '../../../utils/regex';
import { CardInputImage } from './components/CardInput/CardInputImage';

import Button from '../../../components/UI/Button/Button';
import styles from './ProfileDetails.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { userProfileActions } from '../../../store/store';

interface InputsDataProps {
  firstNameInputData: {
    inputValue: string | undefined;
    isValid: null | boolean;
  };
  emailInputData: {
    inputValue: string | undefined;
    isValid: null | boolean;
  };
}
export const ProfileDetailsForm = (props: profileDetailsProps) => {
  const userProfileDispatch = useAppDispatch();
  const {
    profileImgURL,
    username: firstName,
    email,
  } = useAppSelector((state) => state.userProfile);
  const {
    heading,
    headingInstructions,
    profilePictureImageLabel,
    profilePictureImageInstructions,
    profilePictureImageIcon,
    profilePictureImagePlaceholder,
    firstNameLabel,
    firstNamePlaceholder,
    firstNameErrorMessage,
    emailLabel,
    emailPlaceholder,
    emailErrorMessage,
  } = props;

  const CardInputImageProps = {
    profilePictureImageIcon,
    profilePictureImageInstructions,
    profilePictureImageLabel,
    profilePictureImagePlaceholder,
  };

  const [inputsData, setInputsData] = useState<InputsDataProps>({
    firstNameInputData: {
      inputValue: '',
      isValid: null,
    },
    emailInputData: {
      inputValue: '',
      isValid: null,
    },
  });

  const returnInputFirstNameHandler = (
    isValid: boolean,
    inputValue?: string
  ) => {
    setInputsData((prevState) => {
      return {
        ...prevState,
        firstNameInputData: {
          inputValue,
          isValid,
        },
      };
    });
  };

  const returnInputEmailHandler = (isValid: boolean, inputValue?: string) => {
    setInputsData((prevState) => {
      return {
        ...prevState,
        emailInputData: {
          inputValue,
          isValid,
        },
      };
    });
  };

  const onSubmitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    const { firstNameInputData, emailInputData } = inputsData;

    const areInputsValid = firstNameInputData.isValid && emailInputData.isValid;

    if (areInputsValid) {
      userProfileDispatch(
        userProfileActions.updateUserProfile({
          username: firstNameInputData.inputValue || '',
          email: emailInputData.inputValue || '',
        })
      );
    }
  };

  return (
    <section className={styles.profileDetails}>
      <header>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles['heading-instructions']}>{headingInstructions}</p>
      </header>
      <CardInputImage
        {...CardInputImageProps}
        profilePictureImage={profileImgURL}
      />
      <Card priority='grey' className={styles.inputFormContainer}>
        <form
          onSubmit={onSubmitFormHandler}
          className={styles.inputProfileForm}
        >
          <InputText
            placeholder={firstNamePlaceholder}
            validationregex={usernameRegex}
            errorMessageProp={firstNameErrorMessage}
            returnIsInputValid={returnInputFirstNameHandler}
            label={firstNameLabel}
            showLabel
            timeOnCheck={500}
            className={styles.inputTextContainer}
            isRequired
            inputValue={firstName}
          />
          <InputText
            placeholder={emailPlaceholder}
            validationregex={emailRegex}
            errorMessageProp={emailErrorMessage}
            returnIsInputValid={returnInputEmailHandler}
            label={emailLabel}
            showLabel
            timeOnCheck={500}
            className={styles.inputTextContainer}
            isRequired
            inputValue={email}
          />

          <Button priority='secondary' type='submit'>
            SUBMIT
          </Button>
        </form>
      </Card>
    </section>
  );
};
