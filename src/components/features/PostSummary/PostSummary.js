import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {Link} from 'react-router-dom';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostSummary.module.scss';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const Component = ({className, title, author, _id}) => {

  return (
    <div className={clsx(className, styles.root)}>
      <Link to={`/post/${_id}`}>
        <Card key={title} className={styles.card}>
          <CardActionArea>
            <CardMedia
              className={styles.cardMedia}
              image={'img'}
              title={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Author: {author} 
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
  _id: PropTypes.string,
  photo: PropTypes.string,
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(null),
  ]),

};

export {
  Component as PostSummary,
  // Container as PostSummary,
  Component as PostSummaryComponent,
};
