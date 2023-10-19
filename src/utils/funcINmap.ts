
// Import - Import for Map
import Map from 'ol/Map.js';


// Import - Import for Layers and Layers Source
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

// Import - Import for Controls
import ScaleLineControl from 'ol/control/ScaleLine';
import FullScreenControl from 'ol/control/FullScreen';
import { Zoom, Attribution, Rotate, MousePosition, ZoomSlider } from 'ol/control';

// Import - Import for function that creates cordinates
import { createStringXY } from 'ol/coordinate';
import { Box, Button, Typography, IconButton } from '@mui/material';
// icons
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import SwipeRightOutlinedIcon from '@mui/icons-material/SwipeRightOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ZoomOutOutlinedIcon from '@mui/icons-material/ZoomOutOutlined';

import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Feature } from 'ol';
import { Geometry, Point, Polygon } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';





  // func options in map 
  export const cangeLayer = (map: Map,layre: TileLayer<XYZ | OSM>) => {
    map?.setLayers([layre]);
    const view = map!.getView();
    view.setZoom(1)
  };

  export const lessZoom = (map: Map) => {
    const view = map.getView();
    const currentZoom = view.getZoom()
    const newZoom = currentZoom! - 0.5;
    view.setZoom(newZoom);
  }
  export const zoom = (map: Map) => {
    console.log("zoom")
    const view = map.getView()
    const currentZoom = view.getZoom()
    const newZoom = currentZoom! + 1;
    view.setZoom(newZoom)
  }

  export const rotateRight = (map: Map) => {
    const view = map.getView();
    const currentRotation = view.getRotation();
    const newRotation = currentRotation + Math.PI / 6;
    view.setRotation(newRotation);
  };

  export const originalCenter = (map: Map) => {
    const view = map.getView();
    const currentCenter = view.getCenter();
    const newCenter = [0, 0];
    view.setCenter(newCenter);
    view.setZoom(3)
  };

  export const changeCenterToJeroslem = (map: Map) => {
    const view = map.getView();
    const currentCenter = view.getCenter();
    const newCenter = [35.2343, 31.7768];
    view.setCenter(newCenter);
    view.setZoom(15)
  };

  // show coordinate by click on the map
  export const coordinateClicked = ( VectorSource: VectorSource, coordinate: number[], srcIcon : string) => {
      const feature = new Feature({
          geometry: new Point(coordinate)
        });

        feature.setId(`${coordinate}`);
        feature.setStyle(new Style({
            image: new Icon({
                src : srcIcon,
                width : 40,
                height : 40
            })
        }))
        VectorSource.addFeature(feature);  
  }
