import type { NextPage} from "next";

interface Props {
    data: number;
}

// data 를 props 를 받아 전
const Example: NextPage<Props> = ({ data }) => {
  return (
    <main>
        <h1>getStaticProps Page</h1>
        <p>값: {data}</p>
    </main>
  );
};

export default Example;


// SSG 는 빌드 타임에 값을 pre-rendering 하고, 정적으로 그 값이 바뀌지 않아야함
// next.js 에서는 개발환경에서는 매 요청마다 getStaticProps 를 실행한다.
export async function getStaticProps() {
    const delayInSeconds = 2;
    // Promise 를 통해 mocking api 를 만듬
    // api 에서 값을 받아왔다고 가정 후, 랜덤 데이터를 반환함
    const data = await new Promise((resolve) =>
        setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
    );

    // revalidate 속성을 통해 빌드가 완료된 정적 페이지를 주기적으로 업데이트 할 수 있다.
    // 현재 revalidate 가 없다면, 정적인 값으로 html 을 리턴하지만,
    // revalidate 가 있는 경우 5초마다 주기적으로 html 을 업데이트 하게 된다.
    // 이는 해당 페이지에만 해당한다.
    return {
        props: { data },
        revalidate: 5 /** https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration */,
    };
}

