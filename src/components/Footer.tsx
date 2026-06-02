import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-accent/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white text-sm font-bold">
                M
              </div>
              <span className="text-white font-semibold">Mohit</span>
            </div>
            <p className="text-text-secondary text-sm">
              Building modern digital experiences through software engineering.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-text-primary font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Portfolio', href: '/portfolio' },
                { name: 'Resume', href: '/mohitcv.pdf' },
                { name: 'Contact', href: 'mailto:mohitchamoli1207@gmail.com' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') || link.href.startsWith('mailto') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-text-primary font-semibold mb-4">Follow</h4>
            <div className="flex gap-4">
              {[
                { icon: 'fab fa-github', href: 'https://github.com/mohitchamoIi' },
                { icon: 'fab fa-linkedin', href: 'https://linkedin.com/in/mohit-chamoli-a837a7348' },
                { icon: 'fab fa-twitter', href: 'https://twitter.com/mohitchamoli' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-surface/50 border border-accent/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent/10 pt-8">
          <p className="text-center text-text-secondary text-sm">
            © {currentYear} Mohit Chamoli. All rights reserved. | Crafted with precision and passion.
          </p>
        </div>
      </div>
    </footer>
  )
}
