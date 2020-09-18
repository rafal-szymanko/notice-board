import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import {getAllPublished, getUserStatus, fetchPublishedById} from '../../../redux/postsRedux';

import styles from './Post.module.scss';

import {Link} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';



const Component = ({className, fetchPublishedPostsById, getPublishedById}) => {

  useEffect(() => {(fetchPublishedPostsById());}, [fetchPublishedPostsById]);

  // const {author, text} = getPublishedById;

  // const renderIfAuthor = (postAuthorId, loggedUserId) => {
  //   if(loggedUserId === postAuthorId) {
  //     return (
  //       <Link to={`/post/${_id}/edit`}>
  //         <Button
  //           variant="contained"
  //           color="default"
  //           startIcon={<EditIcon />}
  //         >
  //           Edit your Ad
  //         </Button>
  //       </Link>
  //     );
  //   }
  // };

  return(
    <div className={clsx(className, styles.root)}>
      <Paper className={styles.description}>
        <Card className={styles.card}>
          <CardActionArea>
            <CardMedia
              className={styles.cardMedia}
              image={'img'}
              title={'title'}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2">
                Title: 
              </Typography>
              <Typography variant="h5" component="h2">
                Price: €
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Description:
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
      <div className={styles.contactContainer}>
        <Paper className={styles.contact}>
          <h2>Contact: </h2>
          <p>Email:</p>
        </Paper>
        {/* {renderIfAuthor(userId, loggedUserId)} */}
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loggedUserId: PropTypes.number,
  fetchPublishedPostsById: PropTypes.func,
  getPublishedById: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const mapStateToProps = (state, props) => ({
  getPublishedById: getAllPublished(state),
  loggedUserId: getUserStatus(state),
});


const mapDispatchToProps = (dispatch, props) => ({
  fetchPublishedPostsById: () => dispatch(fetchPublishedById(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);


export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
