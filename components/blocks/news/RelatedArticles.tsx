import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { NewsArticle } from "./NewsCard";

export interface IRelatedArticle {
  title?: string;
  items?: NewsArticle[];
}
const RelatedArticles = (props: IRelatedArticle) => {
  const related = props;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{related.title}</h3>
      <div className="space-y-4">
        {related.items?.map((relatedArticle, index) => (
          <motion.div
            key={relatedArticle.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="group"
          >
            <Link href={relatedArticle.slug || "#"} className="block">
              <div className="flex space-x-3">
                <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                  {relatedArticle.coverImage ? (
                    <Image
                      src={relatedArticle.coverImage}
                      alt={relatedArticle.title || "Related article"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-vina-primary/10 to-vina-secondary/10 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-vina-primary/40"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-vina-primary transition-colors duration-200">
                    {relatedArticle.title}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    {relatedArticle.category && (
                      <span className="text-xs text-vina-primary font-medium">
                        {relatedArticle.category}
                      </span>
                    )}
                    {relatedArticle.updatedAt && (
                      <span className="text-xs text-gray-500">
                        {formatDate(relatedArticle.updatedAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
