import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Starfield } from './components/Starfield'
import { CameraController } from './components/CameraController'
import { useDevPanel } from './hooks/useDevPanel'
import './App.css'

interface SceneState {
  starCount: number
  starSpeed: number
  cameraSpeed: number
}

function Scene({ state }: { state: SceneState }) {
  return (
    <>
      <color attach="background" args={['#000']} />
      <Starfield count={state.starCount} speed={state.starSpeed} />
      <CameraController speed={state.cameraSpeed} />
      <ambientLight intensity={0.1} />
    </>
  )
}

function App() {
  const [sceneState, setSceneState] = useState<SceneState>({
    starCount: 2000,
    starSpeed: 0.002,
    cameraSpeed: 0.2,
  })

  useDevPanel(sceneState, setSceneState)

  return (
    <div id="canvas-container">
      <Canvas
        camera={{
          position: [0, 0, 50],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{
          width: '100%',
          height: '100vh',
        }}
      >
        <Scene state={sceneState} />
      </Canvas>
    </div>
  )
}

export default App
