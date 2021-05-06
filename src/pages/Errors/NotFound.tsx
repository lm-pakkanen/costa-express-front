import React from 'react';
import { useTranslation } from 'react-i18next';

import NotFoundContainer from '../../components/pages/Errors/Errors';
import Page from '../../components/pages/Page';

import styles from './NotFound.module.css';

interface Props {}

const NotFound: React.FC<Props> = () => {

    const { t: translatePages } = useTranslation('pages');

    return (

        <Page style={styles.NotFound}>

            <NotFoundContainer>

                <h1>404</h1>
                <div>
                    { translatePages('404.description') }
                </div>
            </NotFoundContainer>

        </Page>

    );
}

export default NotFound;