import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './NotFound.module.scss';

import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

const Component = ({className, children}) => (

  <div className={clsx(className, styles.root)}>
    <svg className={styles.image} xmlns="http://www.w3.org/2000/svg" height="400" viewBox="0 0 58 46" width="400"><g id="Page-1" fill="none" fillRule="evenodd"><g id="037---404-Page" fillRule="nonzero"><path id="Shape" d="m6 46h-2c-2.209139 0-4-1.790861-4-4v-38c0-2.209139 1.790861-4 4-4h50c2.209139 0 4 1.790861 4 4v38c0 2.209139-1.790861 4-4 4z" fill="#35495e"/><path id="Shape" d="m58 4v4h-58v-4c0-2.209139 1.790861-4 4-4h50c2.209139 0 4 1.790861 4 4z" fill="#3b97d3"/><path id="Shape" d="m32 3h-6c-.5522847 0-1 .44771525-1 1s.4477153 1 1 1h6c.5522847 0 1-.44771525 1-1s-.4477153-1-1-1z" fill="#2980ba"/><path id="Shape" d="m54 3h-11c-.5522847 0-1 .44771525-1 1s.4477153 1 1 1h11c.5522847 0 1-.44771525 1-1s-.4477153-1-1-1z" fill="#2980ba"/><circle id="Oval" cx="4" cy="4" fill="#ff5364" r="1"/><circle id="Oval" cx="8" cy="4" fill="#f0c419" r="1"/><circle id="Oval" cx="12" cy="4" fill="#65ddb9" r="1"/><g fill="#e64c3c"><path id="Shape" d="m17 31c0 .5522847.4477153 1 1 1s1-.4477153 1-1v-2h2c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1h-2v-2c0-.5522847-.4477153-1-1-1s-1 .4477153-1 1v2h-5.211l7.063-11.476c.2539327-.4666582.0986357-1.0504199-.3536085-1.3292152-.4522443-.2787953-1.0435494-.1552918-1.3463915.2812152l-7.066 11.477c-.37917312.6171256-.39505786 1.3910301-.041527 2.0231948.3535309.6321646 1.0212231 1.0237866 1.745527 1.0238052h5.21z"/><path id="Shape" d="m47 27h-2v-2c0-.5522847-.4477153-1-1-1s-1 .4477153-1 1v2h-5.211l7.063-11.476c.2110153-.3041508.2367456-.6999905.0668803-1.0288992-.1698654-.3289087-.5075332-.537071-.8776942-.5410726s-.71225.1968122-.8891861.5219718l-7.066 11.477c-.3791731.6171256-.3950579 1.3910301-.041527 2.0231948.3535309.6321646 1.0212231 1.0237866 1.745527 1.0238052h5.21v2c0 .5522847.4477153 1 1 1s1-.4477153 1-1v-2h2c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1z"/><path id="Shape" d="m28 32h2c2.209139 0 4-1.790861 4-4v-10c0-2.209139-1.790861-4-4-4h-2c-2.209139 0-4 1.790861-4 4v10c0 2.209139 1.790861 4 4 4zm-2-14c0-1.1045695.8954305-2 2-2h2c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-2c-1.1045695 0-2-.8954305-2-2z"/></g><path id="Shape" d="m41 37h-24c-.5522847 0-1 .4477153-1 1s.4477153 1 1 1h24c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1z" fill="#c03a2b"/><path id="Shape" d="m32 41h-6c-.5522847 0-1 .4477153-1 1s.4477153 1 1 1h6c.5522847 0 1-.4477153 1-1s-.4477153-1-1-1z" fill="#c03a2b"/></g></g></svg>
    <h2>Oops! Page not found</h2>
    <p>Sorry, but the page you are looking for is not found. Why not check out other links?</p>
    <NavLink to='/'>
      <Button
        variant="contained"
        color="default"
        startIcon={<HomeIcon />}
      >
        Go to Home
      </Button>
    </NavLink>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
