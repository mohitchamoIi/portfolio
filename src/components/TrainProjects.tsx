import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Text, Reflector } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface GitHubRepo {
  id: number
  name: string
  description: string
  url: string
  homepage?: string
  language: string
  stargazers_count: number
  topics: string[]
  updated_at: string
  size: number
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const Coupler = ({ x }: { x: number }) => (
  <group position={[x, -0.7, 0]}> 
    <mesh position={[-0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
      <meshStandardMaterial color="#111" metalness={0.8} roughness={0.4} />
    </mesh>
    <mesh position={[0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
      <meshStandardMaterial color="#111" metalness={0.8} roughness={0.4} />
    </mesh>
  </group>
)

const TrainCompartment = ({ project, index, total, selected, onSelect }: any) => {
  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const width = 3.2
  const depth = 5.1
  const height = 2.1

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = hovered || selected ? 0.16 : 0
      ref.current.rotation.y += hovered ? 0.0009 : 0.0003
    }
  })

  const compartmentPosition = index * 4.8 - ((total - 1) * 4.8) / 2
  const windowPositions = [-1.1, 0, 1.1]

  return (
    <group ref={ref} position={[compartmentPosition, 0, 0]}>
      <group onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onClick={() => onSelect(project)}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial color="#121821" metalness={0.45} roughness={0.25} />
        </mesh>

        <mesh position={[0, height / 2 + 0.05, 0]}>
          <boxGeometry args={[width + 0.18, 0.1, depth]} />
          <meshStandardMaterial color="#161f2b" metalness={0.35} roughness={0.45} />
        </mesh>

        <mesh position={[0, -0.23, 0]}>
          <boxGeometry args={[width - 0.4, 0.12, depth + 0.3]} />
          <meshStandardMaterial color="#0d1116" metalness={0.2} roughness={0.85} />
        </mesh>

        <group position={[0, 0.48, depth / 2 + 0.08]}>
          <mesh>
            <boxGeometry args={[width - 0.8, 1.0, 0.08]} />
            <meshStandardMaterial color="#08111f" metalness={0.15} roughness={0.18} emissive="#071a2c" emissiveIntensity={0.12} />
          </mesh>
          <Text position={[0, 0.35, 0.1]} fontSize={0.15} color="#eef5ff" anchorX="center">
            {project.name.substring(0, 20)}
          </Text>
          <Text position={[0, -0.05, 0.1]} fontSize={0.085} color="#73baff" anchorX="center">
            {project.language || 'Multi'}
          </Text>
          <mesh position={[0, -0.65, 0.09]}>
            <boxGeometry args={[width - 1.2, 0.14, 0.01]} />
            <meshStandardMaterial color="#1f66a4" emissive="#1f66a4" emissiveIntensity={0.36} transparent opacity={0.7} />
          </mesh>
        </group>

        {windowPositions.map((x, idx) => (
          <group key={idx} position={[x, 0.42, depth / 2 + 0.08]}>
            <mesh>
              <boxGeometry args={[0.62, 0.6, 0.08]} />
              <meshStandardMaterial color="#0b1220" metalness={0.18} roughness={0.24} emissive="#021829" emissiveIntensity={0.08} />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[0.54, 0.5, 0.02]} />
              <meshStandardMaterial color="#154c82" emissive="#1e78c7" emissiveIntensity={0.45} transparent opacity={0.72} />
            </mesh>
          </group>
        ))}
      </group>

      {index < total - 1 && <Coupler x={width / 2 + 0.08} />}
    </group>
  )
}

const TrainScene = ({ projects, scroll, selectedId, onSelect }: any) => {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const targetX = useRef(0)
  const total = projects.length
  const spacing = 4.8
  const max = (total - 1) * spacing

  useFrame(() => {
    const currentX = groupRef.current?.position.x || 0
    targetX.current = -clamp(scroll * max, 0, max)
    if (groupRef.current) {
      groupRef.current.position.x += (targetX.current - currentX) * 0.08
    }
    const cameraTarget = new THREE.Vector3(currentX + 1.8, 1.45, 7)
    camera.position.lerp(cameraTarget, 0.08)
    camera.lookAt(new THREE.Vector3(currentX, 0.7, 0))
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[1.8, 1.45, 7]} fov={72} />
      <ambientLight intensity={0.16} />
      <directionalLight position={[8, 5, 4]} intensity={0.35} color="#ffffff" />
      <pointLight position={[-4, 2.2, 0.8]} intensity={0.24} color="#5c80aa" />
      <pointLight position={[4, 2.2, 0.8]} intensity={0.24} color="#5c80aa" />

      <fog attach="fog" args={['#06090f', 1, 24]} />

      <Reflector
        resolution={512}
        args={[120, 60]}
        mirror={0.24}
        mixStrength={0.48}
        minDepthThreshold={0.86}
        maxDepthThreshold={0.99}
        color="#05070d"
        metalness={0.4}
        roughness={0.52}
      >
        {(Material: any) => <Material color="#06080f" />}
      </Reflector>

      <mesh position={[0, -1.32, 1.4]}>
        <boxGeometry args={[120, 0.08, 0.12]} />
        <meshStandardMaterial color="#0a1017" metalness={0.32} roughness={0.7} />
      </mesh>
      <mesh position={[0, -1.32, -1.4]}>
        <boxGeometry args={[120, 0.08, 0.12]} />
        <meshStandardMaterial color="#0a1017" metalness={0.32} roughness={0.7} />
      </mesh>

      {Array.from({ length: 24 }).map((_, i) => (
        <mesh key={i} position={[(i - 11.5) * 5, -1.38, 0]}>
          <boxGeometry args={[0.18, 0.08, 3.4]} />
          <meshStandardMaterial color="#101516" metalness={0.18} roughness={0.86} />
        </mesh>
      ))}

      <group ref={groupRef}>
        {projects.map((project: GitHubRepo, idx: number) => (
          <TrainCompartment
            key={project.id}
            project={project}
            index={idx}
            total={total}
            selected={selectedId === project.id}
            onSelect={onSelect}
          />
        ))}
      </group>
    </>
  )
}

export default function TrainProjects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [selectedProject, setSelectedProject] = useState<GitHubRepo | null>(null)
  const [loading, setLoading] = useState(true)
  const [webgl, setWebgl] = useState(true)
  const [scroll, setScroll] = useState(0)
  const [dragStart, setDragStart] = useState<number | null>(null)
  const [dragValue, setDragValue] = useState(0)

  const wheelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('webgl2')
      setWebgl(!!gl)
    } catch {
      setWebgl(false)
    }

    const fetchRepos = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://api.github.com/users/mohitchamoIi/repos?sort=stars&per_page=100')
        const data = await res.json()
        const filtered = (data || [])
          .filter((repo: any) => !repo.fork && (repo.stargazers_count > 0 || new Date(repo.updated_at).getTime() > Date.now() - 180 * 24 * 60 * 60 * 1000))
          .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
          .slice(0, 8)
          .map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || 'A focused developer project.',
            url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language || 'Multi',
            stargazers_count: repo.stargazers_count,
            topics: repo.topics || [],
            updated_at: repo.updated_at,
            size: repo.size,
          }))
        setProjects(filtered)
      } catch (err) {
        console.error(err)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    setScroll((prev) => clamp(prev + event.deltaY * 0.0008, 0, 1))
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setDragStart(event.clientX)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart !== null) {
      const delta = (dragStart - event.clientX) * 0.0012
      setScroll((prev) => clamp(prev + delta, 0, 1))
      setDragStart(event.clientX)
    }
  }

  const handlePointerUp = () => setDragStart(null)

  if (loading) {
    return (
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-title mb-4">Boarding the Project Train...</h2>
          <div className="h-96 bg-surface/20 rounded-3xl animate-pulse"></div>
        </div>
      </section>
    )
  }

  if (!webgl) {
    return (
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-title mb-4">Project Train</h2>
          <p className="section-subtitle">WebGL not available. Explore my projects below.</p>
          <div className="space-y-4 mt-8">
            {projects.map((project) => (
              <div key={project.id} className="rounded-3xl bg-surface p-6 border border-accent/10">
                <h3 className="text-xl text-white font-semibold">{project.name}</h3>
                <p className="text-text-secondary mt-2">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-accent">
                  {project.topics.slice(0, 4).map((topic) => (
                    <span key={topic} className="rounded-full border border-accent/20 px-3 py-1">
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-12 px-0">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-accent mb-3">Projects as train carriages</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white max-w-3xl mx-auto">
            My work arrives in connected train coach compartments.
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl mx-auto mt-4">
            A cinematic rail journey where each compartment is a project, glowing with windows, interior lighting, and reflective rails.
          </p>
        </motion.div>

        <div
          ref={wheelRef}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative rounded-3xl overflow-hidden"
          style={{ height: '340px', cursor: dragStart !== null ? 'grabbing' : 'grab' }}
        >
          <Canvas gl={{ antialias: true, alpha: true }}>
            <TrainScene
              projects={projects}
              scroll={scroll}
              selectedId={selectedProject?.id}
              onSelect={(project: GitHubRepo) => setSelectedProject(project)}
            />
          </Canvas>

          <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center">
            <div className="rounded-full bg-black/40 px-4 py-2 text-xs text-text-secondary backdrop-blur-sm">
              These are my projects represented as train carriages
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <div className="rounded-full bg-bg/80 px-4 py-2 text-xs text-text-secondary backdrop-blur-sm">
              Scroll or drag to move along the train • click a carriage to inspect
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {selectedProject ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-[#0d111a] border border-white/10 p-8"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-accent">Selected Compartment</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{selectedProject.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-text-secondary hover:text-white"
                >
                  Close
                </button>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6">{selectedProject.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-text-secondary">
                <div>
                  <span className="font-semibold text-white">Language</span>
                  <p>{selectedProject.language}</p>
                </div>
                <div>
                  <span className="font-semibold text-white">Stars</span>
                  <p>{selectedProject.stargazers_count}</p>
                </div>
                <div>
                  <span className="font-semibold text-white">Updated</span>
                  <p>{new Date(selectedProject.updated_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-semibold text-white">Size</span>
                  <p>{selectedProject.size} KB</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.topics.slice(0, 5).map((topic) => (
                  <span key={topic} className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary">
                    #{topic}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-accent px-5 py-3 text-sm text-accent transition hover:bg-accent/10"
                >
                  GitHub
                </a>
                {selectedProject.homepage && (
                  <a
                    href={selectedProject.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-[#0d111a] border border-white/10 p-8 text-text-secondary"
            >
              <p className="text-sm">Select a compartment to reveal detailed project metrics, technology cues, and repository links.</p>
            </motion.div>
          )}

          {selectedProject ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-[#0d111a] border border-white/10 p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Visual cues</p>
              <div className="space-y-4 text-text-secondary text-sm">
                <p>Each compartment is a connected carriage on a continuous rail, with subtle interior glow and structural panels.</p>
                <p>Hovering over a carriage deepens the lighting and prepares the camera to move forward.</p>
                <p>Details appear through interior displays rather than exposed cards.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-[#0d111a] border border-white/10 p-8">
              <p className="text-sm text-text-secondary">The train is a continuous corridor with connected compartments. Click one to inspect the interior display.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
