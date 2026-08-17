// import AdminShell from "../components/admin/AdminShell";
// import { AdminModeProvider } from "../context/AdminModeContext";
// import AssociatesList from "../components/services/AssociatesList";

// export default function AdminServices() {
//   return (
//     <AdminShell pageTitle="Editing Services Page">
//       <AdminModeProvider isEditing={true}>
//         <AssociatesList />
//       </AdminModeProvider>
//     </AdminShell>
//   );
// }



import AdminShell from "../components/admin/AdminShell";
import { AdminModeProvider } from "../context/AdminModeContext";
import Services from "../components/home/Services";
import AssociatesList from "../components/services/AssociatesList";

export default function AdminServices() {
  return (
    <AdminShell pageTitle="Editing Services Page">
      <AdminModeProvider isEditing={true}>
        <AssociatesList />
        <Services />
      </AdminModeProvider>
    </AdminShell>
  );
}