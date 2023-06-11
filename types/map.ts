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
    size: naver.maps.Size;
    origin: naver.maps.Point;
    scaledSize?: naver.maps.Size;
};
