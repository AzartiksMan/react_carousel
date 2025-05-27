import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  currentIndex: number;
  setCurrentIndex: (value: number | ((prev: number) => number)) => void;
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  currentIndex,
  setCurrentIndex,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const handleNextIndex = () => {
    const maxIndex = images.length - frameSize;

    if (infinite) {
      setCurrentIndex(prev => (prev + step) % images.length);
    } else {
      if (currentIndex >= maxIndex) {
        return;
      }

      setCurrentIndex(prev => Math.min(prev + step, maxIndex));
    }
  };

  const handlePrevIndex = () => {
    if (infinite) {
      setCurrentIndex(prev => (prev - step + images.length) % images.length);
    } else {
      if (currentIndex <= 0) {
        return;
      }

      setCurrentIndex(prev => Math.max(prev - step, 0));
    }
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={() => handlePrevIndex()}
        disabled={!infinite && currentIndex <= 0}
      >
        ←
      </button>

      <div
        className="Carousel__viewport"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => {
            return (
              <li key={image}>
                <img src={image} alt={`${index + 1}`} width={itemWidth} />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        onClick={() => handleNextIndex()}
        disabled={!infinite && currentIndex >= images.length - frameSize}
      >
        →
      </button>
    </div>
  );
};

export default Carousel;
