import { motion } from 'framer-motion'
import { useState } from 'react'
import Hero from '../components/Hero'
import TrainProjects from '../components/TrainProjects'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const skills = {
    languages: [
      { name: 'C/C++', icon: 'fab fa-code' },
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'Java', icon: 'fab fa-java' },
      { name: 'JavaScript', icon: 'fab fa-js' },
      { name: 'TypeScript', icon: 'fas fa-code' },
      { name: 'SQL', icon: 'fas fa-database' },
    ],
    frameworks: [
      { name: 'React', icon: 'fab fa-react' },
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'Express', icon: 'fas fa-server' },
      { name: 'Flutter', icon: 'fas fa-mobile' },
      { name: 'MongoDB', icon: 'fas fa-leaf' },
      { name: 'AWS', icon: 'fab fa-aws' },
    ],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <main className="relative">
      {/* Hero Section */}
      <Hero showImage={true} />

      {/* About Preview */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="section-title text-center mb-12">
              About Me
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div variants={itemVariants} className="glass p-8">
                <h3 className="text-2xl font-bold text-accent mb-4">Who I Am</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  I'm a Computer Science student at Graphic Era Hill University, passionate about
                  building innovative solutions through software development. With expertise in full-stack
                  development, I thrive in creating seamless digital experiences that solve real-world problems.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  My journey revolves around continuous learning, open-source contributions, and exploring
                  cutting-edge technologies like cloud platforms, AI/ML, and modern frameworks.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                {[
                  { title: 'Full-Stack Development', desc: 'Building complete web applications from frontend to backend' },
                  { title: 'Cloud & DevOps', desc: 'Deploying scalable solutions with modern cloud technologies' },
                  { title: 'Open Source', desc: 'Contributing to and maintaining community-driven projects' },
                  { title: 'Problem Solving', desc: 'Crafting elegant solutions to complex technical challenges' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="glass p-6 hover:bg-surface/60 transition-all"
                    whileHover={{ x: 10 }}
                  >
                    <h4 className="text-accent font-semibold mb-2">{item.title}</h4>
                    <p className="text-text-secondary text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="section-title text-center mb-12">
              Skills & Technologies
            </motion.h2>

            {/* Languages */}
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="text-2xl font-bold text-accent mb-6">Programming Languages</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {skills.languages.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="glass p-6 text-center group cursor-pointer"
                    whileHover={{ y: -8, borderColor: '#007BFF' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <i className={`${skill.icon} text-3xl text-accent mb-3 group-hover:scale-125 transition-transform`}></i>
                    <p className="text-sm text-text-secondary group-hover:text-accent transition-colors">{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Frameworks */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-accent mb-6">Frameworks & Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {skills.frameworks.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="glass p-6 text-center group cursor-pointer"
                    whileHover={{ y: -8, borderColor: '#3B82F6' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <i className={`${skill.icon} text-3xl text-accent-alt mb-3 group-hover:scale-125 transition-transform`}></i>
                    <p className="text-sm text-text-secondary group-hover:text-accent-alt transition-colors">{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Train Journey */}
      <TrainProjects />

      {/* Contact Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="section-title text-center mb-4">
              Get In Touch
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle text-center">
              Let's collaborate on something great
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              className="glass p-8 space-y-6 mt-8"
              variants={itemVariants}
            >
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-surface/50 border border-accent/20 rounded-lg text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-surface/50 border border-accent/20 rounded-lg text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-surface/50 border border-accent/20 rounded-lg text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.form>

            {/* Direct Contact */}
            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-text-secondary mb-4">Or reach out directly:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:mohitchamoli1207@gmail.com"
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                >
                  Email
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/mohit-chamoli-a837a7348"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                >
                  LinkedIn
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
