/** https://nextjs.org/docs/api-reference/next/image */
import type { NextPage } from 'next';
import Image from 'next/image';
import LegacyImage from 'next/legacy/image';
import example from '/public/example.jpg';

// lazy loading 기능을 쓰면, 브라우저에서 해당 페이지로 스크롤을 내려 이미지가 보일 때 로딩함
// next/image 를 하면 jpeg -> webp 로 이미지 최적화가 된다.
// quality 를 통해 최적화를 할 수 있다.
// next/image 를 사용하면 용량 최적화 및 lazy 기능도 적용된다.
// blur 이미지는 배경색을 먼저 그려주고, 나머지 로딩이 완료되면 이미지를 제대로 그려준다.
// 이것이 가능한 이유는 static 에 해당 이미지를 그릴 수 있기 때문

// next/image 는 외부의 이미지의 width, height 를 미리 알 수 없기 때문에 지정을 하지 않으면 에러처리함
// cover 속성을 사용하면 이미지가 부모 요소에 맞게 들어가지만 납작하지 않게 랜더링할 수 있다.
// fill 속성을 사용하면 부모 요소의 크기에 따라 이미지도 랜더링된다.
// next/image 에서는 보안을 위해 허용된 외부 주소만 허용한다. 이는 next.config.js 에 선언되어 있다.
const Images: NextPage = () => {
    return (
        <main>
            {/* loading check */}
            {/*<section style={{ height: '500vh' }}>long long content</section>*/}

            <hr style={{ margin: '32px 0' }} />

            <h1>img tag</h1>

            <figure>
              <img
                src="https://inflearn-nextjs.vercel.app/example.jpg"
                alt="example"
                width={500}
                height={100}
                // https://web.dev/browser-level-image-lazy-loading/
                // loading="lazy"
              />
              <figcaption>example img</figcaption>
            </figure>

            <hr style={{ margin: '32px 0' }} />

            <h1>next/image</h1>

            <figure>
                <Image
                    src={example}
                    alt="v13 image"
                    width={500}
                    height={100}
                    quality={100}
                    placeholder="blur"
                />
                <figcaption>v13 image</figcaption>
            </figure>

            <figure>
                <Image
                    src="https://inflearn-nextjs.vercel.app/example.jpg"
                    alt="v13 image"
                    width={500}
                    height={100}
                />
                <figcaption>v13 image</figcaption>
            </figure>

            {/* ERROR */}
            {/*<figure>*/}
            {/*  <Image src="/example.jpg" alt="v13 image" />*/}
            {/*  <figcaption>v13 image</figcaption>*/}
            {/*</figure>*/}

            <figure style={{ position: 'relative', width: '500px', height: '100px' }}>
                <Image
                    src="https://inflearn-nextjs.vercel.app/example.jpg"
                    alt="v13 fill"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </figure>

            <hr style={{ margin: '32px 0' }} />

            {/*<h1>next/legacy/image</h1>*/}

            {/*/!** statically import *!/*/}
            {/*<figure>*/}
            {/*    <LegacyImage src={example} alt="example image" />*/}
            {/*    <figcaption>intrinsic static image</figcaption>*/}
            {/*</figure>*/}

            {/* ERROR */}
            {/*<figure>*/}
            {/*  <Image src="/example.jpg" alt="example" />*/}
            {/*  <figcaption>example image</figcaption>*/}
            {/*</figure>*/}

            {/** path string */}
            {/*<figure>*/}
            {/*    <LegacyImage*/}
            {/*        src="/example.jpg"*/}
            {/*        alt="intrinsic image"*/}
            {/*        width={500}*/}
            {/*        height={100}*/}
            {/*    />*/}
            {/*    <figcaption>intrinsic remote image</figcaption>*/}
            {/*</figure>*/}

            {/*<figure>*/}
            {/*    <LegacyImage*/}
            {/*        src={example}*/}
            {/*        alt="fixed image"*/}
            {/*        layout="fixed"*/}
            {/*        width={500}*/}
            {/*        height={100}*/}
            {/*    />*/}
            {/*    <figcaption>fixed image</figcaption>*/}
            {/*</figure>*/}

            {/*<figure>*/}
            {/*    <LegacyImage*/}
            {/*        src={example}*/}
            {/*        alt="responsive image"*/}
            {/*        layout="responsive"*/}
            {/*        width={500}*/}
            {/*        height={100}*/}
            {/*    />*/}
            {/*    <figcaption>responsive image</figcaption>*/}
            {/*</figure>*/}

            {/*<figure>*/}
            {/*    <div style={{ width: 500, height: 100, position: 'relative' }}>*/}
            {/*        <LegacyImage*/}
            {/*            src="/example.jpg"*/}
            {/*            alt="fill image"*/}
            {/*            layout="fill"*/}
            {/*            objectFit="cover"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <figcaption>fill image</figcaption>*/}
            {/*</figure>*/}

            {/*<hr style={{ margin: '32px 0' }} />*/}
        </main>
    );
};

export default Images;
