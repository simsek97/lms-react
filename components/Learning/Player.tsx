import React, { useEffect, useState } from 'react';

const Player = ({ videoSrc }) => {
  const [src, setSrc] = useState(videoSrc);

  const ext = videoSrc.split('.').pop();

  console.log(ext);

  useEffect(() => {
    setSrc(videoSrc);
  }, [videoSrc]);

  return (
    <div className='video-content-box'>
      {(ext === 'html' && (
        <iframe
          name='html5Player'
          src={src}
          title={src}
          width='100%'
          height='100%'
          allowFullScreen={true}
          style={{
            border: 'none',
            minHeight: '750px'
          }}
        />
      )) || (
        <video key={src} width='100%' height='100%' controls>
          <source src={src && src} type='video/mp4' />
        </video>
      )}
    </div>
  );
};

export default Player;
