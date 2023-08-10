import {Fragment, useEffect, useState} from 'react';
import styles from '../styles/login/sign-up.module.scss';
import BottomBar from "../components/home/BottomBar";
import {Menu} from "../types/menu";
import {NextPage} from "next";
import useMenus from "../hooks/menu/useMenus";
import Image from "next/image";
import {validateConfig} from "next/dist/server/config-shared";

interface Props {
    menus: Menu[];
}


const SignUp: NextPage<Props> = ({ menus }) => {

    const [email, setEmail] = useState(``)
    const [isValidEmail, setIsValidEmail] = useState(true);
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail)

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsValidEmail(emailRegex.test(newEmail));
    }

    const [nickname, setNickname] = useState('');
    const [isValidNickname, setIsValidNickname] = useState(true);
    const handleNicknameChange = (e) => {
        const newNickname = e.target.value;
        setNickname(newNickname);
        setIsValidNickname(newNickname.length >= 3);
    }

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirmation, setIsValidConfirmation] = useState(true);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword)
        setIsValidPassword(validatePassword(newPassword));
    }

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setIsValidConfirmation(password === newConfirmPassword);
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            return false;
        }

        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);
        return hasNumber && hasLetter;
    }

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
                                <input type="text"
                                       name='username'
                                       value={email}
                                       onChange={handleEmailChange}
                                       className={!isValidEmail ? styles.invalid : ''}
                                       placeholder='이메일'
                                />
                                {isValidEmail ? null : <p className={styles.error}>유효한 이메일 주소를 입력해주세요.</p>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text"
                                       name='nickname'
                                       value={nickname}
                                       onChange={handleNicknameChange}
                                       className={!isValidNickname ? styles.invalid : ''}
                                       placeholder='닉네임'
                                />
                                {!isValidNickname && (
                                    <p className={styles.error}>닉네임은 최소 3자 이상이어야 합니다.</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password"
                                       name='password'
                                       value={password}
                                       onChange={handlePasswordChange}
                                       className={!isValidPassword ? styles.invalid : ''}
                                       placeholder='비밀번호 확인'/>
                                {!isValidPassword && (
                                    <p className={styles.error}>비밀번호는 최소 8자 이상이어야 하며, 숫자와 문자 조합이어야 합니다.</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password"
                                       name='repassword'
                                       value={confirmPassword}
                                       onChange={handleConfirmPasswordChange}
                                       className={!isValidConfirmation ? styles.invalid : ''}
                                       placeholder='비밀번호 확인'
                                />
                                {!isValidConfirmation && (
                                    <p className={styles.error}>비밀번호가 일치하지 않습니다.</p>
                                )}
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