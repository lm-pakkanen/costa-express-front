import React, { useContext, useEffect, useState } from 'react';

import { appStore } from '../../../contexts/AppContext';

import { addStylesToClass } from '../../../helpers';

import DesktopNavigation from './subcomponents/_DesktopNavigation';
import TabletNavigation from './subcomponents/_TabletNavigation';
import MobileNavigation from './subcomponents/_MobileNavigation';

import styles from './Navigation.module.css';
import useScrollStatus from '../../../hooks/useScrollStatus';

interface Props {
    style?: string,
    scrolledStyle?: string,
    enableColorChangeOnScroll?: true
}

const Navigation: React.FC<Props> = (props) => {

    const appContext = useContext(appStore);
    const { state } = appContext;

    const defaultStyle = styles.Navigation;
    const [style, setStyle] = useState(defaultStyle);

    const isScrolled = useScrollStatus();
    const isFloaterVisible = state.navigation.isFloaterVisible;

    const deviceType = state.meta.viewport.deviceType;

    useEffect(() => {

        let newStyle = defaultStyle;

        if (isScrolled) {

            if (props.scrolledStyle) {
                newStyle = addStylesToClass(newStyle, [props.scrolledStyle]);
            } else {
                newStyle = addStylesToClass(newStyle, [styles.scrolled]);
            }

        } else if (props.style) {
            newStyle = addStylesToClass(newStyle, [props.style]);
        }

        if (isFloaterVisible) {
            newStyle = addStylesToClass(newStyle, [styles.floaterVisible]);
        }

        if (deviceType === 'tablet') {
            newStyle = addStylesToClass(newStyle, [styles.tablet]);
        } else if (deviceType === 'mobile') {
            newStyle = addStylesToClass(newStyle, [styles.mobile]);
        }

        setStyle(newStyle);

    }, [
        isScrolled,
        isFloaterVisible,
        deviceType,
        defaultStyle,
        setStyle,
        props.scrolledStyle,
        props.style
    ]);

    return (

        <div className={style}>

            <div className={styles.Wrapper}>
                {
                    deviceType === 'desktop'
                        ?
                        <DesktopNavigation enableColorChangeOnScroll={props.enableColorChangeOnScroll} />
                        :
                        deviceType === 'tablet'
                            ?
                            <TabletNavigation enableColorChangeOnScroll={props.enableColorChangeOnScroll} />
                            :
                            <MobileNavigation enableColorChangeOnScroll={props.enableColorChangeOnScroll} />

                }
            </div>

        </div>

    );
};

export default Navigation;