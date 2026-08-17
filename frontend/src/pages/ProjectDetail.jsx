// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { getProject } from "../api/projects";
// import { cld } from "../utils/cloudinaryTransform";

// export default function ProjectDetail() {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImage, setActiveImage] = useState(0);

//   useEffect(() => {
//     setLoading(true);
//     getProject(id)
//       .then((data) => {
//         setProject(data);
//         setActiveImage(0);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return null;
//   if (!project) return <div className="max-w-7xl mx-auto px-6 py-20">Project not found.</div>;

//   return (
//     <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-24">
//       <Link to="/projects" className="text-xs tracking-[0.15em] text-charcoal/50 hover:text-charcoal transition-colors">
//         ← ALL PROJECTS
//       </Link>

//       <div className="grid md:grid-cols-2 gap-12 mt-8">
//         <div>
//           <span className="text-xs tracking-[0.2em] text-gold">{project.category.toUpperCase()}</span>
//           <h1 className="font-serif font-semibold text-4xl md:text-5xl mt-3 text-charcoal">{project.title}</h1>

//           <div className="grid grid-cols-3 gap-4 mt-8 text-xs tracking-[0.1em] text-charcoal/60">
//             <div>
//               <p className="text-charcoal/40 mb-1">LOCATION</p>
//               <p>{project.location}</p>
//             </div>
//             <div>
//               <p className="text-charcoal/40 mb-1">YEAR</p>
//               <p>{project.year}</p>
//             </div>
//             <div>
//               <p className="text-charcoal/40 mb-1">AREA</p>
//               <p>{project.area}</p>
//             </div>
//           </div>

//           <p className="text-xs tracking-[0.1em] text-charcoal/40 mt-6 mb-1">TYPOLOGY</p>
//           <p className="text-sm text-charcoal/70">{project.typology}</p>
//             {project.architect_name && (
//             <>
//               <p className="text-xs tracking-[0.1em] text-charcoal/40 mt-6 mb-1">ARCHITECT</p>
//               <p className="text-sm text-charcoal/70">{project.architect_name}</p>
//             </>
//           )}

//           <p className="mt-8 text-sm text-charcoal/60 leading-relaxed">{project.concept}</p>
//         </div>

//         <motion.div
//           key={activeImage}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4 }}
//           className="aspect-[2/1] overflow-hidden"
//         >
//           <img
//             src={cld(project.gallery[activeImage] || project.cover_image, { width: 900 })}
//             alt={project.title}
//             className="w-full h-full object-cover"
//           />
//         </motion.div>
//       </div>

//       {project.gallery && project.gallery.length > 1 && (
//         <div className="flex gap-4 mt-6 overflow-x-auto">
//           {project.gallery.map((img, i) => (
//             <button
//               key={img + i}
//               onClick={() => setActiveImage(i)}
//               className={`w-24 aspect-[4/3] overflow-hidden shrink-0 border ${
//                 i === activeImage ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
//               } transition-all`}
//             >
//               <img src={cld(img, { width: 150 })} alt="" className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       )}

//       {project.review && (
//         <div className="bg-charcoal text-cream mt-20 px-10 md:px-16 py-16">
//           <p className="font-serif italic text-2xl md:text-3xl leading-snug max-w-2xl">
//             "{project.review.quote}"
//           </p>
//           <p className="mt-6 text-xs tracking-[0.2em] text-cream/50">— {project.review.client_name.toUpperCase()}</p>
//         </div>
//       )}
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProject } from "../api/projects";
import { cld } from "../utils/cloudinaryTransform";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    getProject(id)
      .then((data) => {
        setProject(data);
        setActiveImage(0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return null;
  if (!project) return <div className="max-w-7xl mx-auto px-6 py-20">Project not found.</div>;

  const images = [project.cover_image, ...(project.gallery || [])].filter(
    (url, i, arr) => url && arr.indexOf(url) === i
  );

  return (
    <section className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 pt-10 md:pt-16 pb-24">
      <Link to="/projects" className="text-xs tracking-[0.15em] text-charcoal/50 hover:text-charcoal transition-colors">
        ← ALL PROJECTS
      </Link>

      {/* MOBILE: swipeable image carousel */}
      <div className="md:hidden mt-6 -mx-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {images.map((img, i) => (
            <div key={img + i} className="w-full flex-shrink-0 snap-center aspect-[4/3]">
              <img src={cld(img, { width: 900 })} alt={project.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {images.map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-[3fr_7fr] gap-8 md:gap-12 mt-6 md:mt-8">
        <div>
          <span className="text-xs tracking-[0.2em] text-gold">{project.category.toUpperCase()}</span>
          <h1 className="font-serif font-semibold text-3xl md:text-5xl mt-3 text-charcoal">{project.title}</h1>
<div className="grid grid-cols-3 gap-4 mt-8">
            <div>
              <p className="text-xs tracking-[0.1em] text-charcoal/40 mb-1">LOCATION</p>
              <p className="text-sm text-charcoal/70">{project.location}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.1em] text-charcoal/40 mb-1">YEAR</p>
              <p className="text-sm text-charcoal/70">{project.year}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.1em] text-charcoal/40 mb-1">AREA</p>
              <p className="text-sm text-charcoal/70">{project.area}</p>
            </div>
          </div>

          <p className="text-xs tracking-[0.1em] text-charcoal/40 mt-6 mb-1">TYPOLOGY</p>
          <p className="text-sm text-charcoal/70">{project.typology}</p>

          {project.architect_name && (
            <>
              <p className="text-xs tracking-[0.1em] text-charcoal/40 mt-6 mb-1">ARCHITECT</p>
              <p className="text-sm text-charcoal/70">{project.architect_name}</p>
            </>
          )}

          <p className="mt-8 text-sm text-charcoal/60 leading-relaxed">{project.concept}</p>
        </div>

        {/* DESKTOP: big image (70% width) + hover-to-switch thumbnails */}
        <div className="hidden md:block">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="aspect-[2/1] overflow-hidden"
          >
            <img
              src={cld(images[activeImage] || project.cover_image, { width: 1400 })}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {images.length > 1 && (
            <div className="flex gap-4 mt-4">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  onMouseEnter={() => setActiveImage(i)}
                  onClick={() => setActiveImage(i)}
                  className={`w-24 aspect-[4/3] overflow-hidden shrink-0 border ${
                    i === activeImage ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
                  } transition-all`}
                >
                  <img src={cld(img, { width: 150 })} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {project.review && (
        <div className="bg-charcoal text-cream mt-16 md:mt-20 px-6 md:px-16 py-12 md:py-16">
          <p className="font-serif italic text-xl md:text-3xl leading-snug max-w-2xl">
            "{project.review.quote}"
          </p>
          <p className="mt-6 text-xs tracking-[0.2em] text-cream/50">— {project.review.client_name.toUpperCase()}</p>
        </div>
      )}
    </section>
  );
}