'use client'
import React, { useEffect, useRef, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Searchbar from "@utils/Searchbar";


mapboxgl.accessToken = 'pk.eyJ1IjoiZ29sZGlubm92YXRpb24iLCJhIjoiY2xvMzJudnpnMTU3ZzJxcGpxMG11YTJ6dSJ9.GoXKnsdFdh9BPaeibt2FUA';





const Mapgl = () => {
    
    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng, setLng] = useState(-70.9)
    const [lat, setLat] = useState(42.35)
    const [zoom, setZoom] = useState(1)

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        projection:"globe",
        style:'mapbox://styles/goldinnovation/clo36mq5l00j301qv65f5h0d7',
        center: [lng, lat],
        zoom: zoom
        });
         
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });
        });
  return (
    <div>
          <Searchbar/>
       <div>
       <div ref={mapContainer} className="map-container" />
       </div>
            
      
    </div>
  )
}

export default Mapgl
