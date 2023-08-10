import {Fragment, useEffect, useState} from 'react';
import styles from '../styles/login/sign-up.module.scss';
import BottomBar from "../components/home/BottomBar";
import {Menu} from "../types/menu";
import {NextPage} from "next";
import useMenus from "../hooks/menu/useMenus";
import Image from "next/image";

interface Props {
    menus: Menu[];
}


const SignUp: NextPage<Props> = ({ menus }) => {

    const { initializeMenus } = useMenus();
    useEffect( () => {
        initializeMenus(menus);
    }, [initializeMenus, menus]);

    const [allAgreed, setAllAgreed] = useState(false);
    const [checkBoxes, setCheckBoxes] = useState({
        policyYn: false,
        privacyYn : false,
    });

    const handleAllAgreeChange = (e) => {
        const isChecked = e.target.checked;
        setAllAgreed(isChecked);
        setCheckBoxes({
            policyYn: isChecked,
            privacyYn: isChecked,
        })
    }

    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setCheckBoxes({
            ...checkBoxes,
            [name]: checked,
        });
    }

    useEffect(() => {
        const allChecked = checkBoxes.policyYn && checkBoxes.privacyYn;
        if (allAgreed !== allChecked) {
            setAllAgreed(allChecked);
        }
    }, [checkBoxes]);

    return (
        <Fragment>
            <main style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
                <form action="post">
                    <table className={styles.signUpTable}>
                        <thead>
                        <tr>
                            <td>
                                <Image
                                    src='/logo.png'
                                    alt='momssi-logo'
                                    width={180}
                                    height={160}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.headline}>
                                <div>
                                    캐치리뷰를 통해 <br />
                                    우리만의 Place 를 만들어나가요!
                                </div>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <input name='username' type="text" placeholder='아이디'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input name='password' type="text" placeholder='비밀번호'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input name='password' type="text" placeholder='비밀번호 확인'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input name='nickname' type="text" placeholder='닉네임'/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={styles.termTable}>
                                    <div className={styles.termHeader}>
                                        <div className={styles.col20}>
                                            <input type="checkbox"
                                                   id="allAgree"
                                                   className={styles.checkBox}
                                                   checked={allAgreed}
                                                   onChange={handleAllAgreeChange}
                                            />
                                        </div>
                                        <label className={styles.checkboxLabel} htmlFor="allAgree">
                                            전체 동의
                                        </label>
                                    </div>
                                    <div className={styles.termBody}>
                                        <div className={styles.line}>
                                            <div className={styles.col20}>
                                                <input type="checkbox"
                                                       name="policyYn"
                                                       className={styles.checkBox}
                                                       checked={checkBoxes.policyYn}
                                                       onChange={handleCheckBoxChange}
                                                />
                                            </div>
                                            <label className={styles.checkboxLabel}>
                                                (필수) 개인회원 약관에 동의
                                            </label>
                                        </div>
                                        <div className={styles.line}>
                                            <div className={styles.col20}>
                                                <input type="checkbox"
                                                       name="privacyYn"
                                                       className={styles.checkBox}
                                                       checked={checkBoxes.privacyYn}
                                                       onChange={handleCheckBoxChange}
                                                />
                                            </div>
                                            <label className={styles.checkboxLabel}>
                                                (필수) 개인정보 수집 및 이용에 동의
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button>회원가입 완료</button>
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

export default SignUp;


export async function getStaticProps() {
    const menus = (await import('../public/menus.json')).default;

    return {
        props: { menus },
    };
}