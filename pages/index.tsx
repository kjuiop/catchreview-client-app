import {Inter} from '@next/font/google'
import { Fragment, useEffect } from 'react';
import Header from '../components/common/Header'
import styles from '../styles/header.module.scss';
import Link from 'next/link'
import {AiOutlineShareAlt} from "react-icons/ai";
import {VscFeedback} from "react-icons/vsc";
import MapSection from '../components/home/MapSection'
import {NextPage} from "next";
import { Store } from '../types/store';
import useStores from '../hooks/useStores'

const inter = Inter({ subsets: ['latin'] })

interface Props {
    stores: Store[]
}

const Home: NextPage<Props> = ({ stores }) => {
    console.log("stores: ", stores);

    const { initializeStores } = useStores();

    useEffect(() => {
        initializeStores(stores);
    }, [initializeStores, stores]);

    return (
        <Fragment>
            <Header rightElements={[
                // eslint-disable-next-line react/jsx-key
                <button onClick={() => {
                    alert('복사!')
                }}
                        className={styles.box}
                        style={{ marginRight: 8 }}
                        key="button"
                >
                    <AiOutlineShareAlt size={20} />
                </button>,
                <Link href="/feedback" className={styles.box} key="link">
                    <VscFeedback size={20} />
                </Link>
            ]}/>
            <main style={{ width: '100%', height: '100%' }}>
                <MapSection />
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
