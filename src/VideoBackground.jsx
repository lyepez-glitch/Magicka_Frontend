import PropTypes from 'prop-types';

const VideoBackground = ({ children }) => {
  return (
    <div className="videoBackgroundContainer relative w-[80vw] !h-[70vh] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="MagickaBackground.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* <div className="absolute bg-black/50 inset-0 backdrop-blur-md flex items-center justify-center z-10">
        {children}
      </div> */}
      {children}
    </div>
  );
};
VideoBackground.propTypes = {
  children: PropTypes.node,
};

export default VideoBackground;
