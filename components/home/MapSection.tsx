import Map from './Map';
import useMap from '../../hooks/useMap';
import type { NaverMap } from '../../types/map'
import Markers from './Markers'
import useCurrentStore from "../../hooks/useCurrentStore";

const MapSection = () => {
    const { initializeMap } = useMap();
    const { clearCurrentStore } = useCurrentStore();


    const onLoadMap = (map: NaverMap) => {
        initializeMap(map);
        naver.maps.Event.addListener(map, 'click', clearCurrentStore);
    };

    return (
        <>
            <Map onLoad={onLoadMap}/>
            <Markers />
        </>
    );
};
export default MapSection;
