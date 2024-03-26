import React from 'react';

import styles from './UserInformation.module.scss';
import { useAppSelector } from '../../hooks/hooks';

interface UserInformationProps {
  className?: string;
}

function UserInformation(props: UserInformationProps) {
  const { className } = props;
  const {
    profileImgURL = '',
    username,
    email,
  } = useAppSelector((state) => state.userProfile);
  return (
    <section className={`${styles.userInformation} ${className}`}>
      {profileImgURL && (
        <div className={styles.profileImageContainer}>
          <img src={URL.createObjectURL(profileImgURL)} alt='user profile' />
        </div>
      )}
      <div className={styles.profileInformationContainer}>
        <article className={styles['profileInformationContainer--text']}>
          <p className={styles['profileInformationContainer--name']}>
            {username}
          </p>
          <p className={styles['profileInformationContainer--email']}>
            {email}
          </p>
        </article>
      </div>
    </section>
  );
}

export default UserInformation;
