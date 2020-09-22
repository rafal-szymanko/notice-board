import React from 'react';
import PropTypes from 'prop-types';

import {NotFound} from '../../views/NotFound/NotFound';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUserStatus, getPostByAuthor, fetchPublished} from '../../../redux/postsRedux';

import styles from './UserPosts.module.scss';

import {PostSummary} from '../../features/PostSummary/PostSummary';


const Component = ({className, posts, loggedUser}) => {

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.titleContainer}>
        <h1>Your offers</h1>
      </div>
      <div className={styles.postsContainer}>
        {loggedUser ? posts.map(post => <PostSummary key={post.id} {...post}/>) : <NotFound></NotFound>}
      </div>
    </div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  getUserStatus: PropTypes.object,
  posts: PropTypes.array,
  loggedUser: PropTypes.object,
};

const mapStateToProps = state => {
  const loggedUser = getUserStatus(state);
  const posts = getPostByAuthor(state, loggedUser.mail);
  return {
    loggedUser,
    posts,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});



const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  Container as UserPosts,
  Component as UserPostsComponent,
};
