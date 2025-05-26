import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages,
  useIntl,
} from 'react-intl';
import cx from 'classnames';
import {
  controls as config,
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

const Title = ({ openAbout }) => {
  const intl = useIntl();
  const courseNumber = storage.metadata.coursenumber;

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
          {courseNumber ? (
              <>{courseNumber}</>
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
        {courseNumber ? (
            <> - Course {courseNumber}</>
        ) : null}
    </span>
  );
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;