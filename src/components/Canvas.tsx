'use client'

import React from 'react'
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'

const Canvas = () => {
  return (
    <ShaderGradientCanvas
      importedfiber={{ ...fiber, ...drei, ...reactSpring }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -20,
      }}
    >
      <ShaderGradient
        control='query'
        // urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.1&cAzimuthAngle=250&cDistance=1.5&cPolarAngle=140&cameraZoom=10.6&color1=%23DEA681&color2=%23E7C0A6&color3=%23E7C0A6&embedMode=off&envPreset=city&fov=45&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0.5&rotationX=0&rotationY=0&rotationZ=140&shader=positionMix&toggleAxis=false&type=sphere&uAmplitude=7&uDensity=0.8&uFrequency=5.5&uSpeed=0.1&uStrength=3.4&uTime=0&wireframe=false'
        urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=5&cAzimuthAngle=170&cDistance=4&cPolarAngle=70&cameraZoom=1&color1=%23E7C0A6&color2=%23DEA681&color3=%23E7C0A6&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=40&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=-0.5&positionY=0.9&positionZ=-0.5&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=45&rotationY=0&rotationZ=0&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.2&uFrequency=0&uSpeed=0.2&uStrength=3.4&uTime=0&wireframe=false'
      />
    </ShaderGradientCanvas>
  )
}

export default Canvas