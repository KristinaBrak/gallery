import { useEffect, useState } from "react";
import { getImages, getImageUrl, type PicsumImage } from "../services/picsum";

export const useImages = ({ page }: { page?: number } = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<PicsumImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const imageList = await getImages({ page });
        setImages((prev) => [
          ...prev,
          ...imageList.map((image: PicsumImage) => ({
            ...image,
            url: getImageUrl(image.id),
          })),
        ]);
      } catch (e) {
        console.error(e);
        setError(e as string);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page]);

  return { images, loading, error };
};
