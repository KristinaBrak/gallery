import "./Gallery.css";

export type GalleryItem = {
  id: string;
  src: string;
  ref?: React.Ref<HTMLLIElement>;
  label: string;
};

export type GalleryProps = {
  items: GalleryItem[];
};

// item width + gap
const IMAGE_WIDTH = 316;

const getMissingImagesCount = (images: GalleryItem[]) => {
  const countPerLine = Math.floor(window.innerWidth / IMAGE_WIDTH);
  return countPerLine - (images.length % countPerLine);
};

/**
 * Get empty images to fill the last row of the gallery
 */
const getEmptyImages = (images: GalleryItem[]): GalleryItem[] => {
  const missing = getMissingImagesCount(images);
  return Array.from({ length: missing }, (_, idx) => ({
    id: (images.length + idx).toString(),
    src: "",
    label: "",
  }));
};

const getAllItems = (items: GalleryItem[]) => [
  ...items,
  ...getEmptyImages(items),
];

const Gallery = ({ items }: GalleryProps) => (
  <ul className="gallery">
    {getAllItems(items).map((item, idx) => (
      <li key={idx} tabIndex={0} ref={item.ref}>
        <img id={item.id} loading="lazy" src={item.src} alt={item.label} />
        <label htmlFor={item.id} className="label">
          {item.label}
        </label>
      </li>
    ))}
  </ul>
);

export default Gallery;
