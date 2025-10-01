import "./App.css";
import Gallery from "./Gallery/Gallery";
import { useInfiniteScroll, type Image } from "./hooks/useInfiniteScroll";

const App = () => {
  const { images, loading, error } = useInfiniteScroll();

  const toGalleryItems = (image: Image) => ({
    id: image.id,
    src: image.url,
    label: image.author,
    ref: image.ref,
  });

  return (
    <main className="app">
      {error && <div>Error while loading images...</div>}
      {!error && (
        <div className="gallery-container">
          <Gallery items={images.map(toGalleryItems)} />
        </div>
      )}
      {loading && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
    </main>
  );
};

export default App;
