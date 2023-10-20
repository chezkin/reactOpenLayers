import { useEffect, useRef, useState } from 'react';



// Import - Import for Map
import Map from 'ol/Map.js';

// Import - Import for View
import View from 'ol/View.js';

// Import - Import for Layers and Layers Source
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { GeoJSON } from 'ol/format';

// Import - Import for Controls
import ScaleLineControl from 'ol/control/ScaleLine';
import FullScreenControl from 'ol/control/FullScreen';
import { Zoom, Attribution, Rotate, MousePosition, ZoomSlider } from 'ol/control';

// Import - Import for function that creates cordinates
import { createStringXY } from 'ol/coordinate';
import { Box, Button, Typography, IconButton, Paper, SvgIcon } from '@mui/material';
// icons
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import NextPlanOutlinedIcon from '@mui/icons-material/NextPlanOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ZoomOutOutlinedIcon from '@mui/icons-material/ZoomOutOutlined';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';

import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'

import * as controlMapFunc from '../utils/funcINmap'
import { Feature } from 'ol';
import { Geometry, Point, Polygon } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { useGeographic } from 'ol/proj';
import VectorImageLayer from 'ol/layer/VectorImage';

  // arry of map (layers . tile)  
import { Layers } from './LayersANDbtns';
import LayersANDbtns from './LayersANDbtns';
import LandmarkIconBtn from './LandmarkIconBtn';



type Props = {}

const MapOpenLayers = (props: Props) => {
  const mapTargetElement = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | undefined>()
  const [layerStateBtn, setLayerStateBtn] = useState<boolean>(false)

  const [IconStateBtn, setIconStateBtn] = useState<boolean>(false);
  const srcIconPath = useRef<string>('../../public/Pin.svg');











  // on hover mouse position
  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
  });


  useEffect(() => {
    
    const initTile = new TileLayer({
      source: Layers[0].source,
      visible: true,
    })
    const feature = new Feature({
      geometry: new Point([35.2343, 31.7768])
    });

    feature.setId('Jerusalem');
    feature.setStyle(new Style({
      image: new Icon({
        src: '../../public/cuty.svg',
        width: 42,
        height: 42,
        color: 'black'
      })
    }))

    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource({
        features: [feature]
      })
    })

    const geoJSONlayer = new VectorImageLayer({
      source: new VectorSource({
        url: '../../public/map.geojson',
        format: new GeoJSON()
      })
    })

    const map = new Map({
      layers: [
        // USGS Topo
        initTile,
        // geoJSONlayer,
        initalFeaturesLayer,
      ],
      controls: [mousePositionControl],
      view: new View({
        projection: 'EPSG:4326',
        center: [35.2343, 31.7768],
        zoom: 6,
        minZoom: 0,
        maxZoom: 22,
      }),
    });
    // useGeographic()
    map.setTarget(mapTargetElement.current!)
    setMap(map)

    map!.on('click', (e) => {
      const coordinate = e.coordinate;
      const source = initalFeaturesLayer.getSource();
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.forEachFeatureAtPixel(pixel, feature => feature);
      hit ?
        source?.removeFeature(hit as Feature<Point>)
        :
        controlMapFunc.coordinateClicked(source!, coordinate, srcIconPath.current)
    });

    return () => map.setTarget("")


  }, []);





  return (
    <Box sx={{ display: 'flex', padding: '' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '9px' }} className='said-bar'>
        {/* <Typography variant='overline'>coordinate: {coordinate[0]} {coordinate[1]}</Typography> */}
        <Box sx={{ display: 'flex' }}>
          <IconButton onClick={() => controlMapFunc.zoom(map!)}><ZoomInOutlinedIcon /></IconButton>
          <IconButton onClick={() => controlMapFunc.lessZoom(map!)}><ZoomOutOutlinedIcon /></IconButton>
          <IconButton onClick={() => controlMapFunc.rotateRight(map!)}><NextPlanOutlinedIcon /></IconButton>
          <IconButton onClick={() => { setLayerStateBtn(!layerStateBtn) }}><LayersOutlinedIcon /></IconButton>
          <IconButton onClick={() => { setIconStateBtn(!IconStateBtn) }}><EditLocationOutlinedIcon /></IconButton>
        </Box>
        {
          layerStateBtn && <LayersANDbtns map={map!} /> 
        }
        {IconStateBtn && <LandmarkIconBtn refrens={srcIconPath} />}

        <Button onClick={() => controlMapFunc.changeCenterToJeroslem(map!)}>change center to Jerusalem</Button>
        <Button onClick={() => controlMapFunc.originalCenter(map!)}>original Center</Button>
      </Box>


      <Box
        // onClick={() => {controlMapFunc.coordinateClicked(map!)}}
        ref={mapTargetElement}
        className="map"
        style={{
          width: "70vw",
          height: "70vh",
          //   position: "relative",
        }} >
      </Box>

    </Box>
  )
}

export default MapOpenLayers








