import React from 'react';
import useSWR from 'swr';
import { MAP_KEY } from '../../hooks/useMap';
import { STORE_KEY } from '../../hooks/useStores';
import type { ImageIcon, NaverMap } from '../../types/map';
import type { Store } from '../../types/store';
import Marker from './Marker';
import useCurrentStore, {CURRENT_STORE_KEY} from "../../hooks/useCurrentStore";

const Markers = () => {
    // useSWR 을 이용하면 전역상태로 데이터를 관리할 수 있음.
    const { data: map } = useSWR<NaverMap>(MAP_KEY);
    const { data: stores } = useSWR<Store[]>(STORE_KEY);

    // 현재 선택한 가게 키를 통해 전역상태 정보 중 현재 가게 정보를 가져온다.
    const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
    const { setCurrentStore, clearCurrentStore } = useCurrentStore();

    // 전역에 저장된 가게정보들을 반복으로 돌려, Marker 를 모두 찍었다.
    if (!map || !stores) return null;
    return (
        <>
            {stores.map((store) => {
                return (
                    <Marker
                        map={map}
                        coordinates={store.coordinates}
                        icon={generateStoreMarkerIcon(store.season, false)}
                        onClick={() => {
                            setCurrentStore(store);
                        }}
                        key={store.nid}
                    />
                );
            })}
            {currentStore && (
                <Marker
                    map={map}
                    coordinates={currentStore.coordinates}
                    icon={generateStoreMarkerIcon(currentStore.season, true)}
                    onClick={clearCurrentStore}
                    key={currentStore.nid}
                />
            )}
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

export function generateStoreMarkerIcon(
    markerIndex: number,
    isSelected: boolean
): ImageIcon {

    /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
    // url 은 marker 이미지 url
    // 현재 markers 이미지는 스프라이트 이미지로 각 marker 의 넓이, 높이만큼 짜를 수 있음
    // size 는 하나의 마커의 size
    return {
        url: isSelected ? 'images/markers-selected.png' : 'images/markers.png',
        // @ts-ignore
        size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
        // @ts-ignore
        origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
        // @ts-ignore
        scaledSize: new naver.maps.Size(
            SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
            SCALED_MARKER_HEIGHT
        ),
    };
}
