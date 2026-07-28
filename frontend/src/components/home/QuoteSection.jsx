import { motion } from "framer-motion";
import { useSection } from "../../hooks/useSection";
import { cld } from "../../utils/cloudinaryTransform";
export default function QuoteSection() {
  const { data: quoteData, loading } = useSection("quote");

  if (loading || !quoteData) return null;

  return (
    <section className="bg-charcoal grid md:grid-cols-2 min-h-[70vh]">
      <div className="h-full min-h-[400px]">
        <img src={cld(quoteData.image, { width: 1000 })} alt="Featured project" className="w-full h-full object-cover" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center px-10 md:px-16 py-16"
      >
        <p className="font-serif italic text-3xl md:text-4xl leading-snug text-cream">
          "{quoteData.quote}"
        </p>
        <p className="mt-8 text-xs tracking-[0.2em] text-cream/50">{quoteData.signature}</p>
      </motion.div>
    </section>
  );
}