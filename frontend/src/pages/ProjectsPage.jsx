import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getProjects } from "../api/projects";
import { cld } from "../utils/cloudinaryTransform";
import { useSection } from "../hooks/useSection";
import QuoteSection from "../components/home/QuoteSection";
import Services from "../components/home/Services";





const categories = ["All", "Residential", "Commercial", "Interior", "Landscape"];

export default function ProjectsPage() {
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
    <section className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 pt-10 md:pt-16 pb-12 md:pb-20">
      <span className="text-xs tracking-[0.2em] text-gold">PROJECTS</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-4 text-charcoal">Selected Work</h1>

      <div className="flex flex-wrap gap-6 mt-10 mb-12">
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
                <h3 className="font-serif font-semibold text-lg mt-4 text-charcoal">{project.title}</h3>
                <p className="text-xs tracking-[0.1em] text-charcoal/50 mt-1">
                  {project.location.toUpperCase()}, {project.year}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}