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
import { getProjects, deleteProject, reorderProjects } from "../api/projects";
import { cld } from "../utils/cloudinaryTransform";

function SortableRow({ project, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

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
        <p className="font-serif text-lg text-charcoal truncate">{project.title}</p>
        <p className="text-xs tracking-[0.1em] text-charcoal/50">
          {project.category.toUpperCase()} · {project.location} · {project.year}
        </p>
      </div>

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
  const navigate = useNavigate();

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    loadProjects();
  }, []);

  function loadProjects() {
    setLoading(true);
    getProjects("All").then(setProjects).catch(console.error).finally(() => setLoading(false));
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

    setProjects(reordered); // optimistic UI update
    await reorderProjects(reordered.map((p) => p.id));
  }

  return (
    <AdminShell pageTitle="Manage Projects">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-3xl text-charcoal">Projects</h1>
          <button
            onClick={() => navigate("/admin/projects/new")}
            className="text-xs tracking-[0.15em] border-b border-charcoal/30 hover:border-charcoal transition-colors pb-1"
          >
            + ADD PROJECT
          </button>
        </div>

        {!loading && projects.length === 0 && (
          <p className="text-sm text-charcoal/50">No projects yet. Add your first one.</p>
        )}

        {!loading && projects.length > 0 && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {projects.map((project) => (
                  <SortableRow key={project.id} project={project} onDelete={handleDelete} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </AdminShell>
  );
}