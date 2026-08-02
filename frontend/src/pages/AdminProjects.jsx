// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
//   useSortable,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import AdminShell from "../components/admin/AdminShell";
// import { getProjects, deleteProject, reorderProjects } from "../api/projects";
// import { cld } from "../utils/cloudinaryTransform";

// function SortableRow({ project, onDelete }) {
//   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
//     id: project.id,
//   });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="flex items-center gap-4 bg-white border border-charcoal/10 px-4 py-3"
//     >
//       <button
//         {...attributes}
//         {...listeners}
//         className="cursor-grab active:cursor-grabbing text-charcoal/30 hover:text-charcoal/60 px-1"
//         title="Drag to reorder"
//       >
//         ⠿
//       </button>

//       <img
//         src={cld(project.cover_image, { width: 150 })}
//         alt={project.title}
//         className="w-16 h-16 object-cover shrink-0"
//       />

//       <div className="flex-1 min-w-0">
//         <p className="font-serif text-lg text-charcoal truncate">{project.title}</p>
//         <p className="text-xs tracking-[0.1em] text-charcoal/50">
//           {project.category.toUpperCase()} · {project.location} · {project.year}
//         </p>
//       </div>

//       <Link
//         to={`/admin/projects/${project.id}/edit`}
//         className="text-xs tracking-[0.1em] text-charcoal/60 hover:text-charcoal transition-colors px-3"
//       >
//         EDIT
//       </Link>
//       <button
//         onClick={() => onDelete(project)}
//         className="text-xs tracking-[0.1em] text-red-600/70 hover:text-red-600 transition-colors px-3"
//       >
//         DELETE
//       </button>
//     </div>
//   );
// }

// export default function AdminProjects() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

//   useEffect(() => {
//     loadProjects();
//   }, []);

//   function loadProjects() {
//     setLoading(true);
//     getProjects("All").then(setProjects).catch(console.error).finally(() => setLoading(false));
//   }

//   async function handleDelete(project) {
//     if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
//     await deleteProject(project.id);
//     loadProjects();
//   }

//   async function handleDragEnd(event) {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     const oldIndex = projects.findIndex((p) => p.id === active.id);
//     const newIndex = projects.findIndex((p) => p.id === over.id);
//     const reordered = arrayMove(projects, oldIndex, newIndex);

//     setProjects(reordered); // optimistic UI update
//     await reorderProjects(reordered.map((p) => p.id));
//   }

//   return (
//     <AdminShell pageTitle="Manage Projects">
//       <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
//         <div className="flex items-center justify-between mb-10">
//           <h1 className="font-serif text-3xl text-charcoal">Projects</h1>
//           <button
//             onClick={() => navigate("/admin/projects/new")}
//             className="text-xs tracking-[0.15em] border-b border-charcoal/30 hover:border-charcoal transition-colors pb-1"
//           >
//             + ADD PROJECT
//           </button>
//         </div>

//         {!loading && projects.length === 0 && (
//           <p className="text-sm text-charcoal/50">No projects yet. Add your first one.</p>
//         )}

//         {!loading && projects.length > 0 && (
//           <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//             <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
//               <div className="space-y-2">
//                 {projects.map((project) => (
//                   <SortableRow key={project.id} project={project} onDelete={handleDelete} />
//                 ))}
//               </div>
//             </SortableContext>
//           </DndContext>
//         )}
//       </div>
//     </AdminShell>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AdminShell from "../components/admin/AdminShell";
import {
  getProjects,
  deleteProject,
  reorderProjects,
  getFeaturedProjects,
  setFeaturedProjects,
} from "../api/projects";
import { cld } from "../utils/cloudinaryTransform";

const MAX_FEATURED = 6;

function SortableRow({ project, onDelete, featuredIds, onToggleFeatured }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const featuredPosition = featuredIds.indexOf(project.id);
  const isFeatured = featuredPosition !== -1;
  const atMax = featuredIds.length >= MAX_FEATURED && !isFeatured;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 bg-white border border-charcoal/10 px-4 py-3"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-charcoal/30 hover:text-charcoal/60 px-1"
        title="Drag to reorder"
      >
        ⠿
      </button>

      <img
        src={cld(project.cover_image, { width: 150 })}
        alt={project.title}
        className="w-16 h-16 object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="font-serif font-semibold text-lg text-charcoal truncate">{project.title}</p>
        <p className="text-xs tracking-[0.1em] text-charcoal/50">
          {project.category.toUpperCase()} · {project.location} · {project.year}
        </p>
      </div>

      <button
        onClick={() => onToggleFeatured(project.id)}
        disabled={atMax}
        title={atMax ? `Max ${MAX_FEATURED} featured projects` : "Toggle featured on homepage"}
        className={`flex items-center gap-1.5 text-xs tracking-[0.1em] px-3 py-1.5 border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
          isFeatured
            ? "border-gold text-gold bg-gold/10"
            : "border-charcoal/20 text-charcoal/50 hover:text-charcoal hover:border-charcoal/40"
        }`}
      >
        <span>{isFeatured ? "★" : "☆"}</span>
        {isFeatured && <span>{featuredPosition + 1}</span>}
      </button>

      <Link
        to={`/admin/projects/${project.id}/edit`}
        className="text-xs tracking-[0.1em] text-charcoal/60 hover:text-charcoal transition-colors px-3"
      >
        EDIT
      </Link>
      <button
        onClick={() => onDelete(project)}
        className="text-xs tracking-[0.1em] text-red-600/70 hover:text-red-600 transition-colors px-3"
      >
        DELETE
      </button>
    </div>
  );
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredIds, setFeaturedIds] = useState([]);
  const [initialFeaturedIds, setInitialFeaturedIds] = useState([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    loadProjects();
    loadFeatured();
  }, []);

  function loadProjects() {
    setLoading(true);
    getProjects("All").then(setProjects).catch(console.error).finally(() => setLoading(false));
  }

  function loadFeatured() {
    getFeaturedProjects()
      .then((data) => {
        const ids = data.map((p) => p.id);
        setFeaturedIds(ids);
        setInitialFeaturedIds(ids);
      })
      .catch(console.error);
  }

  async function handleDelete(project) {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    await deleteProject(project.id);
    loadProjects();
  }

  async function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p.id === active.id);
    const newIndex = projects.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(projects, oldIndex, newIndex);

    setProjects(reordered);
    await reorderProjects(reordered.map((p) => p.id));
  }

  function toggleFeatured(id) {
    setFeaturedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_FEATURED) return prev;
      return [...prev, id];
    });
  }

  const featuredDirty = JSON.stringify(featuredIds) !== JSON.stringify(initialFeaturedIds);

  async function handleSaveFeatured() {
    setSaving(true);
    try {
      await setFeaturedProjects(featuredIds);
      setInitialFeaturedIds(featuredIds);
    } catch (err) {
      console.error("Failed to save featured projects:", err);
      alert("Failed to save featured projects. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell pageTitle="Manage Projects">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-serif text-3xl text-charcoal">Projects</h1>
          <button
            onClick={() => navigate("/admin/projects/new")}
            className="text-xs tracking-[0.15em] border-b border-charcoal/30 hover:border-charcoal transition-colors pb-1"
          >
            + ADD PROJECT
          </button>
        </div>

        <div className="flex items-center justify-between bg-charcoal/5 px-4 py-3 mb-8 text-xs tracking-[0.1em] text-charcoal/60">
          <span>
            ★ FEATURED ON HOMEPAGE: {featuredIds.length}/{MAX_FEATURED} — click the star to
            add/remove, order reflects homepage position
          </span>
          {featuredDirty && (
            <button
              onClick={handleSaveFeatured}
              disabled={saving}
              className="text-gold border-b border-gold hover:opacity-70 transition-opacity disabled:opacity-40"
            >
              {saving ? "SAVING..." : "SAVE FEATURED SELECTION"}
            </button>
          )}
        </div>

        {!loading && projects.length === 0 && (
          <p className="text-sm text-charcoal/50">No projects yet. Add your first one.</p>
        )}

        {!loading && projects.length > 0 && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {projects.map((project) => (
                  <SortableRow
                    key={project.id}
                    project={project}
                    onDelete={handleDelete}
                    featuredIds={featuredIds}
                    onToggleFeatured={toggleFeatured}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </AdminShell>
  );
}