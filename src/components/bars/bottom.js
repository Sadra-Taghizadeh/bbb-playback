import React from 'react';
import {
  FaStepBackward,
  FaPlay,
  FaPause,
  FaStepForward,
  FaVolumeUp,
  FaCog
} from 'react-icons/fa';
import './index.scss';

const Bottom = ({ isPlaying, togglePlay }) => {
  return (
      <div className="bottom-bar">
        <div className="control-group">
          <button className="control-button">
            <FaStepBackward className="icon" />
            <span className="label">قبلی</span>
          </button>
          <button
              className="control-button primary-button"
              onClick={togglePlay}
          >
            {isPlaying ? (
                <>
                  <FaPause className="icon" />
                  <span className="label">توقف</span>
                </>
            ) : (
                <>
                  <FaPlay className="icon" />
                  <span className="label">پخش</span>
                </>
            )}
          </button>
          <button className="control-button">
            <FaStepForward className="icon" />
            <span className="label">بعدی</span>
          </button>
        </div>

        <div className="control-group">
          <button className="control-button">
            <FaVolumeUp className="icon" />
            <span className="label">صدا</span>
          </button>
          <button className="control-button">
            <FaCog className="icon" />
            <span className="label">تنظیمات</span>
          </button>
        </div>
      </div>
  );
};

// Avoid re-render
const areEqual = (prevProps, nextProps) => {
  return prevProps.isPlaying === nextProps.isPlaying;
};

export default React.memo(Bottom, areEqual);