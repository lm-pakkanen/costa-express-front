import React from 'react';

import PageBoundary from '../components/boundaries/PageBoundary';

import Page from '../components/pages/Page';
import SubPage from '../components/pages/SubPage';

import IndexContainer from '../components/pages/Index/IndexContainer';

import styles from './Index.module.css';

interface Props {}

const Index: React.FC<Props> = () => {

    return (
        <PageBoundary>

            <Page style={styles.Index}>

                <SubPage>

                    <IndexContainer>

                    </IndexContainer>

                </SubPage>

            </Page>

        </PageBoundary>
    );
}

export default Index;