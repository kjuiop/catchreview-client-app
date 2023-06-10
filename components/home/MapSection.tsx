import Map from './Map';
import useMap from '../../hooks/useMap';
import type { NaverMap } from '../../types/map'
import Markers from './Markers'

const MapSection = () => {
    const { initializeMap } = useMap();
    const onLoadMap = (map: NaverMap) => {
        initializeMap(map);
    };

    return (
        <>
            <Map onLoad={onLoadMap}/>
            <Markers />
        </>
    );
};
export default MapSection;
