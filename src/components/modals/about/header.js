import React from 'react';
import moment from 'moment-jalaali';
import { date } from 'config';
import storage from 'utils/data/storage';
import './index.scss';

// Configure moment-jalaali to use Jalali calendar
moment.loadPersian({ dialect: 'persian-modern' });

const Header = () => {
  const {
    end,
    name,
    start,
  } = storage.metadata;

  const subtitle = [];
  if (date.enabled) {
    const startMoment = moment(start);
    const endMoment = moment(end);

    // Format Jalali date (e.g., "۱۵ آذر ۱۴۰۲")
    subtitle.push(
        <span key="date">
        {startMoment.format('jD jMMMM jYYYY')}
      </span>
    );

    // Format start time (e.g., "۱۴:۳۰")
    subtitle.push(
        <span key="start-time">
        {startMoment.format('HH:mm')}
      </span>
    );

    // Format end time (e.g., "۱۶:۱۵")
    subtitle.push(
        <span key="end-time">
        {endMoment.format('HH:mm')}
      </span>
    );
  }

  return (
      <div className="about-header">
        <div className="title">
          {name}
        </div>
        <div className="subtitle">
          {subtitle.map((s, index) => (
              <div key={index} className="item">{s}</div>
          ))}
        </div>
      </div>
  );
};

export default Header;