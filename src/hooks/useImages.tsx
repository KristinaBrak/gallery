import { useEffect, useState } from "react";
import { getImages, getImageUrl, type PicsumImage } from "../services/picsum";

export const useImages = ({ page }: { page?: number } = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<PicsumImage[]>([]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const imageList = await getImages({ page });
        timeout = setTimeout(() => {
          setLoading(false);
          setImages((prev) => [
            ...prev,
            ...imageList.map((image: PicsumImage) => ({
              ...image,
              url: getImageUrl(image.id),
            })),
          ]);
        }, 1000);
      } catch (e) {
        console.error(e);
        setLoading(false);
        setError(e as string);
      }
    };

    fetchImages();

    return () => clearTimeout(timeout);
  }, [page]);

  return { images, loading, error };
};
