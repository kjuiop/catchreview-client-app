import Map from './Map';
import useMap, {INITIAL_CENTER, INITIAL_ZOOM} from '../../hooks/useMap';
import type { NaverMap } from '../../types/map'
import Markers from './Markers'
import useCurrentStore from "../../hooks/useCurrentStore";
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {Coordinates} from "../../types/store";
import ignore from "ignore";

const MapSection = () => {
    // initial zoom, center from url query
    const router = useRouter();
    const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []);

    const initialZoom = useMemo(
        () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
        [query]
    );

    const initialCenter = useMemo<Coordinates>(
        () =>
            query.get('lat') && query.get('lng')
                ?   [Number(query.get('lat')), Number(query.get('lng'))]
                : INITIAL_CENTER,
            [query]
    );

    /** onLoadMap **/
    const { initializeMap } = useMap();
    const { clearCurrentStore } = useCurrentStore();
    const onLoadMap = (map: NaverMap) => {
        initializeMap(map);
        // @ts-ignore
        naver.maps.Event.addListener(map, 'click', clearCurrentStore);
    };

    return (
        <>
            <Map
                onLoad={onLoadMap}
                initialCenter={initialCenter}
                initialZoom={initialZoom}
            />
            <Markers />
        </>
    );
};
export default MapSection;
