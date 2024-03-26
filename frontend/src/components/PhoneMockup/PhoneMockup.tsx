import Card from '../UI/Card/Card';
import styles from './PhoneMockup.module.scss';
import { LinkType } from '../../interfaces';
import SocialLink from '../SocialLink/SocialLink';
import UserInformation from '../UserInformation/UserInformation';
import { useAppSelector } from '../../hooks/hooks';

interface phoneMockupProps {
  userLinks: LinkType[];
  phoneMockupImage: string;
  phoneMockupProps: {
    arrowIconLinks: string;
  };
}

export const PhoneMockup = ({
  userLinks,
  phoneMockupImage,
  phoneMockupProps,
}: phoneMockupProps) => {
  const { arrowIconLinks } = phoneMockupProps;
  const { username, email, profileImgURL } = useAppSelector(
    (state) => state.userProfile
  );

  const showUserInformation = username && email;
  const showUserInfoClass =
    showUserInformation && profileImgURL
      ? 'userInfo--phoneMockup-full'
      : 'userInfo--phoneMockup-partial';
  return (
    <Card priority='white' className={styles['phone-mockup']}>
      <img src={phoneMockupImage} alt='phone mockup' />
      {showUserInformation && (
        <UserInformation
          className={`${styles['userInfo--phoneMockup']} ${styles[showUserInfoClass]}`}
        />
      )}

      {userLinks.length !== 0 && (
        <SocialLink
          userLinks={userLinks}
          arrowIconLinks={arrowIconLinks}
          className={styles.socialLinksContainer}
        />
      )}
    </Card>
  );
};
