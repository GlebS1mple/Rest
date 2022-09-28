import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Marker } from "@react-google-maps/api";
import React, { ReactElement, useRef, useEffect } from 'react';
import s from './Map.module.css'

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
    useEffect(() => {
        //@ts-ignore
        new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });
    }, [ref]);
    //@ts-ignore
    return <div ref={ref} id="map" className={s.main} />;
}
/* const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
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
}; */
function Map() {
    const center = { lat: 52, lng: 23 };
    const zoom = 10;

    return (
        //@ts-ignore
        <Wrapper className={s.wrapper} apiKey={process.env.REACT_APP_API_GOOGLE_KEY} render={render}>
            <MyMapComponent center={center} zoom={zoom}>
                <Marker position={{ lat: 52, lng: 23 }} />
            </MyMapComponent>

        </Wrapper>
    );
}
export default Map;