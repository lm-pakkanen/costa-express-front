import React from 'react';

import styles from './NavLinksRight.module.css';

interface Props {}

const NavLinksRight: React.FC<Props> = (props) => {
    return (
        <div className={styles.NavLinksRight}>
            {props.children}
        </div>
    );
};

export default NavLinksRight;