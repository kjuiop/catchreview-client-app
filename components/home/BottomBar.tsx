import styles from '../../styles/home/bottom.module.scss';
import {
    IoBookOutline,
    IoBookSharp,
    IoEarthOutline,
    IoEarthSharp,
    IoPersonOutline,
    IoPersonSharp
} from "react-icons/io5";
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
                                    {menu.nid === 1 ? <ChurchIcon selected={isSelected} /> : null}
                                    {menu.nid === 2 ? <QuiteTimeIcon selected={isSelected} /> : null}
                                    {menu.nid === 3 ? <MemberIcon selected={isSelected} /> : null}
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

const ChurchIcon = ({ selected }: Props) => {
    return (
        <>
            {selected ? <IoEarthSharp size={20} /> :  <IoEarthOutline size={20} />}
        </>
    );
}

const QuiteTimeIcon = ({ selected }: Props) => {
    return (
        <>
            {selected ? <IoBookSharp size={20} /> :  <IoBookOutline size={20} />}
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
