"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Calendar,
  Tag,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MediaItem } from "./MediaCard";

interface MediaDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: MediaItem | null;
  relatedItems: MediaItem[];
}

export const MediaDetailPopup: React.FC<MediaDetailPopupProps> = ({
  isOpen,
  onClose,
  selectedItem,
  relatedItems = [],
}) => {
  const [currentItem, setCurrentItem] = useState<MediaItem | null>(
    selectedItem
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (selectedItem) {
      setCurrentItem(selectedItem);
      const index = relatedItems.findIndex(
        (item) => item.id === selectedItem.id
      );
      setCurrentIndex(index >= 0 ? index : 0);
    }
  }, [selectedItem, relatedItems]);

  const handleItemSelect = (item: MediaItem, index: number) => {
    setCurrentItem(item);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : relatedItems.length - 1;
    handleItemSelect(relatedItems[newIndex], newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex < relatedItems.length - 1 ? currentIndex + 1 : 0;
    handleItemSelect(relatedItems[newIndex], newIndex);
  };

  if (!isOpen || !currentItem) return null;

  const isVideo = !!currentItem.video;
  const mediaUrl = currentItem.video || currentItem.image;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-white dark:bg-neutral-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold">{currentItem.title}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Hàng 1: Media chính và thông tin */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Media Display */}
              <div className="relative">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  {mediaUrl && (
                    <>
                      {isVideo ? (
                        <video
                          src={mediaUrl}
                          controls
                          className="w-full h-full object-cover"
                          poster={currentItem.image || undefined}
                        >
                          Trình duyệt của bạn không hỗ trợ video.
                        </video>
                      ) : (
                        <img
                          src={mediaUrl}
                          alt={currentItem.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </>
                  )}

                  {/* Video Overlay - chỉ hiển thị khi không có controls */}
                  {/* Bỏ video overlay vì đã có controls */}

                  {/* Media Type Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        isVideo
                          ? "bg-red-500/90 text-white"
                          : "bg-blue-500/90 text-white"
                      }`}
                    >
                      {isVideo ? "Video" : "Hình ảnh"}
                    </span>
                  </div>

                  {/* Navigation Arrows */}
                  {relatedItems.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePrevious}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-10 w-10 p-0"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-10 w-10 p-0"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Media Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentItem.tags.map((tag, index) => (
                      <span
                        key={tag.id || index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta Info */}
                <div className="space-y-2 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(currentItem.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {/* {currentItem.downloaded && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <Download className="w-4 h-4" />
                      <span>Lượt tải: {currentItem.downloaded}</span>
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            {/* Hàng 2: Carousel các items liên quan */}
            {relatedItems.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4">Media</h4>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {[selectedItem as any, ...relatedItems].map((item, index) => {
                    const itemIsVideo = !!item.video;
                    const itemMediaUrl = item.video || item.image;
                    const isSelected = item.id === currentItem.id;

                    return (
                      <div>
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`cursor-pointer rounded-lg overflow-hidden h-full`}
                          onClick={() => handleItemSelect(item, index)}
                        >
                          <Card
                            className={`w-48 h-full transition-all duration-200 pt-0 gap-0 ${
                              isSelected
                                ? "border border-vina-primary"
                                : "shadow-sm hover:shadow-md"
                            }`}
                          >
                            <div className="relative aspect-video overflow-hidden">
                              {itemMediaUrl && (
                                <img
                                  src={itemMediaUrl}
                                  alt={item.title}
                                  className="w-full h-full rounded-t-xl object-cover"
                                />
                              )}

                              {/* Video Overlay */}
                              {itemIsVideo && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                  <div className="bg-white/90 rounded-full p-2">
                                    <Play
                                      className="w-4 h-4 text-vina-primary"
                                      fill="currentColor"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Media Type Badge */}
                              <div className="absolute top-2 left-2">
                                <span
                                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                    itemIsVideo
                                      ? "bg-red-500/90 text-white"
                                      : "bg-blue-500/90 text-white"
                                  }`}
                                >
                                  {itemIsVideo ? "Video" : "Ảnh"}
                                </span>
                              </div>
                            </div>

                            <CardContent className="p-3">
                              <h5 className="font-medium text-sm line-clamp-2 mb-1">
                                {item.title}
                              </h5>
                              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                {item.description}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
