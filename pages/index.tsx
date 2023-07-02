import {Fragment, useEffect} from 'react';
import Header from '../components/home/Header';
import MapSection from '../components/home/MapSection';
import DetailSection from '../components/home/DetailSection';
import {NextPage} from "next";
import {Store} from '../types/store';
import {Menu} from "../types/menu";
import useStores from '../hooks/useStores';
import { NextSeo } from 'next-seo';
import useMenus from "..//hooks/menu/useMenus";
import BottomBar from "../components/home/BottomBar";

interface Props {
    stores: Store[],
    menus: Menu[];
}

const Home: NextPage<Props> = ({ stores, menus }) => {
    const { initializeStores } = useStores();
    const { initializeMenus } = useMenus();

    useEffect(() => {
        initializeStores(stores);
    }, [initializeStores, stores]);

    useEffect( () => {
        initializeMenus(menus);
    }, [initializeMenus, menus]);

    return (
        <Fragment>
            <NextSeo
                title="매장 지도"
                description="가게에 대한 리뷰를 작성하고 공유하는 소셜 커뮤니티입니다."
                canonical="https://catchreview-client-app.vercel.app"
            />
            <Header />
            <main style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
                <MapSection />
                <DetailSection />
                <BottomBar />
            </main>
        </Fragment>
    );
};
export default Home;

export async function getStaticProps() {
    const menus = (await import('../public/menus.json')).default;
    const stores = await fetch('' +
        `${process.env.NEXT_PUBLIC_API_URL}/api/stores`)
        .then((response) => response.json());

    // revalidate : 1시간, reloading 하는 주기
    return {
        props: { stores },
        revalidate: 60 * 60,
    };
}
