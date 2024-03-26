import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import { NavBarProps } from '../../interfaces';

import { SVGWrapper } from '../UI/SVGWrapper/SVGWrapper';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { appActions } from '../../store/store';
import { routes } from '../../lib/routes';

import styles from './Navbar.module.scss';

function Navbar({ navbarProps, mainLogoDesktop, mainLogoSmall }: NavBarProps) {
  const dispatch = useAppDispatch();
  const {
    logoLinkPage,
    logoProfilePage,
    linkPageCopy,
    profileDetailsPageCopy,
    buttonPreviewCopy,
    buttonPreviewIcon,
  } = navbarProps;

  const view = useAppSelector((state) => state.app.currentView);
  const username = useAppSelector((state) => state.userProfile.username);
  const onChangeLinksViewHandler = () =>
    dispatch(appActions.changeView('links'));
  const onChangeProfileDetailsViewHandler = () => {
    dispatch(appActions.changeView('profileDetails'));
  };

  return (
    <nav className={styles.navbar}>
      <Link to={'/'}>
        <img src={mainLogoDesktop} className={styles['mainLogo-big']}></img>
        <img src={mainLogoSmall} className={styles['mainLogo-small']}></img>
      </Link>
      <section className={styles.navbarLinks}>
        <Link
          onClick={onChangeLinksViewHandler}
          to={`${routes.home}`}
          className={`${styles.navbarLinks} ${styles.routeLink} ${
            location.pathname === '/home' && view === 'links'
              ? styles.activeRoute
              : ''
          }`}
        >
          <SVGWrapper markup={logoLinkPage} color='' />
          <span className={styles['link-copy']}>{linkPageCopy}</span>
        </Link>
        <Link
          onClick={onChangeProfileDetailsViewHandler}
          to={`${routes.home}`}
          className={`${styles.navbarLinks} ${styles.routeLink} ${
            location.pathname === '/home' && view === 'profileDetails'
              ? styles.activeRoute
              : ''
          }`}
        >
          <SVGWrapper markup={logoProfilePage} color='' />
          <span className={styles['link-copy']}>{profileDetailsPageCopy}</span>
        </Link>
      </section>
      <Link
        to={`${routes.preview}/${username.toLowerCase()}`}
        className={`${styles.navbarLinks}`}
      >
        <Button priority='secondary' className={styles.previewBtn}>
          <span className={styles['link-copy']}>{buttonPreviewCopy}</span>
          <img
            className={styles['button-preview-icon']}
            src={buttonPreviewIcon}
          ></img>
        </Button>
      </Link>
    </nav>
  );
}

export default Navbar;
