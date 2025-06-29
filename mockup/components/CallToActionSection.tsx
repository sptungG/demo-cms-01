import React from "react";
import { motion } from "framer-motion";
import { Globe, Building, CheckCircle, ArrowRight } from "lucide-react";

interface CallToActionSectionProps {
  onQuoteClick: () => void;
  onSupplierClick: () => void;
}

const callouts = [
  {
    title: "For International Buyers",
    icon: <Globe className="w-10 h-10 text-vina-primary" />,
    bg: "from-vina-primary to-vina-secondary",
    button: {
      text: "Request a Quote",
      onClickKey: "onQuoteClick",
      gradient: "from-vina-primary to-vina-secondary",
      hover: "from-vina-secondary to-vina-accent",
    },
    features: [
      "Premium product sourcing",
      "Quality assurance & certification",
      "Competitive wholesale pricing",
      "End-to-end logistics and export support",
    ],
    bulletColor: "text-vina-primary",
    delay: 0.2,
  },
  {
    title: "For Vietnamese Suppliers",
    icon: <Building className="w-10 h-10 text-vina-primary" />,
    bg: "from-vina-accent to-vina-primary",
    button: {
      text: "Become a Supplier",
      onClickKey: "onSupplierClick",
      gradient: "tex-vina-primary",
      hover: "from-vina-primary to-vina-secondary",
    },
    features: [
      "Global market access",
      "Export documentation and compliance",
      "Marketing and promotion support",
      "Payment security and trade finance",
    ],
    delay: 0.4,
  },
];

const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  onQuoteClick,
  onSupplierClick,
}) => {
  return (
    <section className="container mx-auto rounded-xl  bg-vina-primary-10 relative overflow-hidden py-4 sm:py-6 md:py-10 lg:py-12">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 className="text-4xl font-bold text-vina-foreground mb-6 relative">
            Ready to Start?
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-vina-primary via-vina-secondary to-vina-accent rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <motion.p
            className="text-xl text-vina-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Whether you're looking to source products or export your goods, we
            have the expertise to help you succeed.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {callouts.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-gradient-to-br from-vina-background via-vina-muted to-vina-background backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-vina-border transition-all duration-300 relative overflow-hidden group"
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: item.delay, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center mb-8 relative z-10">
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-vina-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-vina-muted-foreground">
                  {i === 0
                    ? "Access premium Vietnamese products with guaranteed quality, competitive pricing, and reliable delivery worldwide."
                    : "Join our network of trusted suppliers and expand your business to international markets with our expert support."}
                </p>
              </div>
              <div className="space-y-4 mb-8 relative z-10">
                {item.features.map((feature, idx) => (
                  <motion.div
                    key={feature}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className={`w-5 h-5 ${item.bulletColor}`} />
                    <span className="text-vina-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button
                onClick={
                  item.button.onClickKey === "onQuoteClick"
                    ? onQuoteClick
                    : onSupplierClick
                }
                className={`w-full bg-gradient-to-r text-vina-primary cursor-pointer py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 relative z-10 group/btn overflow-hidden`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="relative z-10">{item.button.text}</span>
                <motion.div
                  className="relative z-10"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-vina-accent to-vina-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
