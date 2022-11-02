import { Wrapper, Status } from "@googlemaps/react-wrapper"
import React, { ReactElement, useRef, useEffect, useState } from 'react'
import s from './Map.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from "../../../redux/store"
import { RestaurantsType } from "../../../types/types"
import MapLoader from './MapLoader/MapLoader';
import { actions } from "../../../redux/mainReducer"

const render = (status: Status): ReactElement => {
    if (status === Status.FAILURE) return <div>Error...</div>;
    return <MapLoader />;
};

function MyMapComponent({
    center,
    zoom,
    children
}: {
    center: google.maps.LatLngLiteral;
    zoom: number;
    children: any
}) {
    const isList = useSelector<AppStateType, boolean>(state => state.main.isList)
    const trueCenter = useSelector<AppStateType, { lat: number, lng: number }>(state => state.main.mapCenter)
    const ref = useRef();
    const [map, setMap] = React.useState<google.maps.Map>();
    useEffect(() => {
        //@ts-ignore
        setMap(new window.google.maps.Map(ref.current, {
            center,
            zoom,
        }))
    }, [ref, trueCenter]);
    return (
        <>
            {
                //@ts-ignore
                <div ref={ref} id="map" className={isList ? `${s.main}` : `${s.mainActive}`} />
            }
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    //@ts-ignore
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
}
const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();
    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker({
                position: { lat: 40.736218, lng: -73.99597 },
            }));
        }
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};
function Map() {
    const restaurants = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.restaurants)
    const center = useSelector<AppStateType, { lat: number, lng: number }>(state => state.main.mapCenter)
    const isFetching = useSelector<AppStateType, boolean>(state => state.main.isFetching)
    const zoom = 12;
    const dispatch = useDispatch()
    const clickHandler = (isList: boolean) => {
        dispatch(actions.isListAC(isList))
    }
    return (
        <>
            {isFetching ? <MapLoader /> :
                //@ts-ignore
                <Wrapper className={s.wrapper} apiKey={process.env.REACT_APP_API_GOOGLE_KEY} render={render}>
                    <MyMapComponent center={center} zoom={zoom}>
                        {//@ts-ignore
                            restaurants.length > 0 ? restaurants.map((rest, index) => <Marker title={index + 1 + ') ' + rest.name} key={rest.id} position={Object.values(rest.coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })} />) : ''}
                    </MyMapComponent>
                </Wrapper>
            }
        </>
    );
}

//onMouseEnter={() => { handler(rest) }}

export default Map;