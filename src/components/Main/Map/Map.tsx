import { Wrapper, Status } from "@googlemaps/react-wrapper"
import React, { ReactElement, useRef, useEffect, useState } from 'react'
import s from './Map.module.css'
import { useSelector } from 'react-redux'
import { AppStateType } from "../../../redux/store"
import { RestaurantsType } from "../../../types/types"

const render = (status: Status): ReactElement => {
    if (status === Status.FAILURE) return <div>Error...</div>;
    return <div>Loading...</div>;
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
            {//@ts-ignore
                <div ref={ref} id="map" className={s.main} />
            }
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    //@ts-ignore
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
    //@ts-ignore
}
const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();
    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker({
                position: { lat: 40.736218, lng: -73.99597 },
            }));
        }

        // remove marker from map on unmount
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
    const filteredRestaurants = useSelector<AppStateType, Array<RestaurantsType>>(state => state.main.filteredRestaurants)
    const center = useSelector<AppStateType, { lat: number, lng: number }>(state => state.main.mapCenter)
    const zoom = 12;
    /*     const handler = (rest: RestaurantsType) => {
            //@ts-ignore
            console.log(rest)
        } */
    return (
        //@ts-ignore
        <Wrapper className={s.wrapper} apiKey={process.env.REACT_APP_API_GOOGLE_KEY} render={render}>
            <MyMapComponent center={center} zoom={zoom}>
                {//@ts-ignore
                    filteredRestaurants.length > 0 ? filteredRestaurants.map((rest, index) => <Marker key={rest.id} title={index + 1 + ') ' + rest.name} position={Object.values(rest.coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })} />) :
                        //@ts-ignore
                        restaurants.length > 0 ? restaurants.map((rest, index) => <Marker title={index + 1 + ') ' + rest.name} key={rest.id} position={Object.values(rest.coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })} />) : ''}
            </MyMapComponent>
        </Wrapper>
    );
}

//onMouseEnter={() => { handler(rest) }}

export default Map;