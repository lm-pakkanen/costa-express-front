import React from 'react';

import DesktopNavigation from './_DesktopNavigation';

// TODO: visible order of links
/** Tablet navigation not implemented; show desktop navigation instead */
const TabletNavigation: React.FC = () => {
	return (
		<DesktopNavigation />
	);
};

export default TabletNavigation;