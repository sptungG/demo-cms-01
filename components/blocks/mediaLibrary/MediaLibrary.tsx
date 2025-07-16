"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { MediaCard, MediaItem } from "./MediaCard";
import { FilterSidebar, FilterOptions } from "./FilterSidebar";

import { Template } from "tinacms";
import SimplePagination from "@/components/ui/simple-pagination";
import { uuidv4 } from "@/lib/utils";
import { MediaDetailPopup } from "./MediaDetailPopup";

export type TMediaLibrary = Partial<{
  heading?: string;
  description?: string;
  mediaItems?: MediaItem[];
  filterContent?: {
    title?: string;
    allLabel?: string;
    imageLabel?: string;
    videoLabel?: string;
  };
  resultLabel?: {
    viewLabel?: string;
    totalLabel?: string;
  };
}>;
interface MediaLibraryProps {
  data: TMediaLibrary;
}

const ITEMS_PER_PAGE = 12;

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    selectedTags: [],
    mediaType: "all",
    dateRange: "all",
  });

  const mediaItems = data.mediaItems ?? [];

  // Get all available tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    mediaItems?.forEach((item) => {
      item.tags?.forEach((tag) => tags.add(tag.label ?? ""));
    });
    return Array.from(tags).sort();
  }, [mediaItems]);

  // Filter items based on current filters
  const filteredItems = useMemo(() => {
    return (
      mediaItems?.filter((item) => {
        // Search term filter
        if (filters.searchTerm) {
          const searchLower = filters.searchTerm.toLowerCase();
          const matchesSearch =
            item.title.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower) ||
            item.tags.some((tag) =>
              tag.label?.toLowerCase().includes(searchLower)
            );
          if (!matchesSearch) return false;
        }

        // Media type filter
        if (filters.mediaType !== "all") {
          if (filters.mediaType === "video" && !item.video) return false;
          if (filters.mediaType === "image" && !item.image) return false;
        }

        // Tags filter
        if (filters.selectedTags.length > 0) {
          const hasSelectedTag = filters.selectedTags.some(
            (tag) =>
              item.tags.filter((itemTag) => itemTag.label === tag).length > 0
          );
          if (!hasSelectedTag) return false;
        }

        // Date range filter
        if (filters.dateRange !== "all") {
          const itemDate = new Date(item.createdAt);
          const now = new Date();
          const diffTime = now.getTime() - itemDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          switch (filters.dateRange) {
            case "week":
              if (diffDays > 7) return false;
              break;
            case "month":
              if (diffDays > 30) return false;
              break;
            case "year":
              if (diffDays > 365) return false;
              break;
          }
        }

        return true;
      }) ?? []
    );
  }, [mediaItems, filters]);

  // Paginate filtered items
  const totalPages = Math.ceil(filteredItems?.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  // Reset to first page when filters change
  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Handle page change with scroll
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const headingElement = document.getElementById("headingMediaLibrary");
    if (headingElement) {
      headingElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleItemClick = (item: MediaItem) => {
    setSelectedItem(item);
    // Here you could open a modal or navigate to detail page
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  return (
    <section className="">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(data.heading || data.description) && (
          <div className="text-center mb-6" id="headingMediaLibrary">
            {data.heading && (
              <h2 className="text-3xl font-bold text-vina-primary mb-2">
                {data.heading}
              </h2>
            )}
            {data.description && (
              <p className="text-md text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                {data.description}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          {/* Filter Sidebar */}
          <div className="px-2 sm:p-0 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              availableTags={availableTags}
              totalItems={mediaItems.length}
              filteredItems={filteredItems.length}
              filterContent={data.filterContent}
              resultLabel={data.resultLabel}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Media Grid */}
            {paginatedItems.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {paginatedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <MediaCard item={item} onClick={handleItemClick} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500 text-lg mb-4">No data</p>
                <p className="text-neutral-400">Please try again later!</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <SimplePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <MediaDetailPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        selectedItem={selectedItem}
        relatedItems={selectedItem?.items as any}
      />
    </section>
  );
};

// TinaCMS Template
export const mediaLibraryTemplate: Template = {
  name: "mediaLibrary",
  label: "Thư viện Media/Media Library",
  fields: [
    {
      type: "string",
      name: "heading",
      label: "Tiêu đề/Title",
    },
    {
      type: "string",
      name: "description",
      label: "Mô tả/Description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      name: "filterContent",
      label: "Nội dung bộ lọc/Filter content",
      fields: [
        {
          name: "title",
          label: "Tiêu đề",
          type: "string",
        },
        {
          name: "allLabel",
          label: "Lọc tất cả/All label",
          type: "string",
        },
        {
          name: "imageLabel",
          label: "Nhãn hình ảnh/Image label",
          type: "string",
        },
        {
          name: "videoLabel",
          label: "Nhãn video/Video label",
          type: "string",
        },
      ],
    },
    {
      name: "resultLabel",
      label: "Nhãn kết quả/Result label",
      type: "object",
      fields: [
        {
          name: "viewLabel",
          label: "Nhãn hiển thị/View label",
          type: "string",
        },
        {
          name: "totalLabel",
          label: "Nhãn tổng/Total label",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      name: "mediaItems",
      label: "Danh sách Media/List medias",
      list: true,
      ui: {
        defaultItem() {
          if (typeof window === "undefined") return {};
          return {
            id: uuidv4(),
          };
        },
        itemProps(item) {
          return {
            label: item?.title,
            id: item?.id,
          };
        },
      },
      fields: [
        {
          type: "string",
          name: "id",
          label: "ID",
          ui: {
            component: "hidden",
          },
        },
        {
          type: "string",
          name: "title",
          label: "Tiêu đề/Title",
        },
        {
          type: "string",
          name: "description",
          label: "Mô tả/Description",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "image",
          name: "image",
          label: "Hình ảnh/Image",
        },
        {
          type: "string",
          name: "video",
          label: "Video URL/Video URL",
        },
        {
          type: "object",
          name: "tags",
          label: "Tags",
          list: true,
          ui: {
            defaultItem() {
              if (typeof window === "undefined") return {};
              return {
                id: uuidv4(),
              };
            },
            itemProps(item) {
              return {
                label: item?.label,
                id: item?.id,
              };
            },
          },
          fields: [
            {
              type: "string",
              name: "id",
              label: "ID",
              ui: {
                component: "hidden",
              },
            },
            {
              type: "string",
              name: "label",
              label: "Nhãn/Label",
            },
          ],
        },
        {
          type: "datetime",
          name: "createdAt",
          label: "Ngày tạo/Created At",
        },
        {
          type: "number",
          name: "dowloaded",
          label: "Lượt tải/Dowload",
        },
        {
          name: "items",
          label: "Media liên quan/Related Media",
          type: "object",
          list: true,
          fields: [
            {
              type: "string",
              name: "id",
              label: "ID",
              ui: {
                component: "hidden",
              },
            },
            {
              type: "string",
              name: "title",
              label: "Tiêu đề/Title",
            },
            {
              type: "string",
              name: "description",
              label: "Mô tả/Description",
              ui: {
                component: "textarea",
              },
            },
            {
              type: "image",
              name: "image",
              label: "Hình ảnh/Image",
            },
            {
              type: "string",
              name: "video",
              label: "Video URL/Video URL",
            },
            {
              type: "object",
              name: "tags",
              label: "Tags",
              list: true,
              ui: {
                defaultItem() {
                  if (typeof window === "undefined") return {};
                  return {
                    id: uuidv4(),
                  };
                },
                itemProps(item) {
                  return {
                    label: item?.label,
                    id: item?.id,
                  };
                },
              },
              fields: [
                {
                  type: "string",
                  name: "id",
                  label: "ID",
                  ui: {
                    component: "hidden",
                  },
                },
                {
                  type: "string",
                  name: "label",
                  label: "Nhãn/Label",
                },
              ],
            },
            {
              type: "datetime",
              name: "createdAt",
              label: "Ngày tạo/Created At",
            },
            {
              type: "number",
              name: "dowloaded",
              label: "Lượt tải/Dowload",
            },
          ],
        },
      ],
    },
  ],
};
