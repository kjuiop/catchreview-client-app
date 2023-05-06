import type { GetServerSideProps, NextPage } from 'next';

interface Props {
    data: number;
}

const Example: NextPage<Props> = ({ data }) => {
    return (
        <main>
            <h1>getServerSideProps Page</h1>
            <p>값: {data}</p>
        </main>
    );
};

export default Example;


// getServerSideProps 로 대체 ( SSR )
// API 를 mocking 하기 위해서 2초동안 기다린 뒤 promise 를 resolve 하여 데이터를 props 로 반환
// pageComponent 에서 html 랜더링
// SSG 와 달리 Request 시 js 를 랜더링하기 때문에 매 요청마다 페이지가 뜨기까지 2초의 시간이 걸림
// SSG 와 비교했을 때 성능이 좋지 않아 사용을 지양함.
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    /** https://web.dev/i18n/ko/stale-while-revalidate/ */
        // This value is considered fresh for five seconds (s-maxage=5).
        // If a request is repeated within the next 5 seconds, the previously
        // cached value will still be fresh.
        //
        // If the request is repeated before 5~15 seconds,
        // the cached value will be stale but still render (stale-while-revalidate=10).
        //
        // In the background, a revalidation request will be made to populate the cache
        // with a fresh value. If you refresh the page, you will see the new value.

        // 0 ~ 5초까지는 서버에 요청을 보내지 않고 랜더링하지 않음
        // 5 ~ 15초까지는 기존의 캐시된 html 은 그대로 전송지만 pre rendering 을 통해 html 을 다시 만듬
        // 15초가 지나면 캐시된 문서를 사용하지 않고 서버사이드 랜더링을 완료할 때까지 pending 상태가 됨
        res.setHeader(
          'Cache-Control',
          'public, s-maxage=5, stale-while-revalidate=10'
        );

    const delayInSeconds = 2;
    const data = await new Promise((resolve) =>
        setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
    );

    return {
        props: { data },
    };
};
