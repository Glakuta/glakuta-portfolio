import React from 'react'
import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Preload, OrbitControls} from '@react-three/drei'
import Loader from '../StarsCanvas'

interface Props {
  isMobile? : boolean
}

const Computers = ({ isMobile, ...props }: Props) => {
  const computer = useGLTF("../desktop_pc/scene.gltf", true)
  return (
    <mesh>
      <hemisphereLight intensity={0.25} groundColor="black" />
      <pointLight intensity={0.2} />
      <primitive 
      object={computer.scene}
      scale={isMobile ?0.7 :0.75}
      position={isMobile ? [0, -3, -2.2] :[0, -3.25, -1.5]}
      rotation={[-0.01, -0.2, -0,1]} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      
    </mesh>
  )

  
}

const ComputerCanvas = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: { matches: any }) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return(
    <Canvas
    frameloop='demand'
    shadows
    dpr={[1, 2]}
    camera={{ position: [20, 3, 5], fov: 25 }}
    gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls 
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}  />
        <Computers isMobile={isMobile} />

      </Suspense>
      <Preload all />

    </Canvas>
  )
}

export default ComputerCanvas