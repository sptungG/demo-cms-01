import React from "react";
import { motion } from "framer-motion";
import { Globe, ArrowRight, Users, Star, Package, History } from "lucide-react";
import CountUp from "react-countup";

interface HeroSectionProps {
  onQuoteClick: () => void;
  onSupplierClick: () => void;
}

const HeroSectionSecond: React.FC<HeroSectionProps> = ({
  onQuoteClick,
  onSupplierClick,
}) => {
  return (
    <section className="mx-auto rounded-xl relative bg-gradient-to-br from-vina-background via-vina-muted to-vina-background overflow-hidden py-4 sm:py-6 md:py-10 lg:py-12">
      <div className="mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left Column */}
          <motion.div
            className="space-y-4 xl:space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-vina-border/10 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <Star className="w-4 h-4 text-vina-primary mr-2" />
              <span className="text-sm font-medium text-vina-primary">
                Trusted by 500+ Global Partners
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-vina-foreground leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Connecting Vietnam to the{" "}
              <span className="text-vina-primary font-bold">World</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-vina-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Your trusted B2B export partner, bridging Vietnamese excellence
              with global markets through quality, reliability, and innovation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                onClick={onQuoteClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex cursor-pointer items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl shadow-lg bg-vina-primary text-white hover:opacity-90 transition"
              >
                <Globe className="w-5 h-5" />
                Request a Quote
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.button>
              <motion.button
                onClick={onSupplierClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex cursor-pointer items-center gap-2 px-2 py-2 text-sm font-semibold rounded-xl shadow-lg bg-white/10 border border-vina-border text-vina-foreground hover:bg-white/20 transition"
              >
                <Users className="w-5 h-5" />
                Become a Supplier
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column (Stats) */}
          <motion.div
            className="grid mt-4 sm:mt-0 grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {[
              {
                number: 500,
                text: "Global Partners",
                icon: <Users className="w-6 h-6 text-vina-primary mb-1" />,
                class: "text-vina-primary",
              },
              {
                number: 50,
                text: "Countries Served",
                icon: <Globe className="w-6 h-6 text-vina-secondary mb-1" />,
                class: "text-vina-secondary",
              },
              {
                number: 10,
                text: "Products Exported",
                icon: <Package className="w-6 h-6 text-vina-accent mb-1" />,
                class: "text-vina-accent",
              },
              {
                number: 15,
                text: "Years Experience",
                icon: <History className="w-6 h-6 text-vina-primary mb-1" />,
                class:
                  "bg-gradient-to-r from-vina-primary to-vina-accent bg-clip-text text-vina-primary",
              },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-vina-border/10 backdrop-blur-md shadow hover:shadow-lg hover:border-vina-primary transition"
                whileHover={{ scale: 1.03 }}
              >
                {item.icon}
                <div className={`text-2xl font-bold ${item.class}`}>
                  <CountUp end={item.number} duration={2} />+
                </div>
                <div className="text-sm text-vina-muted-foreground mt-1">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSecond;
