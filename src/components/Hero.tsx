import { motion } from 'framer-motion'
import profilePhoto from '../assets/images/profilephoto.jpg'

interface HeroProps {
  showImage?: boolean
}

export default function Hero({ showImage = true }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const floatVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 px-4">
      {/* Spotlight effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-accent-alt/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        {showImage && (
          <motion.div
            className="relative mx-auto"
            initial="hidden"
            animate="visible"
            variants={floatVariants}
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-64 h-64 md:w-80 md:h-80"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-alt rounded-2xl blur-2xl opacity-20"></div>
              {/* Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-accent/20 bg-surface">
                <img
                  src={profilePhoto}
                  alt="Mohit Chamoli"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Text Section */}
        <motion.div
          className="flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Label */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-text-primary">Hi, I'm </span>
            <span className="gradient-text">Mohit Chamoli</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-text-secondary mb-8 max-w-xl leading-relaxed"
          >
            A Software Engineering student passionate about building modern digital solutions. 
            Experienced with full-stack development, cloud technologies, and open-source contributions.
          </motion.p>

          {/* Animated features */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
            {['Full-Stack', 'Backend', 'Cloud', 'Open Source'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full bg-surface border border-accent/20 text-sm text-text-secondary hover:border-accent hover:text-accent transition-all"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="/portfolio"
              className="btn-primary text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="/mohitcv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-6 mt-8">
            {[
              { icon: 'fab fa-github', href: 'https://github.com/mohitchamoIi', label: 'GitHub' },
              { icon: 'fab fa-linkedin', href: 'https://linkedin.com/in/mohit-chamoli-a837a7348', label: 'LinkedIn' },
              { icon: 'fab fa-twitter', href: 'https://twitter.com/mohitchamoli', label: 'Twitter' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-surface border border-accent/20 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                title={social.label}
              >
                <i className={social.icon}></i>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
