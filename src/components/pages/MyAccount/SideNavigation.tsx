import React from 'react';

interface Props {
	sideNavPageHandler: (e: React.MouseEvent<HTMLInputElement>, id: string) => void
}

const SideNavigation: React.FC<Props> = (props) => {
	return (
		<div className={'sideNavigation'}>
			<input type={'button'}
			       value={'My information'}
			       onClick={(e) => props.sideNavPageHandler(e, 'myInformation')}
			/>
			<input type={'button'}
			       value={'My licenses'}
			       onClick={(e) => props.sideNavPageHandler(e, 'myLicenses')}
			/>
		</div>
	)
}

export default SideNavigation;