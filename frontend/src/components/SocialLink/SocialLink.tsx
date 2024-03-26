import React from 'react';

import { LinkType } from '../../interfaces';
import { SVGWrapper } from '../UI/SVGWrapper/SVGWrapper';

import styles from './SocialLink.module.scss';

interface SocialLinkProps {
  userLinks: LinkType[];
  arrowIconLinks: string;
  className?: string;
}

function SocialLink({ userLinks, arrowIconLinks, className }: SocialLinkProps) {
  return (
    <section className={`${styles.linkContainer} ${className}`}>
      {userLinks
        .filter((link) => link.isValid)
        .map(({ name, userLink, icon, backgroundColor, fontColor }, index) => {
          return (
            <a
              className={styles.link}
              href={userLink}
              target='_blank'
              key={index}
              style={{ backgroundColor }}
            >
              <div className={styles.linkInfoContainer}>
                <SVGWrapper markup={icon} color={fontColor || '#ffffff'} />
                <span
                  style={{ color: fontColor }}
                  className={styles.platformName}
                >
                  {name}
                </span>
              </div>
              <div>
                <SVGWrapper
                  markup={arrowIconLinks}
                  color={fontColor || '#ffffff'}
                />
              </div>
            </a>
          );
        })}
    </section>
  );
}

export default SocialLink;
