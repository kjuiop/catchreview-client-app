import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Store } from '../types/store';
import styles from '../styles/detail.module.scss';
import DetailHeader from '../components/home/DetailHeader';
import DetailContent from '../components/home/DetailContent';
import {useRouter} from "next/router";
import useCurrentStore from "../hooks/useCurrentStore";

interface Props {
    store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
    const expanded = true;

    const router = useRouter();
    const { setCurrentStore } = useCurrentStore();

    const goToMap = () => {
        setCurrentStore(store);
        router.push(`
      /?zoom=15&lat=${store.coordinates[0]}&lng=${store.coordinates[1]}
    `);
    };

    return (
        <div className={`${styles.detailSection} ${styles.selected} ${styles.expanded}`}>
            <DetailHeader
                currentStore={store}
                expanded={expanded}
                onClickArrow={goToMap}
            />
            <DetailContent currentStore={store} expanded={expanded} />
        </div>
    );
};

export default StoreDetail;

// 파일의 name 에 어떤 name 들이 올 수 있는지 알려주는 기능
/** https://nextjs.org/docs/basic-features/data-fetching/get-static-paths */
export const getStaticPaths: GetStaticPaths = async () => {
    const stores = (await import('../public/store.json')).default;
    // name 의 store.name 이라는 하나의 page 가 만들어짐
    // map 을 이용하여 모든 가게 이름에 대한 page 를 만들어줌
    const paths = stores.map((store) => ({ params: { name: store.name } }));

    // 페이지의 경로를 정적으로 생성해줌
    // yarn build 로 json 으로 받은 데이터들을 확인한 후 필요한 모든 경로에 대해 페이지를 미리 로딩해줌
    // fallback 이 false 라면 build 타임에 모든 경로를 만들고, 만일 없으면 404 페이지로 감
    // fallback 이 true 라면 존재하지 않는 경우 바로 404로 띄우지 않고, 데이터를 먼저 확인한 후 404
    // 모든 데이터를 프리랜더링하지 않고, 최소의 데이터만 프리랜더링 한 후 유저의 클릭 이후에 랜더링함
    // 최초 빌드 이후 추가되는 경우도 좋음
    // fallback: blocking 정상적인 경우 바로 url, 등록되지 않은 경우는 getStaticProps 를 먼저 호출 후 404 페이지
    // blocking 은 html 이 새로 생성될 때까지 가만히 기다림
    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const stores = (await import('../public/store.json')).default;
    // store 저네 배열에서 params 와 이름이 같은 store 를 찾고 가게 정보를 리턴하게 됨
    const store = stores.find((store) => store.name === params?.name);

    if (!store) {
        return {
            notFound: true,
        }
    }

    return { props: { store } };
};
