import {cangeLayer }from '../utils/funcINmap'


import { Button, Paper } from '@mui/material'
import { Map } from 'ol';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import React from 'react';



  // arry of map (layers . tile)  
  export const Layers = [
    {
      name: "OSM-d",
      source: new OSM({
      }),
    },
    {
      name: "XYZ-d",
      source: new XYZ({
        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
      }),
    },
    {
      name: "roadmap",
      source: new XYZ({
        url: "http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      }),
    },
    {
      name: "satellite",
      source: new XYZ({
        url: "http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      }),
    },
    {
      name: "terrain",
      source: new XYZ({
        url: "http://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}",
      }),
    },
    {
      name: "hybrid",
      source: new XYZ({
        url: "http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
      }),
    },
    {
      name: "hybrid2",
      source: new XYZ({
        url: "http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      }),
    },
    {
      name: "roadNames",
      source: new XYZ({
        url: "http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}",
      }),
    },
    {
      name: "onlyRoads",
      source: new XYZ({
        url: "http://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
      }),
    },
  ];

type Props = {
    map : Map
}

const LayersANDbtns = (props: Props) => {
  return (
    <Paper sx={{
        m: '3px', maxWidth: '210px' ,display: 'flex', flexWrap: 'wrap',justifyContent: 'space-around'
        }} elevation={12}>
       {Layers.map((layer) => (
         <Button sx={{
           p: '3px', m: '3px', 
         }} variant='outlined' key={layer.name} 
         onClick={() => cangeLayer(props.map, layer.source)}>
           {layer.name} 
         </Button>
       ))}
     </Paper>
  )
}

export default LayersANDbtns