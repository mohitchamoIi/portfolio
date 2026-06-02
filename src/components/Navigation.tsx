import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full top-0 z-50"
    >
      <div className="glass mx-4 mt-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg group-hover:shadow-accent/50 transition-all">
              M
            </div>
            <span className="text-white font-semibold hidden sm:inline">Mohit Chamoli</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'Resume', path: '/src/assets/docs/mohitcv.pdf', external: true },
            ].map((item, i) => (
              <motion.div key={item.name} custom={i} variants={menuVariants} initial="hidden" animate="visible">
                {item.external ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-accent transition-colors duration-300 font-medium relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className="text-text-secondary hover:text-accent transition-colors duration-300 font-medium relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.a
              href="mailto:mohitchamoli1207@gmail.com"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary hover:text-accent transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-text-secondary/10 px-6 py-4"
          >
            <div className="flex flex-col gap-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Resume', path: '/src/assets/docs/mohitcv.pdf', external: true },
              ].map((item) => (
                <motion.div key={item.name} whileHover={{ x: 10 }}>
                  {item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-accent transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-text-secondary hover:text-accent transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.a
                href="mailto:mohitchamoli1207@gmail.com"
                className="btn-primary w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
