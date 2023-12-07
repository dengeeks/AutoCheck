import React from 'react';
import './VideoAnimation.css';

import textAnimationWebM from '../../media/video/textAnimation.webm';
import textAnimationMP4 from '../../media/video/textAnimation.mp4';
import whiteCarWebM from '../../media/video/whiteCar.webm';
import whiteCarMP4 from '../../media/video/whiteCar.mp4';


const VideoAnimation = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="text-animation-video" loading="lazy">
        {/* Video with text scrolling */}
        <source src={textAnimationWebM}  type="video/webm" />
        <source src={textAnimationMP4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <video autoPlay loop muted className="white-car-video" loading="lazy">
        {/* Video with white car */}
        <source src={whiteCarWebM} type="video/webm" />
        <source src={whiteCarMP4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoAnimation;