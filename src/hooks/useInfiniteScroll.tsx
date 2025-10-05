import { useCallback, useRef, useState } from "react";
import { useImages } from "./useImages";
import { type PicsumImage } from "../services/picsum";

export type Image = PicsumImage & {
  ref?: React.Ref<HTMLLIElement>;
};

export const useInfiniteScroll = (): {
  images: Image[];
  loading: boolean;
  error: string | null;
} => {
  const [page, setPage] = useState(1);
  const { images, loading, error } = useImages({ page });

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

  const toImageWithRef = (image: PicsumImage, idx: number) => ({
    ...image,
    ref: images.length === idx + 1 ? lastImageRef : undefined,
  });

  return { images: images.map(toImageWithRef), loading, error };
};
