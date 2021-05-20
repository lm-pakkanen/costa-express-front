import React, { useContext, useEffect, useState } from 'react';

import { appStore } from '../../contexts/AppContext';

import { addStylesToClass } from '../../helpers';

import DesktopNavigation from './subcomponents/_DesktopNavigation';
import TabletNavigation from './subcomponents/_TabletNavigation';
import MobileNavigation from './subcomponents/_MobileNavigation';

import styles from './Navigation.module.css';
import useScrollStatus from '../../hooks/useScrollStatus';

interface Props {}

const Navigation: React.FC<Props> = () => {

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
            newStyle = addStylesToClass(newStyle, [styles.scrolled]);
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

    }, [ isScrolled, isFloaterVisible, deviceType, defaultStyle, setStyle ]);

    return (

        <div className={style}>

            <div className={styles.Wrapper}>
                {
                    deviceType === 'desktop'
                        ?
                        <DesktopNavigation />
                        :
                        deviceType === 'tablet'
                            ?
                            <TabletNavigation />
                            :
                            <MobileNavigation />

                }
            </div>

        </div>

    );
};

export default Navigation;