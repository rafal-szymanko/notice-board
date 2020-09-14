import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getUserStatus } from '../../../redux/postsRedux.js';

import {Link} from 'react-router-dom';

import {PostSummary} from '../../features/PostSummary/PostSummary';

import styles from './Homepage.module.scss';

import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';

const Component = ({className, userId, posts}) => {

  const renderIfLogged = (userId) => {
    if(userId) {
      return (
        <Link to={`/post/add`}>
          <Button
            variant="contained"
            // color="primary"
            startIcon={<AddBoxIcon />}
          >
          Add new ad
          </Button>
        </Link>
      );
    } 
  };

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.titleContainer}>
        <h1>Recently offers</h1>
        {renderIfLogged(userId)}
      </div>
      <div className={styles.postsContainer}>
        {posts.map(post => <PostSummary key={post.id} {...post}/>)}
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  userId: PropTypes.number,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  userId: getUserStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps )(Component);


// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
