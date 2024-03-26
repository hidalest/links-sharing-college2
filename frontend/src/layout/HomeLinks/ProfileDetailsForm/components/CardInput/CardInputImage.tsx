import { ChangeEvent, useState } from 'react';
import Card from '../../../../../components/UI/Card/Card';

import styles from './CardInput.module.scss';
import { SVGWrapper } from '../../../../../components/UI/SVGWrapper/SVGWrapper';
import Button from '../../../../../components/UI/Button/Button';
import { useAppDispatch } from '../../../../../hooks/hooks';
import { userProfileActions } from '../../../../../store/store';

type userProfilePictureState = File | null;

interface CardInputImageProps {
  profilePictureImageLabel: string;
  profilePictureImageInstructions: string;
  profilePictureImageIcon: string;
  profilePictureImagePlaceholder: string;
  profilePictureImage?: userProfilePictureState;
}

export const CardInputImage = ({
  profilePictureImageLabel,
  profilePictureImageInstructions,
  profilePictureImageIcon,
  profilePictureImagePlaceholder,
  profilePictureImage,
}: CardInputImageProps) => {
  const [profilePicture, setProfilePicture] = useState<userProfilePictureState>(
    profilePictureImage || null
  );
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    if (files && files.length !== 0) setProfilePicture(files[0]);
    dispatch(userProfileActions.updateUserImage(files[0]));
  };

  const onRemoveProfilePic = () => {
    setProfilePicture(null);
    dispatch(userProfileActions.updateUserImage(null));
  };

  const onMouseEnterHandler = () => setShowIcons(true);
  const onMouseLeaveHandler = () => setShowIcons(false);
  const showIconsComponent = !profilePicture || showIcons;
  return (
    <Card priority='grey' className={styles.profilePicture}>
      <p className={styles['profilePicture--label']}>
        {profilePictureImageLabel}
      </p>

      <label className={styles.inputPicture}>
        <input
          type='file'
          name='myImage'
          onChange={onUploadFile}
          className={styles.inputPicture}
        />
        {profilePicture && (
          <article className={styles.profilePicCombo}>
            {/* TODO: Fix aspect ratio image */}
            <img
              alt='not found'
              src={URL.createObjectURL(profilePicture)} // Error here
              width={'146px'}
              height={'175px'}
              className={`${styles.userImg} ${
                showIcons ? styles['userImg--hover'] : ''
              }`}
              onMouseEnter={onMouseEnterHandler}
              onMouseLeave={onMouseLeaveHandler}
            />
            <Button
              priority='primary'
              className={styles.removePic}
              onClick={onRemoveProfilePic}
            >
              Remove
            </Button>
          </article>
        )}

        <div
          className={`${styles.uploadImageIcons} ${
            showIconsComponent ? styles['uploadImageIcons--show'] : ''
          }`}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        >
          <SVGWrapper
            markup={profilePictureImageIcon}
            color={`${showIcons ? 'white' : '#633cff'}`}
          />
          <p className={`${showIcons ? `${styles.showActive}` : ''}`}>
            {profilePictureImagePlaceholder}
          </p>
        </div>
      </label>

      <p className={styles['profilePicture--instructions']}>
        {profilePictureImageInstructions}
      </p>
    </Card>
  );
};
