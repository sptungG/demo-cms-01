import React from "react";
import { motion } from "framer-motion";

const certifications = [
  {
    name: "HACCP",
    image: "/images/iso-certi-template.png",
    description: "Hazard Analysis & Critical Control Points",
  },
  {
    name: "ISO 22000",
    image: "/images/iso-certi-template.png",
    description: "Food Safety Management Systems",
  },
  {
    name: "FDA Approved",
    image: "/images/iso-certi-template.png",
    description: "Compliant with U.S. FDA standards",
  },
  {
    name: "GlobalG.A.P",
    image: "/images/iso-certi-template.png",
    description: "Good Agricultural Practices Certification",
  },
];

const CertificationsSection: React.FC = () => {
  return (
    <section className="py-6 md:py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-center text-3xl font-bold text-vina-foreground mb-12">
          International Certifications
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              className="p-4 rounded-xl border border-vina-border bg-white/10 backdrop-blur-md text-center hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src={cert.image}
                alt={cert.name}
                className="mx-auto mb-4 h-16 object-contain"
              />
              <h3 className="text-lg font-semibold text-vina-foreground mb-1">
                {cert.name}
              </h3>
              <p className="text-sm text-vina-muted-foreground">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
