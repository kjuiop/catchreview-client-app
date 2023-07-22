import {Fragment, useEffect} from 'react';
import Image from 'next/image';
import styles from '../styles/login/login.module.scss';
import BottomBar from "../components/home/BottomBar";
import {Menu} from "../types/menu";
import {NextPage} from "next";
import useMenus from "../hooks/menu/useMenus";

interface Props {
    menus: Menu[];
}


const Login: NextPage<Props> = ({ menus }) => {
    const { initializeMenus } = useMenus();

    useEffect( () => {
        initializeMenus(menus);
    }, [initializeMenus, menus]);

    return (
        <Fragment>
            <main style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
                <form action="post">
                    <table className={styles.loginTable}>
                        <thead>
                            <Image
                                src='/logo.jpeg'
                                alt='momssi-logo'
                                width={200}
                                height={220}
                            />
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <input name='userName' type="text" placeholder='User Name'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input name='userPassword' type="text" placeholder='Password'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button>로그인</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ol>
                                    <li><a href="/sign-up">회원가입</a></li>
                                    <li><a href="#">아이디/비밀번호 찾기</a></li>
                                </ol>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </main>
            <BottomBar />
        </Fragment>
    );
};

export default Login;


export async function getStaticProps() {
    const menus = (await import('../public/menus.json')).default;

    return {
        props: { menus },
    };
}