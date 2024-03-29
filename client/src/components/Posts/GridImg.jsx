import { ImageGrid } from "react-fb-image-video-grid";

const GridImg = ({ count, images }) => {
  const pic = (c, i) => {
    return (
      <img
        style={{ objectFit: "contain" }}
        src={c}
        alt={i}
        key={Math.random(i)}
      />
    );
  };

  return (
    <>
      {count >= 2 ? (
        <ImageGrid>
          {images
            .filter((arg, i) => (i + 1 <= count ? true : false))
            .map((a) => pic(a))}
        </ImageGrid>
      ) : (
        <ImageGrid>{pic(images[0])}</ImageGrid>
      )}
    </>
  );
};

export default GridImg;
