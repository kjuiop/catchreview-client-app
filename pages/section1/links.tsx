import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


// next.js 는 최초로 실행했을 때 해당 페이지의 HTML 을 불러옵니다.
// 페이지를 이동할 때에는 html 을 가져오지 않고, 페이지를 라우팅할 때에는 js 파읾을 가져온다.
// 이는 최초에는 SSR 방식으로 페이지를 빨리 가져오고, 다음 페이지로 접근할 때에는 CSR 방식으로 JS 를 가져온다.
// 이는 Next.js 의 link 로 인해 동작된다. (서버 갔다오지 않고, JS 로 랜더링됨)
// 링크가 보이지 않을 때에는, js 파일을 가져오지 않고 있다가, 해당 링크가 화면에 보일 때에 Lazy Loading 방식으로 js 를 가져온다.

// useRouter 는 next/link 를 대체할 수 있다.
// useRouter 는 next/link 처럼 자동으로 화면이 보일 때 미리 js, json 파일을 땡겨오지 않는다.
// 따라서 useEffect 함수를 직접 구현하여 prefetch 를 통해 해당 파일들을 가져올 수 있게 한다.
// useEffect 는 자동으로 가져오지 않기 때문에 next/link 를 사용하는 것을 권장
export default function Links() {
    const router = useRouter();
    useEffect(() => {
        router.prefetch('/section1/getStaticProps');
    }, [router]);

    return (
        <main>
            <h1>Links</h1>
            <button
                onClick={() => {
                    router.push('/section1/getStaticProps');
                }}
            >
                /getStaticProps
            </button>

            {/*<div style={{ height: '200vh' }} />*/}

            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            {/*<a href="/section1/getStaticProps">/getStaticProps</a>*/}

            {/*<Link href="/section1/getStaticProps">/getStaticProps</Link>*/}
            {/** https://github.com/vercel/next.js/blob/canary/packages/next/client/link.tsx#L487 */}
        </main>
    );
}
