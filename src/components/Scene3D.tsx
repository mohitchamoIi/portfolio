import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface FloatingObjectProps {
  position: [number, number, number]
  scale: number
  speed: number
  color: string
  shape: 'box' | 'sphere' | 'torus'
}

function FloatingObject({ position, scale, speed, color, shape }: FloatingObjectProps) {
  const ref = useRef<THREE.Mesh>(null)
  const initialPosition = useRef(position)
  const mousePosition = useRef({ x: 0, y: 0 })

  // Update mouse position
  if (typeof window !== 'undefined') {
    document.addEventListener('mousemove', (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    })
  }

  useFrame(({ clock }) => {
    if (!ref.current) return
    const time = clock.getElapsedTime() * speed

    // Floating motion
    ref.current.position.y = initialPosition.current[1] + Math.sin(time) * 1.5

    // Rotation
    ref.current.rotation.x += 0.002
    ref.current.rotation.y += 0.003

    // Mouse parallax (subtle)
    ref.current.position.x = initialPosition.current[0] + mousePosition.current.x * 0.3
    ref.current.position.z = initialPosition.current[2] + mousePosition.current.y * 0.3
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
      {shape === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
      {shape === 'torus' && <torusGeometry args={[1, 0.4, 16, 32]} />}
      <meshStandardMaterial
        color={color}
        wireframe={false}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#007BFF" />

      {/* Floating objects */}
      <FloatingObject
        position={[-3, 2, 0]}
        scale={0.8}
        speed={0.5}
        color="#007BFF"
        shape="box"
      />
      <FloatingObject
        position={[3, -1, -2]}
        scale={1}
        speed={0.3}
        color="#3B82F6"
        shape="sphere"
      />
      <FloatingObject
        position={[0, 3, -1]}
        scale={0.6}
        speed={0.4}
        color="#007BFF"
        shape="torus"
      />
      <FloatingObject
        position={[-2, -2, -2]}
        scale={0.7}
        speed={0.35}
        color="#3B82F6"
        shape="box"
      />
      <FloatingObject
        position={[2, 1, -3]}
        scale={0.9}
        speed={0.45}
        color="#007BFF"
        shape="sphere"
      />
    </>
  )
}

interface Scene3DProps {
  className?: string
}

export default function Scene3D({ className = '' }: Scene3DProps) {
  return (
    <div className={`w-full h-96 md:h-[500px] rounded-2xl overflow-hidden border border-accent/10 ${className}`}>
      <Suspense fallback={<div className="w-full h-full bg-surface" />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  )
}
