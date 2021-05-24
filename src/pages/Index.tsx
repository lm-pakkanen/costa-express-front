import React from 'react';

import PageBoundary from '../components/boundaries/PageBoundary';

import Page from '../components/pages/Page';
import SubPage from '../components/pages/SubPage';
import LayoutContainer from '../components/pages/LayoutContainer';

import Hero from '../components/pages/Index/Hero';
import Schedule from '../components/pages/Index/Schedule';

import styles from './Index.module.css';

interface Props {}

const Index: React.FC<Props> = () => {

    return (
        <PageBoundary>

            <Page
                style={styles.Index}
                wrapperStyle={styles.PageWrapper}
                navigationStyle={styles.Navigation}
            >

                <SubPage style={styles.HeroSubPage}>

                    <LayoutContainer style={styles.HeroLayoutContainer}>

                        <Hero />

                    </LayoutContainer>

                </SubPage>

                <SubPage>

                    <LayoutContainer>

                        <Schedule />

                    </LayoutContainer>

                </SubPage>

            </Page>

        </PageBoundary>
    );
}

export default Index;