import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import copy from 'copy-to-clipboard';
import styles from '../../styles/home/header.module.scss';
import Header from '../common/Header';
import useMap from '../../hooks/map/useMap';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';

const HomeHeader = () => {
    const { resetMapOptions, getMapOptions } = useMap();

    // router.replace() 함수를 통해 경로 변경
    const router = useRouter();
    const replaceAndCopyUrl = useCallback(() => {
        const mapOptions = getMapOptions();
        const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

        router.replace(query);
        copy(location.origin + query);
    }, [router, getMapOptions]);

    // header 를 눌렀을 때 초기화면으로 돌아가는 함수 resetMapOptions 호출
    return (
        <Header
            onClickLogo={resetMapOptions}
            rightElements={[
                <button
                    onClick={replaceAndCopyUrl}
                    className={styles.box}
                    style={{ marginRight: 8 }}
                    key="button"
                    aria-label="현재 위치 클립보드 복사"
                >
                    <AiOutlineShareAlt size={20} />
                </button>,
                <Link
                    href={`/feedback`}
                    className={styles.box}
                    key="link"
                    aria-label="피드백 페이지로 이동"
                >
                    <VscFeedback size={20} />
                </Link>,
            ]}
        />
    );
};
export default HomeHeader;
