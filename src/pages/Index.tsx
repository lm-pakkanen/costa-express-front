import React from 'react';

import { useTranslation } from 'react-i18next';

import constants from '../config/constants';

import commonTranslations from '../_assets/translations/fi/common.json';
import pagesTranslations from '../_assets/translations/fi/pages.json';

import PageBoundary from '../components/boundaries/PageBoundary';

import Page from '../components/pages/Page';
import SubPage from '../components/pages/SubPage';

import IndexContainer from '../components/pages/Index/IndexContainer';

import ProductsContainer from '../components/pages/Index/ProductsContainer';

import {
    Product,
    ProductTitle,
    ProductHero,
    ProductDescription,
    ProductPurchaseButton
} from '../components/pages/Index/Product';

import IImage from '../interfaces/IImage';

import styles from './Index.module.css';

interface Props {}

const Index: React.FC<Props> = () => {

    const { t: translate } = useTranslation('common');
    const { t: translatePages } = useTranslation('pages');

    const blogsProductHero: IImage = {
        url: `${constants.BASE_URI}/img/blogsProductHero.svg`,
        alt: translate('elementAlts.blogsProductHero'),
        title: translate('elementTitles.blogsProductHero')
    };

    const wpStoreProductHero: IImage = {
        url: `${constants.BASE_URI}/img/wpStoreProductHero.svg`,
        alt: translate('elementAlts.wpStoreProductHero'),
        title: translate('elementTitles.wpStoreProductHero')
    };

    return (
        <PageBoundary>

            <Page style={styles.Index}>

                <SubPage>

                    <IndexContainer>

                        <div className={styles.HeroTextContainer}>

                            <h1 className={styles.HeroTextHeading}>
                                {translatePages('index.hero.heading')}
                            </h1>

                            <div className={styles.HeroTextContent}>

                                {
                                    Object.keys(pagesTranslations.index.hero.content).map((key) => {
                                        return <p key={key}>{translatePages(`index.hero.content.${key}`)}</p>;
                                    })
                                }

                            </div>

                        </div>

                        <ProductsContainer>

                            <Product>

                                <ProductHero img={blogsProductHero} />

                                <ProductTitle
                                    title={translate('products.blogs.title')}
                                    price={'4500'}
                                    symbol={'€'}
                                />

                                <ProductDescription>

                                    {
                                        Object.keys(commonTranslations.products.blogs.description).map((key) => {
                                            return (
                                                <div key={key}>
                                                    { translate(`products.blogs.description.${key}`) }
                                                </div>
                                            )
                                        })
                                    }

                                </ProductDescription>

                                <ProductPurchaseButton productID={238476} />

                            </Product>

                            <Product>

                                <ProductHero img={wpStoreProductHero} />

                                <ProductTitle
                                    title={translate('products.wpStore.title')}
                                    price={'2500'}
                                    symbol={'€'}
                                />

                                <ProductDescription>

                                    {
                                        Object.keys(commonTranslations.products.wpStore.description).map((key) => {
                                            return (
                                                <div key={key}>
                                                    { translate(`products.wpStore.description.${key}`) }
                                                </div>
                                            )
                                        })
                                    }

                                </ProductDescription>

                                <ProductPurchaseButton productID={3452345} />

                            </Product>

                        </ProductsContainer>

                    </IndexContainer>

                </SubPage>

            </Page>

        </PageBoundary>
    );
}

export default Index;