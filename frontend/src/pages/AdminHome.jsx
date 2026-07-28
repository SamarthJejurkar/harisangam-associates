import AdminShell from "../components/admin/AdminShell";
import { AdminModeProvider } from "../context/AdminModeContext";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Services from "../components/home/Services";
import Contact from "../components/home/Contact";

export default function AdminHome() {
  return (
    <AdminShell pageTitle="Editing Homepage">
      <AdminModeProvider isEditing={true}>
        <Hero />
        <About />
        <Services />
        <Contact />
      </AdminModeProvider>
    </AdminShell>
  );
}