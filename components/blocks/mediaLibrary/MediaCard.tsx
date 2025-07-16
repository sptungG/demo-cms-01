"use client";
import { motion } from "motion/react";
import { Play, Calendar, Tag, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { uuidv4 } from "@/lib/utils";

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  tags: {
    id?: string;
    label?: string;
  }[];
  createdAt: string;
  downloaded?: number;
  items?: this[];
}

interface MediaCardProps {
  item: MediaItem;
  onClick?: (item: MediaItem) => void;
}

export const MediaCard = ({ item, onClick }: MediaCardProps) => {
  const isVideo = !!item.video;
  const mediaUrl = item.video || item.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer h-full"
      onClick={() => onClick?.(item)}
    >
      <Card className="overflow-hidden h-full border-none shadow-xs transition-all duration-300 hover:shadow-lg py-4 p-0 gap-0">
        <div className="relative aspect-video overflow-hidden">
          {mediaUrl && (
            <img
              src={mediaUrl ?? ""}
              alt={item.title ?? "No title"}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}

          {isVideo && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 rounded-full p-3">
                <Play
                  className="w-6 h-6 text-vina-primary"
                  fill="currentColor"
                />
              </div>
            </div>
          )}

          {/* Media Type Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                isVideo
                  ? "bg-red-500/90 text-white"
                  : "bg-blue-500/90 text-white"
              }`}
            >
              {isVideo ? "Video" : "Hình ảnh"}
            </span>
          </div>

          {/* Views Counter */}
          {item.downloaded && (
            <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <Download className="w-3 h-3" />
              {item.downloaded}
            </div>
          )}

          {/* Click Indicator */}
          <div className="absolute inset-0 bg-vina-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-2 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <span className="text-vina-primary font-medium text-sm">
                More
              </span>
            </div>
          </div>
        </div>
        <CardContent className="p-2 flex flex-col flex-1">
          <h3 className="font-semibold text-md mb-2 line-clamp-2 group-hover:text-vina-primary transition-colors">
            {item.title}
          </h3>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 line-clamp-3">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3 mt-auto">
            {item.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={tag.id ?? uuidv4()}
                className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag.label}
              </span>
            ))}
            {item.tags?.length > 3 && (
              <span className="text-xs text-neutral-500 px-2 py-1">
                +{item.tags.length - 3} thêm
              </span>
            )}
          </div>

          {/* Date */}
          <div className="flex items-center gap-1 text-xs text-neutral-500 mt-auto">
            <Calendar className="w-3 h-3" />
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
