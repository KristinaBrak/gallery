import "./App.css";
import Gallery from "./Gallery/Gallery";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

const App = () => {
  const { images } = useInfiniteScroll();

  const toGalleryItems = (image: any) => ({
    id: image.id,
    src: image.url,
    label: image.author,
    ref: image.ref,
  });

  return <main className="app"><Gallery items={images.map(toGalleryItems)} /></main>;
};

export default App;
