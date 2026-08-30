import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getFeaturedProjects } from "../../api/projects";
import { cld } from "../../utils/cloudinaryTransform";

// Homepage shows exactly the admin's hand-picked 6 featured projects, in
// the order the admin chose. No category filter here (that lives on the
// full /projects page) since a curated 6 doesn't split cleanly by category.
export default function SelectedWork() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFeaturedProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    // <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
   <section className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 py-12 md:py-20">
      <div className="mb-12">
        <span className="text-xs tracking-[0.2em] text-charcoal/50">SELECTED WORK</span>
      </div>

      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <Link to={`/projects/${project.id}`} className="group block">
              <div className="aspect-[2/1] overflow-hidden">
                  <img
                    src={cld(project.cover_image, { width: 500 })}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* <h3 className="font-serif font-semibold text-lg mt-4 text-charcoal">{project.title}</h3> */}
                <h3 className="font-serif font-semibold text-sm md:text-lg mt-4 tracking-wide text-charcoal/70">{project.title}</h3>
                <p className="text-xs tracking-[0.1em] text-charcoal/50 mt-1">
                  {project.location.toUpperCase()}, {project.year}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-center mt-16">
        <Link
          to="/projects"
          className="text-xs tracking-[0.15em] border-b border-charcoal/30 hover:border-charcoal transition-colors pb-1"
        >
          VIEW ALL PROJECTS →
        </Link>
      </div>
    </section>
  );
}