import React from 'react';
import PropTypes from 'prop-types';

import s from './AllOpenRoles.scss';

const AllOpenRoles = ({ children }) => (
  <div className={s.allOpenRoles}>
    <div className={s.allOpenRoles__container}>

      <div className={s.allOpenRoles__action}>
        {children}
      </div>
    </div>
  </div>
);

AllOpenRoles.propTypes = {
  children: PropTypes.node,
};

export default AllOpenRoles;
