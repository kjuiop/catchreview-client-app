import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/header.module.scss';

interface Props {
    onClickLogo?: () => void;
    rightElements?: React.ReactElement[];
}

const HeaderComponent = ({ onClickLogo, rightElements }: Props) => {
    return (
        <header className={styles.header}>
            <div className={styles.flexItem}>
                <Link
                    href="/"
                    onClick={onClickLogo}
                    className={styles.box}
                    aria-label="홈으로 이동"
                >
                    <Image
                        src="/inflearn.png"
                        width={110}
                        height={20}
                        alt="인프런 로고"
                        // LCP 와 관련된 이미지는 네이버지도 이미지이므로 로고 이미지에 priority 는 사용하지 않는다.
                        // priority
                    />
                </Link>
            </div>
            {rightElements && <div className={styles.flexItem}>{rightElements}</div>}
        </header>
    );
};

export default HeaderComponent;
