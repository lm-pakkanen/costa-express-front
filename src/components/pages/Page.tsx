import React from 'react';

import { addStylesToClass } from '../../helpers';

import Navigation from '../common/navigation/Navigation';
import Footer from '../common/Footer';

import styles from './Page.module.css';

interface Props {
    style: string,
    navigationStyle?: string,
    wrapperStyle?: string,
    footerStyle?: string,
    cookieConsentStyle?: string
}

const Page: React.FC<Props> = (props) => {

    let style = styles.Page;
    style = addStylesToClass(style, [props.style]);

    let wrapperStyle = styles.Wrapper;

    if (props.wrapperStyle) {
        wrapperStyle = addStylesToClass(wrapperStyle, [props.wrapperStyle]);
    }

    return (
        <div className={style}>
            <Navigation style={props.navigationStyle} />
            <div className={wrapperStyle}>
                {props.children}
            </div>
            <Footer />
        </div>
    );
}

export default Page;