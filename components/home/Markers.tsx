import React from 'react';
import useSWR from 'swr';
import { MAP_KEY } from '../../hooks/useMap';
import { STORE_KEY } from '../../hooks/useStores';
import type { ImageIcon, NaverMap } from '../../types/map';
import type { Store } from '../../types/store';
import Marker from './Marker';

const Markers = () => {
    // useSWR 을 이용하면 전역상태로 데이터를 관리할 수 있음.
    const { data: map } = useSWR<NaverMap>(MAP_KEY);
    const { data: stores } = useSWR<Store[]>(STORE_KEY);

    // 전역에 저장된 가게정보들을 반복으로 돌려, Marker 를 모두 찍었다.
    if (!map || !stores) return null;
    return (
        <>
            {stores.map((store) => {
                return (
                    <Marker
                        map={map}
                        coordinates={store.coordinates}
                        icon={generateStoreMarkerIcon(store.season)}
                        key={store.nid}
                    />
                );
            })}
        </>
    );
};
export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(markerIndex: number): ImageIcon {
    /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
    // url 은 marker 이미지 url
    // 현재 markers 이미지는 스프라이트 이미지로 각 marker 의 넓이, 높이만큼 짜를 수 있음
    // size 는 하나의 마커의 size
    // origin 은
    return {
        url: 'images/markers.png',
        size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
        origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
        scaledSize: new naver.maps.Size(
            SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
            SCALED_MARKER_HEIGHT
        ),
    };
}
