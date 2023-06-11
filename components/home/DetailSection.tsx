import styles from '../../styles/detail.module.scss';
import { IoIosArrowUp } from 'react-icons/io';
import useSWR from "swr";
import {CURRENT_STORE_KEY} from "../../hooks/useCurrentStore";
import {useState} from "react";
import DetailHeader from './DetailHeader';
import DetailContent from '../home/DetailContent'

const DetailSection = () => {
    const { data: currentStore } = useSWR(CURRENT_STORE_KEY);
    const [ expanded, setExpanded ] = useState(false);

    return (
        <div
            className={`${styles.detailSection} ${expanded ? styles.expanded : ''} ${
                currentStore ? styles.selected : ''
            }`}
        >
            <DetailHeader
                currentStore={currentStore}
                expanded={expanded}
                onClickArrow={() => setExpanded(!expanded)}
            />
            <DetailContent currentStore={currentStore} expanded={expanded} />
        </div>
    );
};
export default DetailSection;
