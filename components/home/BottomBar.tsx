import styles from '../../styles/home/bottom.module.scss';
import {
    IoStorefrontSharp,
    IoStorefrontOutline,
    IoPawSharp,
    IoPawOutline,
    IoPersonOutline,
    IoPersonSharp
} from "react-icons/io5";
import Link from 'next/link';
import {useState} from "react";
import {MENU_KEY} from "../../hooks/menu/useMenus";
import useSWR from "swr";
import {Menu} from "../../types/menu";

interface Props {
    selected?: boolean;
}

const BottomBar = () => {

    const { data: menus } = useSWR<Menu[]>(MENU_KEY)
    const [currentMenuId, setCurrentMenuId] = useState(1)
    console.log(menus)

    if (!menus) return  null;
    return (
        <>
            <div className={styles.bottomSection}>
                <div className={styles.menus}>
                    {
                        menus.map((menu) => {
                            let isSelected = currentMenuId === menu.nid;

                            return (
                                <div
                                    key={menu.nid}
                                    className={`${styles.menu} ${styles.center}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentMenuId(menu.nid);
                                    }}
                                >
                                    {menu.nid === 1 ? <Link href={menu.url}><StoreIcon selected={isSelected} /></Link> : null}
                                    {menu.nid === 2 ? <Link href={menu.url}><ReviewIcon selected={isSelected} /></Link> : null}
                                    {menu.nid === 3 ? <Link href={menu.url}><MemberIcon selected={isSelected} /></Link> : null}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};
export default BottomBar;

const StoreIcon = ({ selected }: Props) => {
    return (
        <>
            {selected ? <IoStorefrontSharp size={20} /> :  <IoStorefrontOutline size={20} />}
        </>
    );
}

const ReviewIcon = ({ selected }: Props) => {
    return (
        <>
            {selected ? <IoPawSharp size={20} /> :  <IoPawOutline size={20} />}
        </>
    );
}

const MemberIcon = ({ selected }: Props) => {
    return (
        <>
            {selected ? <IoPersonSharp size={20} /> :  <IoPersonOutline size={20} />}
        </>
    );
}
