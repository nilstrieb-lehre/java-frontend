import {useEffect, useState} from "react";

const useLocalStation = () => {
    const [location, setLocation] = useState(null);
    const [allowed, setAllowed] = useState(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            fetch(`http://transport.opendata.ch/v1/locations?x=${pos.coords.latitude}&y=${pos.coords.longitude}&type=station`)
                .then(response => response.json())
                .then(data => {
                    if (data.stations) {
                        setLocation(data.stations.filter(s => s.id)[0]);
                    }
                })
                .catch(() => {
                })
        }, () => setAllowed(false));
    }, [allowed]);

    return location;
}

export default useLocalStation;