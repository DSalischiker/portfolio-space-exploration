import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface CameraControllerProps {
  speed?: number
}

export function CameraController({ speed = 0.2 }: CameraControllerProps) {
  const { camera } = useThree()
  const keysPressed = useRef<Record<string, boolean>>({})
  const velocity = useRef<THREE.Vector3>(new THREE.Vector3())
  const direction = useRef<THREE.Vector3>(new THREE.Vector3())

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    const keys = keysPressed.current

    // Reset direction each frame
    direction.current.setScalar(0)

    // Check input
    if (keys['w'] || keys['arrowup']) direction.current.z -= 1
    if (keys['s'] || keys['arrowdown']) direction.current.z += 1
    if (keys['a'] || keys['arrowleft']) direction.current.x -= 1
    if (keys['d'] || keys['arrowright']) direction.current.x += 1
    if (keys['q']) direction.current.y -= 1
    if (keys['e']) direction.current.y += 1

    // Normalize and apply speed
    if (direction.current.length() > 0) {
      direction.current.normalize().multiplyScalar(speed)
      camera.position.add(direction.current)
    }

    // Smooth damping for velocity
    velocity.current.multiplyScalar(0.95)
  })

  return null
}
