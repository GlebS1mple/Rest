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
    const trueCenter = useSelector<AppStateType, { lat: number, lng: number }>(state => state.restaurant.center)
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
function Location() {
    const restaurant = useSelector<AppStateType, RestaurantType>(state => state.restaurant.restaurant)
    const center = useSelector<AppStateType, { lat: number, lng: number }>(state => state.restaurant.center)
    const zoom = 16;
    return (
        <div >
            {/*@ts-ignore*/}
            <Wrapper className={s.wrapper} apiKey={process.env.REACT_APP_API_GOOGLE_KEY} render={render}>
                <MyMapComponent center={center} zoom={zoom}>
                    <Marker title={restaurant.name} position={center} />
                </MyMapComponent>
            </Wrapper>
            <div className={s.locationInfo}>
                <div className={s.adress}>
                    {restaurant.location.address1}
                </div>
                <div className={s.city}>
                    {restaurant.location.city},&nbsp;
                    {restaurant.location.state} &nbsp;
                    {restaurant.location.zip_code}
                </div>
                <div className={s.streets}>
                    {restaurant.location.cross_streets}
                </div>
            </div>
        </div>
    );
}

export default Location;