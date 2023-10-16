import { useEffect, useRef, useState } from 'react';


// Import - Import for Map
import Map from 'ol/Map.js';

// Import - Import for View
import View from 'ol/View.js';

// Import - Import for Layers and Layers Source
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

// Import - Import for Controls
import ScaleLineControl from 'ol/control/ScaleLine';
import FullScreenControl from 'ol/control/FullScreen';
import { Zoom, Attribution, Rotate, MousePosition, ZoomSlider } from 'ol/control';

// Import - Import for function that creates cordinates
import { createStringXY } from 'ol/coordinate';
import { Box, Button } from '@mui/material';

import { transform } from 'ol/proj';


type Props = {}

const MyMap = (props: Props) => {
  const mapTargetElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | undefined>()

  const rotateControl = new Rotate();
  const zoomSliderControl = new ZoomSlider();
  const scaleLineControl = new ScaleLineControl();
  const fullScreenControl = new FullScreenControl();
  const attrControl = new Attribution()
  const zoomControl = new Zoom({})
  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:3857',
    className: 'custom-mouse-position',
  });

  useEffect(() => {
    const originalCoords = [35.2353, 31.7785]; 
    const newCoords = transform(originalCoords, 'EPSG:4326', 'EPSG:3857');

    console.log(newCoords);
    
    const map = new Map({
      layers: [
        new TileLayer({ source: new OSM() }),
      ],
      controls: [mousePositionControl],
      view: new View({
        center: [newCoords[0], newCoords[1]],
        zoom: 7,
        minZoom: 0,
        maxZoom: 20,
      }),
    })
    map.setTarget(mapTargetElement.current || "")
    setMap(map)
    return () => map.setTarget("")
  }, []);
  // 34.7716, 32.4951
  const lessZoom = (map: Map) => {
    const view = map.getView();
    const currentZoom = view.getZoom()
    const newZoom = currentZoom! - 0.5;
    view.setZoom(newZoom);
  }
  const zoom = (map: Map) => {
    console.log("zoom")
    const view = map.getView()
    const currentZoom = view.getZoom()
    const newZoom = currentZoom! + 1;
    view.setZoom(newZoom)
  }

  const increaseResolution = (map: Map) => {
    const view = map.getView();
    const currentResolution = view.getResolution();
    const newResolution = currentResolution! / 2;
    view.setResolution(newResolution);
  };

  const decreaseResolution = (map: Map) => {
    const view = map.getView();
    const currentResolution = view.getResolution();
    const newResolution = currentResolution! * 2;
    view.setResolution(newResolution);
  };

  const rotateLeft = (map: Map) => {
    const view = map.getView();
    const currentRotation = view.getRotation();
    const newRotation = currentRotation - Math.PI / 6;
    view.setRotation(newRotation);
  };

  const rotateRight = (map: Map) => {
    const view = map.getView();
    const currentRotation = view.getRotation();
    const newRotation = currentRotation + Math.PI / 6;
    view.setRotation(newRotation);
  };

  const originalCenter = (map: Map) => {
    const view = map.getView();
    const currentCenter = view.getCenter();
    const newCenter = [0, 0];
    view.setCenter(newCenter);
  };

  const changeCenter = (map: Map) => {
    const view = map.getView();
    const currentCenter = view.getCenter();
    const newCenter = [-10725196.690349146, 5635012.033203788];
    view.setCenter(newCenter);
  };


  return (
    <>
      <Box
        ref={mapTargetElement}
        className="map"
        style={{
          width: "100%",
          height: "400px",
          //   position: "relative",
        }} >
      </Box>
      <Box>
        <Button onClick={() => lessZoom(map!)}>lessZoom</Button>
        <Button onClick={() => zoom(map!)}>zoom</Button>
        <Button onClick={() => increaseResolution(map!)}>increaseResolution</Button>
        <Button onClick={() => decreaseResolution(map!)}>decreaseResolution</Button>
        <Button onClick={() => rotateRight(map!)}>rotateRight</Button>
        <Button onClick={() => rotateLeft(map!)}>rotateLeft</Button>
        <Button onClick={() => changeCenter(map!)}>changeCenter</Button>
        <Button onClick={() => originalCenter(map!)}>originalCenter</Button>
      </Box>
    </>
  )
}

export default MyMap