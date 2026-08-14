import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import AdminTeam from "./pages/AdminTeam";
import OwnerRoute from "./components/shared/OwnerRoute";
import AdminProjects from "./pages/AdminProjects";
import AdminProjectForm from "./pages/AdminProjectForm";
import AdminEnquiries from "./pages/AdminEnquiries";
import GalleryPage from "./pages/GalleryPage";
import AdminGallery from "./pages/AdminGallery";
import AboutPage from "./pages/AboutPage";
import AdminAbout from "./pages/AdminAbout";
import ScrollToHash from "./components/shared/ScrollToHash";
import ServicesPage from "./pages/ServicesPage";
import AdminServices from "./pages/AdminServices";

// function PublicLayout({ children }) {
//   return (
//     <div className="bg-cream min-h-screen">
//       <Navbar />
//       {children}
//       <Footer />
//     </div>
//   );
// }
function PublicLayout({ children }) {
  return (
    <div className="bg-cream min-h-screen">
      <ScrollToHash />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />
          <Route path="/projects/:id" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/home"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/team"
            element={
              <OwnerRoute>
                <AdminTeam />
              </OwnerRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <AdminProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects/new"
            element={
              <ProtectedRoute>
                <AdminProjectForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects/:id/edit"
            element={
              <ProtectedRoute>
                <AdminProjectForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <ProtectedRoute>
                <AdminEnquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <AdminGallery />
              </ProtectedRoute>
            }
          />
          <Route
  path="/admin/about"
  element={
    <ProtectedRoute>
      <AdminAbout />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/services"
  element={
    <ProtectedRoute>
      <AdminServices />
    </ProtectedRoute>
  }
/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;