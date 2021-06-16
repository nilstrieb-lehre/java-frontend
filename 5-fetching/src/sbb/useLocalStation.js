import {useEffect, useState} from "react"; /*corsin*/
/*corsin*/
const useLocalStation = () => {/*corsin*/
    const [location, setLocation] = useState(null);/*corsin*/
    const [allowed, setAllowed] = useState(true);/*corsin*/
    /*corsin*/
    useEffect(() => {/*corsin*/
        navigator.geolocation.getCurrentPosition(pos => {/*corsin*/
            fetch(`http://transport.opendata.ch/v1/locations?x=${pos.coords.latitude}&y=${pos.coords.longitude}&type=station`)/*corsin*/
                .then(response => response.json())/*corsin*/
                .then(data => {/*corsin*/
                    if (data.stations) {/*corsin*/
                        setLocation(data.stations.filter(s => s.id)[0]);/*corsin*/
                    }/*corsin*/
                })/*corsin*/
                .catch(() => {/*corsin*/
                })/*corsin*/
        }, () => setAllowed(false));/*corsin*/
    }, [allowed]);/*corsin*/
    /*corsin*/
    return location;/*corsin*/
}/*corsin*/
/*corsin*/
export default useLocalStation;/*corsin*/