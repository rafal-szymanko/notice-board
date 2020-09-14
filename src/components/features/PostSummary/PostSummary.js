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


const Component = ({className, children, title, image, id, price}) => {

  return (
    <div className={clsx(className, styles.root)}>
      <Link to={`/post/${id}`}>
        <Card key={title} className={styles.card}>
          <CardActionArea>
            <CardMedia
              className={styles.cardMedia}
              // image={img(`./${image}`)}
              image={'img'}
              title={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Price: {price} €
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
  description: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number,
  price: PropTypes.number,

};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostSummary,
  // Container as PostSummary,
  Component as PostSummaryComponent,
};
