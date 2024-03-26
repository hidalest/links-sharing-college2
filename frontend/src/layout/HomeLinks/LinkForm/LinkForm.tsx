import Button from '../../../components/UI/Button/Button';
import Card from '../../../components/UI/Card/Card';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import styles from './LinkForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { linkActions } from '../../../store/store';
import InputText from '../../../components/UI/InputText/InputText';
import { FormEvent, useRef, useState } from 'react';
import { LinkFormProps } from '../../../interfaces';
import { InputColor } from '../../../components/UI/InputColor/InputColor';
import { httpRegex } from '../../../utils/regex';

const LinkForm = (props: LinkFormProps) => {
  const {
    linkId,
    linkFormProps,
    enumeration,
    linkName,
    linkPlaceholder,
    linkIcon,
    linkUserLink,
    draggableProps,
    dragHandleProps,
    isDragging,
  } = props;
  const {
    removeButton,
    sources,
    linkSubheading,
    platformHeading,
    inputLinkIcon,
    dragAndDropIcon,
    addButton,
  } = linkFormProps;

  const dispatch = useAppDispatch();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const currentLink = useAppSelector((state) =>
    state.links.links.find((link) => link.linkId === linkId)
  );
  const [isInputValid, setisInputValid] = useState<boolean>(false);

  const onUpdateCurrentPlatformHandler = (name: string) => {
    const findPlatform = sources.find((source) => source.name === name);

    const payload = {
      linkId,
      findPlatform,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    dispatch(linkActions.updateTheLinkPlatform(payload));
  };

  const onRemoveLinkHandler = (linkId: string) => {
    dispatch(linkActions.removeLink(linkId));
  };

  const onIsInputValidHandler = (isValid: boolean) => {
    setisInputValid(isValid);
  };

  const onColorChange = (inputElement: HTMLInputElement) => {
    const attributeElement = inputElement.name as
      | 'backgroundColor'
      | 'fontColor';

    const elementValue = inputElement.value;

    const payload = {
      linkId,
      attributeElement,
      elementValue,
    };
    dispatch(linkActions.updateLinkColor(payload));
  };

  const onSubmitInputHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.blur();

    const form = e.target as HTMLFormElement;
    console.log(form);
    const inputValue = form.inputLink.value;
    const payload = {
      linkId,
      inputValue,
      isValid: isInputValid,
    };
    dispatch(linkActions.updateTheUserLink(payload));
  };

  return (
    <Card
      priority='grey'
      isDragging={isDragging}
      className={styles.platformLink}
      {...draggableProps}
      {...dragHandleProps}
    >
      <section className={styles.actionButtons}>
        <div className={styles.dragContainer}>
          <Button priority='tertiary'>
            <img src={dragAndDropIcon} />
          </Button>
          <p className={styles.enumeration}>{`Link #${enumeration}`}</p>
        </div>
        <Button priority='tertiary' onClick={() => onRemoveLinkHandler(linkId)}>
          {removeButton}
        </Button>
      </section>
      <section className={styles.platformContainer}>
        <p className={styles.platformSubheadings}>{platformHeading}</p>
        <Dropdown
          platforms={sources}
          platformId={linkId}
          name={linkName}
          icon={linkIcon}
          onUpdateCurrentPlatformHandler={onUpdateCurrentPlatformHandler}
        />
      </section>
      <form className={styles.linkContainer} onSubmit={onSubmitInputHandler}>
        <p className={styles.platformSubheadings}>{linkSubheading}</p>
        <InputText
          placeholder={linkPlaceholder}
          inputValue={linkUserLink}
          inputLinkIcon={inputLinkIcon}
          onSubmit={onSubmitInputHandler}
          returnIsInputValid={onIsInputValidHandler}
          errorMessageProp='Please enter a valid URL'
          validationregex={httpRegex}
          label={'Link'}
          ref={inputRef}
          timeOnCheck={500}
          isRequired
          className={styles.inputTextLink}
        />
        <section className={styles.inputColorContainer}>
          <InputColor
            label={'background'}
            onColorChange={onColorChange}
            name={'backgroundColor'}
            defaultColor={`${
              currentLink?.backgroundColor
                ? currentLink.backgroundColor
                : '#333333'
            }`}
            className={styles.test}
          />
          <InputColor
            label={'Font'}
            onColorChange={onColorChange}
            name={'fontColor'}
            defaultColor={`${
              currentLink?.fontColor ? currentLink.fontColor : '#ffffff'
            }`}
            className={styles.test}
          />
          <Button priority='primary' className={styles.addBtn} type='submit'>
            {addButton}
          </Button>
        </section>
      </form>
    </Card>
  );
};

export default LinkForm;
