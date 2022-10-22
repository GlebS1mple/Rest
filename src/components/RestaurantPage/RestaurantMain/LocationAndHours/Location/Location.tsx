import React, { ReactElement, useEffect, useRef } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import s from '../Location/Location.module.css'
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../../redux/store';
import { CoordinateType, RestaurantType } from '../../../../../types/types';

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
    const ref = useRef();
    const [map, setMap] = React.useState<google.maps.Map>();
    useEffect(() => {
        //@ts-ignore
        setMap(new window.google.maps.Map(ref.current, {
            center,
            zoom,
        }))
    }, [ref]);
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
function Location() {
    const restaurant = useSelector<AppStateType, RestaurantType>(state => state.restaurant.restaurant)
    const coordinates = useSelector<AppStateType, CoordinateType>(state => state.restaurant.restaurant.coordinates)
    //@ts-ignore
    const center = Object.values(coordinates).reduce(function (prev, curr) { return { lat: prev, lng: curr } })

    const zoom = 16;
    /*     const handler = (rest: RestaurantsType) => {
            //@ts-ignore
            console.log(rest)
        } */
    return (
        //@ts-ignore
        <Wrapper className={s.wrapper} apiKey={process.env.REACT_APP_API_GOOGLE_KEY} render={render}>
            {/*@ts-ignore */}
            <MyMapComponent center={center ? center : { lat: 0, lng: 0 }} zoom={zoom}>
                {/*@ts-ignore */}
                <Marker title={restaurant.name} position={center ? center : { lat: 0, lng: 0 }} />
            </MyMapComponent>
        </Wrapper>
    );
}

//onMouseEnter={() => { handler(rest) }}

export default Location;