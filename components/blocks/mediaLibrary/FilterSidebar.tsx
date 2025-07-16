import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Image, Video, Calendar, Tag, X, Grid } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface FilterOptions {
  searchTerm: string;
  mediaType: "all" | "image" | "video";
  dateRange: "all" | "week" | "month" | "year";
  selectedTags: string[];
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableTags: string[];
  filteredItems: number;
  totalItems: number;
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
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  availableTags,
  filteredItems,
  totalItems,
  filterContent,
  resultLabel,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.searchTerm);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== filters.searchTerm) {
        onFiltersChange({
          ...filters,
          searchTerm: localSearchTerm,
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm]);

  const updateFilters = useCallback(
    (newFilters: Partial<FilterOptions>) => {
      onFiltersChange({
        ...filters,
        ...newFilters,
      });
    },
    [filters, onFiltersChange]
  );

  const toggleTag = useCallback(
    (tag: string) => {
      const newSelectedTags = filters.selectedTags.includes(tag)
        ? filters.selectedTags.filter((t) => t !== tag)
        : [...filters.selectedTags, tag];

      updateFilters({ selectedTags: newSelectedTags });
    },
    [filters.selectedTags, updateFilters]
  );

  const clearFilters = useCallback(() => {
    setLocalSearchTerm("");
    onFiltersChange({
      searchTerm: "",
      mediaType: "all",
      dateRange: "all",
      selectedTags: [],
    });
  }, [onFiltersChange]);

  const FilterContent = () => (
    <div className="space-y-2">
      {/* Media Type Filter */}
      <Card className="shadow-sm gap-2">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Grid className="w-4 h-4" />
            {filterContent?.title ?? "Lọc media"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {[
              {
                value: "all",
                label: filterContent?.allLabel ?? "Tất cả",
                Icon: Grid,
              },
              {
                value: "image",
                label: filterContent?.imageLabel ?? "Hình ảnh",
                Icon: Image,
              },
              {
                value: "video",
                label: filterContent?.videoLabel ?? "Video",
                Icon: Video,
              },
            ].map(({ value, label, Icon }) => (
              <button
                key={value}
                onClick={() =>
                  updateFilters({
                    mediaType: value as FilterOptions["mediaType"],
                  })
                }
                className={`text-sm w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors ${
                  filters.mediaType === value
                    ? "bg-vina-primary text-white shadow-sm"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Tags Filter */}
      <Card className="shadow-sm gap-0">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Tag className="w-4 h-4 lg:w-5 lg:h-5" />
            Tags ({filters.selectedTags.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 lg:max-h-60 overflow-y-auto">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`w-full flex items-center justify-between px-3 py-2 lg:py-3 rounded-lg text-left transition-colors text-sm ${
                  filters.selectedTags.includes(tag)
                    ? "bg-vina-primary text-white shadow-sm"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
                {filters.selectedTags.includes(tag) && (
                  <X className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="text-center space-y-2">
            <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">
              {resultLabel?.viewLabel ?? "Hiển thị"}{" "}
              <span className="font-semibold text-vina-primary">
                {filteredItems}
              </span>
              / {totalItems} {resultLabel?.totalLabel ?? "Tổng"}
            </p>
            {(filters.searchTerm ||
              filters.selectedTags.length > 0 ||
              filters.mediaType !== "all" ||
              filters.dateRange !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full text-sm"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="relative">
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsMobileOpen(true)}
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <Filter className="w-4 h-4" />
          Filter ({filteredItems}/{totalItems})
          {(filters.searchTerm ||
            filters.selectedTags.length > 0 ||
            filters.mediaType !== "all" ||
            filters.dateRange !== "all") && (
            <span className="ml-auto bg-vina-primary text-white text-sm px-2 py-1 rounded-full">
              {
                [
                  filters.searchTerm && "Tìm kiếm",
                  filters.selectedTags.length > 0 &&
                    `${filters.selectedTags.length} tags`,
                  filters.mediaType !== "all" && "Loại",
                  filters.dateRange !== "all" && "Thời gian",
                ].filter(Boolean).length
              }
            </span>
          )}
        </Button>
      </div>

      <div className="hidden lg:block w-40 md:w-72">
        <FilterContent />
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-neutral-900 z-50 lg:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold">Fitler</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-4">
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
