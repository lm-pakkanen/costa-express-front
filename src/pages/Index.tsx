import React from 'react';

import PageBoundary from '../components/boundaries/PageBoundary';

import Page from '../components/pages/Page';
import SubPage from '../components/pages/SubPage';
import LayoutContainer from '../components/pages/LayoutContainer';

import Hero from '../components/pages/Index/Hero';
import Schedule from '../components/pages/Index/Schedule';
import InfoBoxes from '../components/pages/Index/InfoBoxes';

import styles from './Index.module.css';
import ContactInfoBoxes from '../components/pages/Index/ContactInfoBoxes';

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

                        <span id={'Schedule'} className={styles.ScheduleScrollAnchor} />

                    </LayoutContainer>

                </SubPage>

                <SubPage>

                    <LayoutContainer style={styles.ScheduleLayoutContainer}>

                        <Schedule />

                    </LayoutContainer>

                    <LayoutContainer>
                        <InfoBoxes />
                    </LayoutContainer>

                    <LayoutContainer>
                        <span id={'ContactInfo'} className={styles.ContactInfoAnchor} />
                        <ContactInfoBoxes />
                    </LayoutContainer>

                </SubPage>

            </Page>

        </PageBoundary>
    );
}

export default Index;