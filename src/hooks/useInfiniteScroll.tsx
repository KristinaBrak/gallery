import { useCallback, useRef, useState } from "react";
import { useImages } from "./useImages";
import { getImageUrl } from "../services/picsum";

export const useInfiniteScroll = () => {
  const [page, setPage] = useState(1);
  const { images, loading, error } = useImages({page});

  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const toData = (image: any, idx: number) => ({
    id: image.id,
    url: getImageUrl(image.id),
    ref: images.length === idx + 1 ? lastImageRef : undefined,
  });

  return { images: images.map(toData), loading, error };
};
