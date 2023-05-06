import {Inter} from '@next/font/google'
import { Fragment, useEffect } from 'react';
import Header from '../components/common/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <Fragment>
            <Header />
            <main></main>
        </Fragment>
    )
}
