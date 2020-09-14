import React from 'react';
import PropTypes from 'prop-types';

import {NotFound} from '../../views/NotFound/NotFound';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUserStatus, getPostByAuthor } from '../../../redux/postsRedux';

import styles from './UserPosts.module.scss';

import {PostSummary} from '../../features/PostSummary/PostSummary';


const Component = ({className, posts, userId}) => {

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.titleContainer}>
        <h1>Your offers</h1>
      </div>
      <div className={styles.postsContainer}>
        {userId ? posts.map(post => <PostSummary key={post.id} {...post}/>) : <NotFound></NotFound>}
      </div>
    </div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  getUserStatus: PropTypes.object,
  posts: PropTypes.array,
  userId: PropTypes.number,
};

const mapStateToProps = state => {
  const userId = getUserStatus(state);
  const posts = getPostByAuthor(state, userId);
  return {
    userId,
    posts,
  };
};

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as UserPosts,
  Component as UserPostsComponent,
};
