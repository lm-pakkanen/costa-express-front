import React from 'react';

import styles from './ProjectsContainer.module.css';

interface IProjectsContainer {}

const ProjectsContainer: React.FC<IProjectsContainer> = (props) => {

	return (

		<div className={styles.ProjectsContainer}>
			{props.children}
		</div>

	);

}

export default ProjectsContainer;