import {Fragment, useEffect} from 'react';
import Header from '../components/home/Header';
import MapSection from '../components/home/MapSection'
import DetailSection from '../components/home/DetailSection'
import {NextPage} from "next";
import {Store} from '../types/store';
import useStores from '../hooks/useStores'

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
