import React from 'react';

import data from '../../data.json';
import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import SocialLink from '../../components/SocialLink/SocialLink';
import { useAppSelector } from '../../hooks/hooks';
import { PreviewPageProps } from '../../interfaces';

import styles from './Preview.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../lib/routes';
import UserInformation from '../../components/UserInformation/UserInformation';

function Preview(props: PreviewPageProps) {
  const userLinks = useAppSelector((state) => state.links.links);
  const arrowLink = data.homeLinksData.phoneMockupProps.arrowIconLinks;
  const { navbarProps } = props.previewPageProps;
  const { goBackBtn, shareLinkBtn } = navbarProps;
  return (
    <section className={styles.preview}>
      {/* <div className={styles['preview--navigation']}>
        <p>pre</p>
      </div> */}
      <nav className={styles['preview--navigation2']}>
        <Card priority='white' className={styles['preview--navigation_bar']}>
          <Link to={routes.home}>
            <Button priority='secondary'>{goBackBtn}</Button>
          </Link>
          <Link to={routes.home}>
            <Button priority='primary'>{shareLinkBtn}</Button>
          </Link>
        </Card>
      </nav>

      <Card priority='white' className={styles.previewLinksContainer}>
        <UserInformation />
        {userLinks.length === 0 && <p>Try adding some links first!</p>}
        {userLinks.length !== 0 && (
          <SocialLink
            userLinks={userLinks}
            arrowIconLinks={arrowLink}
            className={styles.previewLinksSubcontainer}
          />
        )}
      </Card>
    </section>
  );
}

export default Preview;
