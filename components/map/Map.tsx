import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
import { Coordinates } from '../../types/store';
import { NaverMap } from '../../types/map';
import { INITIAL_CENTER, INITIAL_ZOOM } from '../../hooks/map/useMap';
import styles from '../../styles/map/map.module.scss';

type Props = {
    mapId?: string;
    initialCenter?: Coordinates;
    initialZoom?: number;
    onLoad?: (map: NaverMap) => void;
};

declare global {
    interface Window {
        naver: any;
    }
}

const Map = ({
                 mapId = 'map',
                 initialCenter = INITIAL_CENTER,
                 initialZoom = INITIAL_ZOOM,
                 onLoad,
             }: Props) => {
    const mapRef = useRef<NaverMap | null>(null);

    const initializeMap = () => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(...initialCenter),
            zoom: initialZoom,
            minZoom: 9,
            scaleControl: false,
            mapDataControl: false,
            // logoControlOptions: {
            //     position: window.naver.maps.Position.BOTTOM_LEFT,
            // },
        };

        /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html */
        const map = new window.naver.maps.Map(mapId, mapOptions);
        mapRef.current = map;

        // onLoad 는 스크립트가 로딩되었을 때에만 동작한다.
        if (onLoad) {
            onLoad(map);
        }
    };

    // map 과 마운트가 해제되었을 때에는 해당 요소를 파괴한다.
    useEffect(() => {
        return () => {
            mapRef.current?.destroy();
        };
    }, []);

    // beforeInteractive : 페이지가 로드되기 전부터 화면이 보여야함 / 페이지 전체에 적요되는 중요한 js 경우만 적용
    // afterInteractive : 페이지가 로드되자마자 화면이 보여야 함
    // lazyOnload : 로드가 좀 느려도 괜찮다면
    return (
        <>
            <Script
                strategy="afterInteractive"
                type="text/javascript"
                src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
                onReady={initializeMap}
            />
            <div id={mapId} className={styles.map} />
        </>
    );
};

export default Map;
