import { useEffect } from 'react';
import type { Marker } from '../../types/map';

const Marker = ({ map, coordinates, icon, onClick }: Marker): null => {
    // Marker 는 map 과 coordinates 를 필수 갑승로 갖는다.
    useEffect(() => {
        let marker: naver.maps.Marker | null = null;
        if (map) {
            // map 이 있다면 Naver API 를 통해 marker 를 생성한다.
            /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Marker.html */
            marker = new naver.maps.Marker({
                map: map,
                position: new naver.maps.LatLng(...coordinates),
                icon,
            });
        }

        // onClick 이벤트가 발생할 경우 네이버의 addListener 함수를 실행시킨다.
        if (onClick) {
            naver.maps.Event.addListener(marker, 'click', onClick);
        }

        return () => {
            marker?.setMap(null);
        };
    }, [map]); // eslint-disable-line react-hooks/exhaustive-deps

    return null;
};

export default Marker;
