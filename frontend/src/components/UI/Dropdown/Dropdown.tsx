import { useState } from 'react';
import { LinkType } from '../../../interfaces';
import styles from './Dropdown.module.scss';
import Button from '../Button/Button';
import Card from '../Card/Card';

interface DropdownProps {
  platforms: LinkType[];
  platformId: string;
  name: string;
  icon: string;
  onUpdateCurrentPlatformHandler: (name: string) => void;
}

interface DropdownContainerProps {
  children: React.ReactNode;
  defaultPlatform: {
    name: string;
    icon: string;
  };
  name: string;
  icon: string;
}

interface DropdownContainerItems {
  platforms: LinkType[];
  platformId: string;
  onUpdateCurrentPlatformHandler: (name: string) => void;
}

function DropdownContainer({ children, icon, name }: DropdownContainerProps) {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const onToggleDropdownHandler = () => setToggleDropdown(!toggleDropdown);

  const dropdownStatus = toggleDropdown ? 'open' : '';

  return (
    <Button
      priority='tertiary'
      onClick={onToggleDropdownHandler}
      className={`${styles.dropdownContainer} ${styles[dropdownStatus]}`}
    >
      <img src={icon} alt={`icon for ${name}`} />
      <span>{name}</span>
      {children}
    </Button>
  );
}

function DropdownItems({
  platforms,
  onUpdateCurrentPlatformHandler,
}: DropdownContainerItems) {
  return (
    <Card className={`${styles.dropdownItems}`} priority='white'>
      {platforms.map((platform, index) => {
        return (
          <article
            key={index}
            onClick={() => onUpdateCurrentPlatformHandler(platform.name)}
          >
            <img src={platform.icon} alt={`icon for ${platform.name}`} />
            <span>{platform.name}</span>
          </article>
        );
      })}
    </Card>
  );
}

function Dropdown(props: DropdownProps) {
  const { platforms, platformId, name, icon, onUpdateCurrentPlatformHandler } =
    props;

  const updateThePlatform = (name: string) => {
    onUpdateCurrentPlatformHandler(name);
  };

  return (
    <DropdownContainer defaultPlatform={platforms[0]} name={name} icon={icon}>
      <DropdownItems
        platforms={platforms}
        platformId={platformId}
        onUpdateCurrentPlatformHandler={updateThePlatform}
      />
    </DropdownContainer>
  );
}

export default Dropdown;
