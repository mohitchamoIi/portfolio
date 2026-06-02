import {
  Suspense,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  useGLTF,
  useScroll,
  ScrollControls,
  Environment,
  Merged,
  Text,
  MeshReflectorMaterial,
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, type Project } from '../data/projects'

function Train({
  hoveredId,
  setHoveredId,
  selectedId,
  setSelectedId,
}: {
  hoveredId: number | null
  setHoveredId: (id: number | null) => void
  selectedId: number | null
  setSelectedId: (id: number | null) => void
}) {
  const ref = useRef<THREE.Group>(null)
  const scroll = useScroll()
  const [cabin, seat] = useGLTF([
    '/portfolio/models/project-carriage.glb',
    '/portfolio/models/seat.glb',
  ])
  const { camera } = useThree()

  const meshes = useMemo(
    () => ({
      Cabin: cabin.nodes.cabin_1 as any,
      Seat: seat.nodes.seat as any,
    }),
    [cabin, seat]
  )

  const targetCameraPos = useRef(new THREE.Vector3(-10, 6, 12))
  const targetCameraLookAt = useRef(new THREE.Vector3(0, 2, 0))

  useFrame((_, delta) => {
    if (ref.current) {
      if (!selectedId) {
        ref.current.position.z = scroll.offset * projects.length * 28
      }
    }

    // Smooth camera interpolation
    camera.position.lerp(targetCameraPos.current, 0.08)
    camera.lookAt(targetCameraLookAt.current)
  })

  useEffect(() => {
    if (selectedId !== null) {
      const selectedIndex = projects.findIndex((p) => p.id === selectedId)
      if (selectedIndex !== -1) {
        // Position camera closer to selected carriage
        targetCameraPos.current.set(
          -5 + selectedIndex * 1.5,
          4.5,
          8 - selectedIndex * 28
        )
        targetCameraLookAt.current.set(0, 2, -selectedIndex * 28)
      }
    } else {
      // Reset camera to immersive lower angle
      targetCameraPos.current.set(-10, 6, 12)
      targetCameraLookAt.current.set(0, 2, 0)
    }
  }, [selectedId])

  return (
    <Merged castShadow receiveShadow meshes={meshes}>
      {(models) => (
        <group ref={ref}>
          {projects.map((project, i) => (
            <Cabin
              key={project.id}
              models={models}
              color={i % 2 === 0 ? '#252525' : '#454545'}
              seatColor="lightskyblue"
              project={project}
              position={[0, 0, -i * 28]}
              isHovered={hoveredId === project.id}
              isSelected={selectedId === project.id}
              onHover={() => setHoveredId(project.id)}
              onHoverOut={() => setHoveredId(null)}
              onClick={() => {
                if (selectedId === project.id) {
                  setSelectedId(null)
                } else {
                  setSelectedId(project.id)
                }
              }}
              scale={project.featured ? 1.1 : 1}
            />
          ))}
        </group>
      )}
    </Merged>
  )
}

const Quarter = ({
  models,
  color,
  ...props
}: {
  models: any
  color: string
  [key: string]: any
}) => (
  <group {...props}>
    <models.Seat color={color} position={[-0.35, 0, 0.7]} />
    <models.Seat color={color} position={[0.35, 0, 0.7]} />
    <models.Seat color={color} position={[-0.35, 0, -0.7]} rotation={[0, Math.PI, 0]} />
    <models.Seat color={color} position={[0.35, 0, -0.7]} rotation={[0, Math.PI, 0]} />
  </group>
)

const Row = ({
  models,
  color,
  ...props
}: {
  models: any
  color: string
  [key: string]: any
}) => (
  <group {...props}>
    <Quarter models={models} color={color} position={[-1.2, -0.45, 9.75]} />
    <Quarter models={models} color={color} position={[1.2, -0.45, 9.75]} />
  </group>
)

const Cabin = ({
  models,
  color = 'white',
  seatColor = 'white',
  project,
  isHovered,
  isSelected,
  onHover,
  onHoverOut,
  onClick,
  scale = 1,
  ...props
}: {
  models: any
  color: string
  seatColor: string
  project: Project
  isHovered: boolean
  isSelected: boolean
  onHover: () => void
  onHoverOut: () => void
  onClick: () => void
  scale: number
  [key: string]: any
}) => {
  const groupRef = useRef<THREE.Group>(null)
  const localScale = (isHovered || isSelected ? 1.05 : 1) * scale

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Subtle train vibration
      groupRef.current.position.y = (isHovered || isSelected
        ? Math.sin(Date.now() * 0.002) * 0.015
        : Math.sin(Date.now() * 0.001) * 0.008)
    }
  })

  return (
    <group
      ref={groupRef}
      {...props}
      scale={[localScale, localScale, localScale]}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        onHoverOut()
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {/* Glow effect when hovered/selected */}
      {(isHovered || isSelected) && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[project.featured ? 9 : 8, project.featured ? 9 : 8, project.featured ? 14 : 12]} />
          <meshBasicMaterial
            color={project.featured ? '#4a9eff' : '#73baff'}
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Subtle project branding on carriage side */}
      <group position={[2.8, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <Text
          fontSize={0.4}
          color={isHovered || isSelected ? '#ffffff' : (project.featured ? '#9ecfff' : '#73baff')}
          anchorX="center"
          anchorY="middle"
        >
          {project.name}
        </Text>
        <Text
          fontSize={0.16}
          color={isHovered || isSelected ? '#cfe6ff' : '#a0aec0'}
          position={[0, -0.35, 0]}
          anchorX="center"
          anchorY="middle"
        >
          {project.category}
        </Text>
      </group>

      <models.Cabin color={color} />
      <Row models={models} color={seatColor} />
      <Row models={models} color={seatColor} position={[0, 0, -1.9]} />
      <Row models={models} color={seatColor} position={[0, 0, -6.6]} />
      <Row models={models} color={seatColor} position={[0, 0, -8.5]} />
      <Row models={models} color={seatColor} position={[0, 0, -11]} />
      <Row models={models} color={seatColor} position={[0, 0, -12.9]} />
      <Row models={models} color={seatColor} position={[0, 0, -17.6]} />
      <Row models={models} color={seatColor} position={[0, 0, -19.5]} />
    </group>
  )
}

export default function TrainProjects() {
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedId),
    [selectedId]
  )
  const hoveredProject = useMemo(
    () => projects.find((p) => p.id === hoveredId),
    [hoveredId]
  )

  // Fake loading for skeleton screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <section className="relative h-[100vh] bg-gradient-to-b from-bg to-bg flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-64 bg-surface/50 rounded-full animate-pulse mx-auto"></div>
          <div className="h-96 w-96 bg-surface/30 rounded-3xl animate-pulse"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-[100vh]">
      {/* 3D Canvas */}
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [-10, 6, 12], fov: 45 }}
        gl={{ alpha: false }}
      >
        {/* Fog for atmospheric depth */}
        <fog attach="fog" args={['#06090f', 25, 80]} />
        <color attach="background" args={['#06090f']} />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          intensity={2.5}
          position={[12, 8, 8]}
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera
            attach="shadow-camera"
            left={-30}
            right={30}
            top={30}
            bottom={-30}
          />
        </directionalLight>
        {/* Additional point lights for train ambiance */}
        <pointLight position={[-8, 4, 0]} intensity={0.3} color="#66a5ff" />
        <pointLight position={[8, 4, 0]} intensity={0.3} color="#66a5ff" />

        <Suspense fallback={null}>
          <ScrollControls
            pages={projects.length}
            damping={0.15}
            infinite={false}
          >
            <Train
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </ScrollControls>

          {/* Reflective floor */}
          <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[300, 300]} />
            <MeshReflectorMaterial
              blur={[500, 150]}
              resolution={1024}
              mixBlur={1}
              mixStrength={20}
              depthScale={1}
              minDepthThreshold={0.85}
              color="#04050a"
              metalness={0.7}
              roughness={0.9}
            />
          </mesh>

          {/* Simple track lines */}
          <mesh position={[0, -1.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[300, 2.5]} />
            <meshStandardMaterial color="#101218" roughness={0.9} />
          </mesh>
          <mesh position={[-1.3, -1.47, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[300, 0.15]} />
            <meshStandardMaterial color="#353946" roughness={0.8} />
          </mesh>
          <mesh position={[1.3, -1.47, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[300, 0.15]} />
            <meshStandardMaterial color="#353946" roughness={0.8} />
          </mesh>

          <Environment preset="dawn" />
        </Suspense>
      </Canvas>

      {/* Overlay info */}
      <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center">
        <div className="rounded-full bg-black/40 px-5 py-2.5 text-xs text-text-secondary backdrop-blur-sm">
          Scroll to travel • Click carriage to explore
        </div>
      </div>

      {/* Hover Preview Card */}
      <AnimatePresence>
        {hoveredProject && !selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="bg-bg/80 backdrop-blur-xl border border-accent/20 rounded-xl p-5 shadow-2xl max-w-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-white">{hoveredProject.name}</h3>
                <span className="text-xs uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                  {hoveredProject.category}
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                {hoveredProject.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {hoveredProject.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-surface/60 border border-accent/10 rounded-full text-xs text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setSelectedId(null)}
          >
            {/* Darkening backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl max-h-[85vh] bg-bg/98 backdrop-blur-2xl border border-accent/20 rounded-2xl p-7 shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedProject.name}</h3>
                  <span className="text-xs uppercase tracking-wider text-accent">
                    {selectedProject.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-text-secondary hover:text-white transition-colors text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="mb-5 rounded-xl overflow-hidden border border-accent/10">
                <img
                  src={selectedProject.screenshot}
                  alt={selectedProject.name}
                  className="w-full h-48 object-cover"
                />
              </div>

              <p className="text-text-secondary mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {selectedProject.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center gap-2 text-text-secondary text-sm">
                      <span className="text-accent text-lg">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-surface/60 border border-accent/15 rounded-lg text-xs text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-accent hover:bg-accent/80 text-white text-center py-3 px-4 rounded-xl transition-colors font-medium"
                >
                  View Source
                </a>
                {selectedProject.homepage && (
                  <a
                    href={selectedProject.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-surface hover:bg-surface/80 border border-accent/20 text-text-secondary text-center py-3 px-4 rounded-xl transition-colors font-medium"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
