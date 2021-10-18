import s from './imageGalleryItem.module.css'

const ImageGalleryItem = ({
  url,
  tags,
  toggleModal,
  handleSetLargeImageURL,
  largeImageURL,
}) => {
  const handleClick = e => {
    toggleModal();
    handleSetLargeImageURL({ largeImageURL, tags });
  };

  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={url}
        alt={tags}
        className={s.ImageGalleryItem_image}
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;