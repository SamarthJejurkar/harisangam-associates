import AdminShell from "../components/admin/AdminShell";
import { AdminModeProvider } from "../context/AdminModeContext";
import AboutFirm from "../components/about/AboutFirm";
import AboutFamily from "../components/about/AboutFamily";
import AboutStudio from "../components/about/AboutStudio";

export default function AdminAbout() {
  return (
    <AdminShell pageTitle="Editing About Page">
      <AdminModeProvider isEditing={true}>
        <AboutFirm />
        <AboutFamily />
        <AboutStudio />
      </AdminModeProvider>
    </AdminShell>
  );
}