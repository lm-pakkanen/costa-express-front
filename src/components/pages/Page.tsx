import React from 'react';

import { addStylesToClass } from '../../helpers';

import Navigation from '../navigation/Navigation';
import CookiesConsent from '../common/CookiesConsent';
import Footer from '../common/Footer';

import styles from './Page.module.css';

interface Props {
    style: string
}

const Page: React.FC<Props> = (props) => {

    let style = styles.Page;
    style = addStylesToClass(style, [props.style]);

    return (
        <div className={style}>
            <Navigation />
            <div className={styles.Wrapper}>
                {props.children}
            </div>
            <Footer />
            <CookiesConsent />
        </div>
    );
}

export default Page;