import React from 'react';

import { NavFloaterToggler } from './NavInputs';

import styles from './NavLinksRight.module.css';

import { LanguageSwitcher } from './NavInputs';

interface Props {}

const NavLinksRight: React.FC<Props> = (props) => {
    return (
        <div className={styles.NavLinksRight}>
            {props.children}
            <LanguageSwitcher />
            <NavFloaterToggler />
        </div>
    );
};

export default NavLinksRight;