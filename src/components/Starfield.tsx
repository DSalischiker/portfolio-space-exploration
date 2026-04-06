import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface StarfieldProps {
  count?: number
  speed?: number
}

export function Starfield({ count = 2000, speed = 0.002 }: StarfieldProps) {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate procedural star positions and colors
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i += 3) {
      // Random positions in a sphere
      const radius = 100
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i + 2] = radius * Math.cos(phi)

      // Color variation: white to slightly blue/warm
      const colorVariation = Math.random()
      colors[i] = 0.8 + colorVariation * 0.2 // R
      colors[i + 1] = 0.8 + colorVariation * 0.2 // G
      colors[i + 2] = 0.9 + colorVariation * 0.1 // B
    }

    return { positions, colors }
  }, [count])

  // Gentle rotation
  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += speed * 0.1
      pointsRef.current.rotation.y += speed
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
      />
    </points>
  )
}
