import {Inter} from '@next/font/google'
import { Fragment, useEffect } from 'react';
import Header from '../components/common/Header'
import { NextSeo } from "next-seo";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <Fragment>
            <NextSeo
                title="피드백"
                description="가게에 대한 리뷰를 작성하고 공유하는 소셜 커뮤니티입니다."
                canonical="https://catchreview-client-app.vercel.app/feedback"
            />
            <Header />
            <main></main>
        </Fragment>
    )
}
