import React from 'react';

import DesktopNavigation from './_DesktopNavigation';

// TODO: visible order of links

interface ITabletNavigation {
	enableColorChangeOnScroll?: true
}

/** Tablet navigation not implemented; show desktop navigation instead */
const TabletNavigation: React.FC<ITabletNavigation> = (props) => {
	return (
		<DesktopNavigation enableColorChangeOnScroll={props.enableColorChangeOnScroll} />
	);
};

export default TabletNavigation;