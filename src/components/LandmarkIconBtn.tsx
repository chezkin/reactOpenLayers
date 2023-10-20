

import { IconButton, Paper } from '@mui/material'
import React from 'react'

const landmarkIcons = [
    '../../public/Pin.svg',
    '../../public/boom.svg',
    '../../public/cuty.svg',
    '../../public/kipt.svg',
    '../../public/kiptt.svg',
    '../../public/location.svg',   
    '../../public/pin.svg',
    '../../public/racet.svg',
    '../../public/red.svg',
    '../../public/redlooc.svg',
    '../../public/wor.svg',
]

type Props = {
    refrens:  React.MutableRefObject<string>
}

const LandmarkIconBtn = (props: Props) => {
    const refrens = props.refrens
  return (
    <Paper sx={{
        m: '3px', maxWidth: '210px' ,display: 'flex', flexWrap: 'wrap',justifyContent: 'space-around'
        }} elevation={12}>
            {landmarkIcons.map(landmarkIcon => 
            <IconButton sx={{ width: '43px', height: '43px' }} onClick={() => { refrens.current = landmarkIcon }}>
            <img width='100%' src={landmarkIcon} alt='landmark Icon' />
          </IconButton>
                )}
        </Paper>
  )
}

export default LandmarkIconBtn