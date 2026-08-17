import Services from "../components/home/Services";
import AssociatesList from "../components/services/AssociatesList";

export default function ServicesPage() {
  return (
    <>
      
      <AssociatesList />
      <div className="pt-6 md:pt-10">
        <Services />
      </div>
    </>
  );
}