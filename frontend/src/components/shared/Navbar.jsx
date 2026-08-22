

// import { useState } from "react";
// import { Link } from "react-router-dom";

// const navLinks = [
//   { label: "PROJECTS", to: "/projects" },
//   { label: "GALLERY", to: "/gallery" },
//   { label: "ABOUT", to: "/about" },
//   { label: "SERVICES", to: "/services" },
//   { label: "CONTACT", to: "/#contact" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="w-full bg-cream/90 backdrop-blur-sm sticky top-0 z-50">
//       <div className="max-w-[1900px] mx-auto flex items-center justify-between px-4 md:pl-24 md:pr-16 py-5 md:py-6">
//         <Link to="/" className="font-sans text-lg md:text-xl tracking-[0.15em] font-semibold text-charcoal">
//           HA
//           <span className="hidden md:inline text-sm font-normal tracking-[0.12em] text-charcoal/70 ml-3">
//             HARISANGAM & ASSOCIATES
//           </span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-8">
//           {navLinks.map((link) => (
//             <Link
//               key={link.label}
//               to={link.to}
//               className="text-xs tracking-[0.15em] text-charcoal/80 hover:text-charcoal transition-colors"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         <button
//           className="md:hidden"
//           aria-label="Toggle menu"
//           onClick={() => setMenuOpen((prev) => !prev)}
//         >
//           <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
//             <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" />
//             <line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" />
//             <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" />
//           </svg>
//         </button>
//       </div>

//       {menuOpen && (
//         <nav className="md:hidden flex flex-col gap-1 px-4 pb-6 bg-cream border-t border-charcoal/10">
//           {navLinks.map((link) => (
//             <Link
//               key={link.label}
//               to={link.to}
//               onClick={() => setMenuOpen(false)}
//               className="text-sm tracking-[0.1em] text-charcoal/80 py-3 border-b border-charcoal/5"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>
//       )}
//     </header>
//   );
// }


import { useState } from "react";
import { Link } from "react-router-dom";
import { useSection } from "../../hooks/useSection";
import { cld } from "../../utils/cloudinaryTransform";

const navLinks = [
  { label: "PROJECTS", to: "/projects" },
  { label: "GALLERY", to: "/gallery" },
  { label: "ABOUT", to: "/about" },
  { label: "SERVICES", to: "/services" },
  { label: "CONTACT", to: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: siteSettings } = useSection("site_settings");
  const logoSrc = siteSettings?.logo_url ? cld(siteSettings.logo_url, { width: 200 }) : "/logo.jpg";

  return (
    <header className="w-full bg-cream/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-[1900px] mx-auto flex items-center justify-between px-4 md:pl-24 md:pr-16 py-2 md:py-2">
        <Link to="/" className="flex items-center">
          <img src={logoSrc} alt="Harisangam & Associates" className="h-14 md:h-20 w-auto" />
          <span className="inline text-[13px] sm:text-sm md:text-sm font-bold tracking-[0.08em] md:tracking-[0.12em] text-charcoal ml-2 md:ml-3 leading-tight">
            HARISANGAM & ASSOCIATES
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-xs tracking-[0.15em] text-charcoal/80 hover:text-charcoal transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" />
            <line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" />
            <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-1 px-4 pb-6 bg-cream border-t border-charcoal/10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.1em] text-charcoal/80 py-3 border-b border-charcoal/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}