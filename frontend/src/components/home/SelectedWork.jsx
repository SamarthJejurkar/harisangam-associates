import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getProjects } from "../../api/projects";
import { cld } from "../../utils/cloudinaryTransform";

const categories = ["All", "Residential", "Commercial", "Interior", "Landscape"];

export default function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProjects(activeCategory)
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
        <span className="text-xs tracking-[0.2em] text-charcoal/50">SELECTED WORK</span>
        <div className="flex flex-wrap gap-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs tracking-[0.15em] transition-colors ${
                activeCategory === cat ? "text-charcoal border-b border-gold" : "text-charcoal/40 hover:text-charcoal/70"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {!loading && (
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <Link to={`/projects/${project.id}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cld(project.cover_image, { width: 500 })}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-lg mt-4 text-charcoal">{project.title}</h3>
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