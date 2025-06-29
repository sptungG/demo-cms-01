import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Globe,
  Building,
  CheckCircle,
  Trophy,
  Target,
  Book,
} from "lucide-react";

const WhoWeAreSection: React.FC = () => {
  return (
    <section className="container py-6 md:py-10 lg:py-14 bg-vina-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6 flex flex-col gap-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-vina-foreground mb-2 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Who We Are
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-vina-muted-foreground mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            VINHAPAC is Vietnam's leading B2B export service provider,
            specializing in connecting high-quality Vietnamese products with
            international markets worldwide.
          </motion.p>
        </motion.div>

        {/* Feature Blocks */}
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Global Reach",
              desc: "Extensive network spanning across Europe, North America, and Asia-Pacific markets.",
              icon: <Globe className="w-8 h-8 text-vina-primary" />,
              delay: 0.2,
              color: "from-vina-primary to-vina-secondary",
            },
            {
              title: "Quality Assurance",
              desc: "Rigorous quality control processes ensuring international standards and customer satisfaction.",
              icon: <Building className="w-8 h-8 text-vina-primary" />,
              delay: 0.4,
              color: "from-vina-secondary to-vina-accent",
            },
            {
              title: "Trusted Partnership",
              desc: "Building long-term relationships based on trust, transparency, and mutual success.",
              icon: <CheckCircle className="w-8 h-8 text-vina-primary" />,
              delay: 0.6,
              color: "from-vina-accent to-vina-primary",
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-vina-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-vina-muted-foreground text-base leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group bg-white/5 backdrop-blur-md border border-vina-border rounded-xl overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src="/uploads/ourmission.png"
                alt="Our Mission"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-6">
              <h4 className="text-2xl font-bold text-vina-foreground mb-3">
                Our Mission
              </h4>
              <p className="text-vina-muted-foreground leading-relaxed">
                Empower Vietnamese businesses to thrive globally by providing
                seamless export solutions and building sustainable international
                partnerships.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="group bg-white/5 backdrop-blur-md border border-vina-border rounded-xl overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src="/uploads/ourvision.png"
                alt="Our Vision"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-6">
              <h4 className="text-2xl font-bold text-vina-foreground mb-3">
                Our Vision
              </h4>
              <p className="text-vina-muted-foreground leading-relaxed">
                To be the leading bridge connecting Vietnamese excellence with the
                global market — trusted, innovative, and impactful.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
