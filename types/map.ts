// @ts-ignore
export type NaverMap = naver.maps.Map;

import type { Coordinates } from './store';

export type Marker = {
    map: NaverMap;
    coordinates: Coordinates;
    icon: ImageIcon;
    onClick?: () => void;
};

export type ImageIcon = {
    url: string;
    // @ts-ignore
    size: naver.maps.Size;
    // @ts-ignore
    origin: naver.maps.Point;
    // @ts-ignore
    scaledSize?: naver.maps.Size;
};
