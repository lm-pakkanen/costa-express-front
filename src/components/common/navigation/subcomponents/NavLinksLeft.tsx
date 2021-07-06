import React from 'react';

import styles from './NavLinksLeft.module.css';

interface Props {}

const NavLinksLeft: React.FC<Props> = (props) => {

    return (
        <div className={styles.NavLinksLeft}>
            {props.children}
        </div>
    );
}

export default NavLinksLeft;