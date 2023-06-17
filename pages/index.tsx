import {Fragment, useEffect} from 'react';
import Header from '../components/home/Header';
import MapSection from '../components/home/MapSection'
import DetailSection from '../components/home/DetailSection'
import {NextPage} from "next";
import {Store} from '../types/store';
import useStores from '../hooks/useStores'
import { NextSeo } from 'next-seo'

interface Props {
    stores: Store[]
}

const Home: NextPage<Props> = ({ stores }) => {
    // console.log("stores: ", stores);

    const { initializeStores } = useStores();

    useEffect(() => {
        initializeStores(stores);
    }, [initializeStores, stores]);

    return (
        <Fragment>
            <NextSeo
                title="Catch Review"
                description="가게에 대한 리뷰를 작성하고 공유하는 소셜 커뮤니티입니다."
            />
            <Header />
            <main style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
                <MapSection />
                <DetailSection />
            </main>
        </Fragment>
    );
};
export default Home;

export async function getStaticProps() {
    // todo: next api routes 로 불러오기
    const stores = (await import('../public/store.json')).default;

    // revalidate : 1시간, reloading 하는 주기
    return {
        props: { stores },
        revalidate: 60 * 60,
    };
}
