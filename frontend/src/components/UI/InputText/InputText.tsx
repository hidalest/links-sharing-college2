import {
  ChangeEvent,
  FormEvent,
  Ref,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import styles from './InputText.module.scss';
import { SVGWrapper } from '../SVGWrapper/SVGWrapper';

interface InputTextProps {
  placeholder: string;
  inputLinkIcon?: string;
  inputValue?: string;
  validationregex: RegExp;
  errorMessageProp: string;
  showLabel?: boolean;
  label: string;
  timeOnCheck?: number;
  className?: string;
  isRequired: boolean;
  maxLength?: number;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  returnIsInputValid: (isValid: boolean, inputValue: string) => void;
  id?: string;
  type?: 'text' | 'email' | 'password';
  isValid?: boolean | null;
  autocomplete?: 'current-password' | 'new-password' | 'username' | 'email';
  shouldValidate?: boolean;
  onChange?: (value: string) => void;
}

const InputText = forwardRef(
  (props: InputTextProps, ref: Ref<HTMLInputElement>) => {
    const {
      placeholder,
      inputLinkIcon,
      returnIsInputValid,
      validationregex,
      errorMessageProp,
      inputValue,
      shouldValidate = true,
      showLabel = false,
      label,
      timeOnCheck = 300,
      className,
      isRequired,
      maxLength = 50,
      type = 'text',
      isValid = null,
      onChange,
    } = props;
    const [inputText, setInputText] = useState(inputValue || '');
    const [isInputValid, setIsInputValid] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const onValidateInput = function (text: string, textValid: boolean | null) {
      // TODO: by not validating like this, malicious actors could insert some scripting. double check this later
      if (!shouldValidate) return;
      const isInputValidWithRegex = validationregex?.test(text);

      if ((!isInputValidWithRegex && text !== '') || isValid === false) {
        setIsInputValid(false);
        setErrorMessage(errorMessageProp);
        returnIsInputValid(false, inputText);
      } else if (text.trim() !== '' && isInputValidWithRegex) {
        setIsInputValid(true);
        returnIsInputValid(true, inputText);
        setErrorMessage('');
      } else if (text.trim() === '' && textValid !== null && isRequired) {
        setIsInputValid(false);
        setErrorMessage("Can't be empty");
        returnIsInputValid(false, inputText);
      } else if (text.trim() === '' && !isRequired) {
        setIsInputValid(true);
        returnIsInputValid(true, inputText);
        setErrorMessage('');
      }
    };

    const onInputFocus = () => {
      onValidateInput(inputText, isInputValid);
    };

    useEffect(() => {
      const typingTimeout = setTimeout(() => {
        onValidateInput(inputText, isInputValid);
      }, timeOnCheck);

      return () => {
        clearTimeout(typingTimeout);
      };
    }, [inputText, isInputValid]);

    const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);

      if (onChange) onChange(e.target.value);
    };

    const errorClass = isInputValid === false ? 'inputInvalid' : '';
    const showLabelClass = showLabel ? 'showLabel' : 'hideLabel';

    return (
      <div className={`${styles.inputContainer} ${className}`}>
        <label
          htmlFor='inputLink'
          className={`${styles.label} ${styles[showLabelClass]}`}
        >
          {label}
          {isRequired && <span className={styles.isRequiredStar}>*</span>}
        </label>
        {inputLinkIcon && (
          <SVGWrapper
            markup={inputLinkIcon}
            color='#737373'
            className={styles.inputIcon}
          />
        )}
        <input
          type={type}
          value={inputText}
          onChange={onInputValueChange}
          className={`${styles.inputText} ${styles[errorClass]}`}
          name='inputLink'
          onBlur={onInputFocus}
          ref={ref}
          aria-invalid={isInputValid === false ? 'true' : 'false'} // Set ARIA attributes
          aria-describedby={
            isInputValid === false ? 'error-message' : undefined
          }
          maxLength={maxLength}
          placeholder={placeholder}
        />
        {!isInputValid && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    );
  }
);

export default InputText;
