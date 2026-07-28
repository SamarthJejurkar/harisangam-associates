import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminShell({ children, pageTitle = "Admin" }) {
  const { logout, isOwner, username } = useAuth();

  return (
    <div className="min-h-screen bg-charcoal">
      <div className="bg-charcoal text-cream px-4 md:px-12 py-4 flex items-center justify-between gap-4 border-b border-cream/10 sticky top-0 z-50 overflow-x-auto">
        <div className="flex items-center gap-4 md:gap-6 whitespace-nowrap">
          <span className="text-xs tracking-[0.15em] text-cream/70 hidden sm:inline">{pageTitle.toUpperCase()}</span>
          <Link to="/admin/home" className="text-xs tracking-[0.15em] text-cream/50 hover:text-gold transition-colors">
            HOMEPAGE
          </Link>
          <Link to="/admin/projects" className="text-xs tracking-[0.15em] text-cream/50 hover:text-gold transition-colors">
            PROJECTS
          </Link>
          <Link to="/admin/enquiries" className="text-xs tracking-[0.15em] text-cream/50 hover:text-gold transition-colors">
            ENQUIRIES
          </Link>
          {isOwner && (
            <Link to="/admin/team" className="text-xs tracking-[0.15em] text-cream/50 hover:text-gold transition-colors">
              TEAM
            </Link>
          )}
        </div>
        <div className="flex items-center gap-4 md:gap-6 text-xs tracking-[0.15em] whitespace-nowrap">
          <span className="text-cream/40 hidden sm:inline">{username}</span>
          <Link to="/" target="_blank" className="text-cream/60 hover:text-gold transition-colors">
            VIEW SITE ↗
          </Link>
          <button onClick={logout} className="text-cream/60 hover:text-gold transition-colors">
            LOG OUT
          </button>
        </div>
      </div>
      <div className="bg-cream min-h-[calc(100vh-57px)]">{children}</div>
    </div>
  );
}