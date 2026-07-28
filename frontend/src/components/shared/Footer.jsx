export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div>
          <h3 className="font-serif text-2xl italic text-gold mb-2">Harisangam & Associates</h3>
          <p className="text-xs tracking-wide text-cream/50">Architecture that responds to context.</p>
        </div>
        <div className="flex gap-16 text-xs tracking-[0.15em]">
          <div className="flex flex-col gap-3">
            <span className="text-cream/40 mb-1">STUDIO</span>
            <a href="/projects" className="hover:text-gold transition-colors">PROJECTS</a>
            <a href="/#about" className="hover:text-gold transition-colors">ABOUT</a>
            <a href="/#services" className="hover:text-gold transition-colors">SERVICES</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-cream/40 mb-1">CONTACT</span>
            <a href="mailto:studio@harsangam.com" className="hover:text-gold transition-colors">EMAIL</a>
            <a href="#" className="hover:text-gold transition-colors">INSTAGRAM</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-cream/10 text-xs text-cream/40 tracking-wide">
        © {new Date().getFullYear()} Harisangam & Associates. All rights reserved.
      </div>
    </footer>
  );
}