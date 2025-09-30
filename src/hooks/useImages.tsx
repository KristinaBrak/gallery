import { useEffect, useState } from "react";
import { getImages, getImageUrl } from "../services/picsum";

export const useImages = ({page}: {page?: number} = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const imageList = await getImages({page});
        setImages((prev) => [
          ...prev,
        //   TODO: i type
          ...imageList.map((i: any)=>({...i, url: getImageUrl(i.id)})),
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
