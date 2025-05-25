import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages,
  useIntl,
  FormattedDate,
} from 'react-intl';
import cx from 'classnames';
import {
  controls as config,
  date,
} from 'config';
import { handleOnEnterPress } from 'utils/data/handlers';
import storage from 'utils/data/storage';
import layout from 'utils/layout';
import './index.scss';

const intlMessages = defineMessages({
  about: {
    id: 'button.about.aria',
    description: 'Aria label for the about button',
  },
});

const propTypes = { openAbout: PropTypes.func };

const defaultProps = { openAbout: () => {} };

// Jalali date conversion utility
const toJalali = (date) => {
  const gregorianDate = new Date(date);

  // Get Gregorian date components
  const gy = gregorianDate.getFullYear();
  const gm = gregorianDate.getMonth() + 1;
  const gd = gregorianDate.getDate();

  // Conversion algorithm from Gregorian to Jalali
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  let jy, jm, jd;

  if (gy <= 1600) {
    jy = 0;
    gy -= 621;
  } else {
    jy = 979;
    gy -= 1600;
  }

  if (gm > 2) {
    gy2 = gy + 1;
  } else {
    gy2 = gy;
  }

  const days = (365 * gy) + ((gy2 + 3) / 4) + g_d_m[gm - 1] + gd;

  if (gm > 2) {
    days -= ((gy2 % 4 === 0) && (gy2 % 100 !== 0)) || (gy2 % 400 === 0) ? 1 : 2;
  }

  jy += 33 * Math.floor(days / 12053);
  days %= 12053;

  jy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }

  return { year: jy, month: jm, day: jd };
};

// Format Jalali date
const formatJalaliDate = (date) => {
  const jalali = toJalali(date);
  const monthNames = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  return `${jalali.day} ${monthNames[jalali.month - 1]} ${jalali.year}`;
};

const Title = ({ openAbout }) => {
  const intl = useIntl();

  // Use Jalali formatting instead of FormattedDate
  const startDate = new Date(storage.metadata.start);
  const jalaliStart = formatJalaliDate(startDate);

  // Update document title when component mounts or metadata changes
  useEffect(() => {
    if (storage.metadata.name) {
      document.title = storage.metadata.name;
    }
  }, [storage.metadata.name]);

  const interactive = layout.control && config.about;
  if (!interactive) {
    return (
        <span className="title">
        {storage.metadata.name}
          {date.enabled ? (
              <> - {jalaliStart}</>
          ) : null}
      </span>
    );
  }

  return (
      <span
          aria={intl.formatMessage(intlMessages.about)}
          className={cx('title', { interactive })}
          onClick={openAbout}
          onKeyPress={event => handleOnEnterPress(event, openAbout)}
          tabIndex="0"
      >
      {storage.metadata.name}
        {date.enabled ? (
            <> - {jalaliStart}</>
        ) : null}
    </span>
  );
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;