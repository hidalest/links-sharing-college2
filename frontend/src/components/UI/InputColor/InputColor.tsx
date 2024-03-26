import { ChangeEvent, useState } from 'react';
import styles from './InputColor.module.scss';

interface InputColorProps {
  label: string;
  onColorChange: (inputEl: HTMLInputElement) => void;
  name: string;
  defaultColor: string;
  className?: string;
}

export const InputColor = ({
  label,
  onColorChange,
  name,
  defaultColor,
  className = '',
}: InputColorProps) => {
  const [inputColor, setInputColor] = useState(defaultColor);

  const onChangeHandlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value);
    onColorChange(e.target);
  };

  return (
    <div className={`${styles.inputColor} ${styles[className]}`}>
      <input
        type='color'
        name={name}
        id='inputColor'
        value={inputColor}
        onChange={onChangeHandlerInput}
      />
      <label htmlFor='inputColor'>{label}</label>
    </div>
  );
};
