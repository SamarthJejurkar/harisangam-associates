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

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-24">
      <Link to="/projects" className="text-xs tracking-[0.15em] text-charcoal/50 hover:text-charcoal transition-colors">
        ← ALL PROJECTS
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mt-8">
        <div>
          <span className="text-xs tracking-[0.2em] text-gold">{project.category.toUpperCase()}</span>
          <h1 className="font-serif font-semibold text-4xl md:text-5xl mt-3 text-charcoal">{project.title}</h1>

          <div className="grid grid-cols-3 gap-4 mt-8 text-xs tracking-[0.1em] text-charcoal/60">
            <div>
              <p className="text-charcoal/40 mb-1">LOCATION</p>
              <p>{project.location}</p>
            </div>
            <div>
              <p className="text-charcoal/40 mb-1">YEAR</p>
              <p>{project.year}</p>
            </div>
            <div>
              <p className="text-charcoal/40 mb-1">AREA</p>
              <p>{project.area}</p>
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

        <motion.div
          key={activeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="aspect-[4/5] overflow-hidden"
        >
          <img
            src={cld(project.gallery[activeImage] || project.cover_image, { width: 900 })}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {project.gallery && project.gallery.length > 1 && (
        <div className="flex gap-4 mt-6 overflow-x-auto">
          {project.gallery.map((img, i) => (
            <button
              key={img + i}
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

      {project.review && (
        <div className="bg-charcoal text-cream mt-20 px-10 md:px-16 py-16">
          <p className="font-serif italic text-2xl md:text-3xl leading-snug max-w-2xl">
            "{project.review.quote}"
          </p>
          <p className="mt-6 text-xs tracking-[0.2em] text-cream/50">— {project.review.client_name.toUpperCase()}</p>
        </div>
      )}
    </section>
  );
}