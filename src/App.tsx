import { useEffect, useState } from "react";
import "./App.css";
import { getImages, getImageUrl } from "./services/picsum";

const App = () =>  {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const image = await getImages();
        setImages((prev) => [...prev, ...image.map((i: any) => getImageUrl(i.id))]);
      } catch (e) {
        console.error(e);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      {images.map((url, idx) => (
        <img key={idx} src={url} alt="image" />
      ))}
    </div>
  );
}

export default App;
