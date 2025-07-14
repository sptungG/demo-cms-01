import React from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

// YouTube ID extraction utility
function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([-\w]{11})/
  );
  return match ? match[1] : null;
}

// Default components for TinaMarkdown
const defaultComponents = {
  youtubeEmbed: ({ url }: { url: string }) => {
    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return (
        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
          <p className="text-gray-500">Invalid YouTube URL</p>
        </div>
      );
    }

    return (
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg my-6">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    );
  },
  // Có thể thêm các component khác ở đây
  codeBlock: ({ children, lang }: { children: React.ReactNode; lang?: string }) => {
    return (
      <div className="relative">
        {lang && (
          <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono rounded-t-lg">
            {lang}
          </div>
        )}
        <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto ${lang ? 'rounded-b-lg' : 'rounded-lg'}`}>
          <code>{children}</code>
        </pre>
      </div>
    );
  },
  callout: ({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "error" | "success" }) => {
    const typeStyles = {
      info: "bg-blue-50 border-blue-200 text-blue-800",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
      error: "bg-red-50 border-red-200 text-red-800",
      success: "bg-green-50 border-green-200 text-green-800"
    };
    
    return (
      <div className={`border-l-4 p-4 my-4 rounded-r-lg ${typeStyles[type]}`}>
        {children}
      </div>
    );
  }
};

interface CustomTinaMarkdownProps {
  content: TinaMarkdownContent;
  components?: Record<string, React.ComponentType<any>>;
  className?: string;
}

const CustomTinaMarkdown: React.FC<CustomTinaMarkdownProps> = ({
  content,
  components = {},
  className = "prose max-w-none"
}) => {
  // Merge default components with custom components
  const mergedComponents = {
    ...defaultComponents,
    ...components
  };

  return (
    <div className={className}>
      <TinaMarkdown
        content={content}
        components={mergedComponents}
      />
    </div>
  );
};

export default CustomTinaMarkdown;
export { extractYouTubeId, defaultComponents };