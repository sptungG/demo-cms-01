import React from "react";
import { motion } from "framer-motion";
import {
  Plane,
  ShieldCheck,
  Factory,
  FileText,
  PackageSearch,
  Users,
} from "lucide-react";

const services = [
  {
    title: "End-to-End Export Solutions",
    icon: <Plane className="w-8 h-8 text-vina-primary" />,
    description:
      "Comprehensive support from sourcing, logistics, to international compliance handling.",
  },
  {
    title: "Customs & Documentation",
    icon: <FileText className="w-8 h-8 text-vina-primary" />,
    description:
      "Fast and accurate customs clearance and international export documentation services.",
  },
  {
    title: "Product Sourcing & Consolidation",
    icon: <Factory className="w-8 h-8 text-vina-primary" />,
    description:
      "Strong ties with local manufacturers across industries like apparel, food, furniture, and more.",
  },
  {
    title: "Quality Control & Certification",
    icon: <ShieldCheck className="w-8 h-8 text-vina-primary" />,
    description:
      "Strict quality inspection with international certification assurance for every shipment.",
  },
  {
    title: "Tailored Distribution Network",
    icon: <PackageSearch className="w-8 h-8 text-vina-primary" />,
    description:
      "Flexible and scalable delivery channels to match partner requirements worldwide.",
  },
  {
    title: "Global Partner Relationships",
    icon: <Users className="w-8 h-8 text-vina-primary" />,
    description:
      "Strategic partnerships with logistics and supply chain experts in France, USA, and Asia.",
  },
];

const DeepExportServices: React.FC = () => {
  return (
    <section className="py-6 md:py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-vina-foreground mb-4">
            Specialized Export Services
          </h2>
          <p className="text-lg text-vina-muted-foreground max-w-2xl mx-auto">
            VINHAPAC offers comprehensive export support tailored to help you
            scale globally with confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="p-6 bg-white/5 backdrop-blur-xl border border-vina-primary-10 rounded-2xl hover:border-vina-primary/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-vina-primary/10 w-14 h-14 flex items-center justify-center rounded-xl mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-vina-foreground mb-2 group-hover:text-vina-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-vina-muted-foreground text-base leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeepExportServices;
