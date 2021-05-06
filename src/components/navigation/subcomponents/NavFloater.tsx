import React, { useContext } from 'react';

import { appStore } from '../../../contexts/AppContext';

import { addStylesToClass } from '../../../helpers';

import floaterStyles from './NavFloater.module.css';

interface Props {}

const NavFloater: React.FC<Props> = (props) => {

    const appContext = useContext(appStore);
    const { navigation, meta } = appContext.state;

    const ref = navigation.refs.floaterRef;
    const isVisible = navigation.isFloaterVisible;
    const isScrolled = meta.viewport.isScrolled;

    let style = floaterStyles.NavFloater;

    if (isScrolled) {
        style = addStylesToClass(style, [floaterStyles.scrolled]);
    }

    return (
        isVisible && (
            <div className={style} ref={ref}>
                {props.children}
            </div>
        )
    );
}

export default NavFloater;