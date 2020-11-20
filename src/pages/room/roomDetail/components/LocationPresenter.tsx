import React, { useEffect } from "react";
import {GoogleApiWrapper, Map, Marker}from "google-maps-react";

const LocationPresenter = (props:any) => {
    useEffect(()=>{
        console.log(props.lat, props.lng)
    },[])
    return(
        <div style={{position : "relative"}}>
            <Map google = {window.google}
                initialCenter = {{lat:props.lat,lng:props.lng}}
                zoom = {15}
                style = {{margin : "0 auto", width : "1000px", height : "600px"}}
            >
                <Marker
                    title = {'marker'}
                    position={{lat:props.lat,lng:props.lng}}>
                </Marker>
            </Map>
        </div>    
    );
}

const key = process.env.REACT_APP_GOOGLE_MAP_KEY 

export default GoogleApiWrapper({
    apiKey :  key === undefined? "" :key
})(LocationPresenter);

