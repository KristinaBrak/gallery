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

const Gallery = ({ items }: GalleryProps) => {
  return (
    <ul className="gallery">
      {items.map((item, idx) => (
        <li key={idx} tabIndex={0} ref={item.ref}>
          <img loading="lazy" src={item.src} alt={item.label}  />
          <label className="label">{item.label}</label>
        </li>
      ))}
    </ul>
  );
};

export default Gallery;
