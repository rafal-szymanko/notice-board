import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import {getPostById, fetchPublishedById} from '../../../redux/postRedux';
import {getUserStatus} from '../../../redux/postsRedux';

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



const Component = ({className, fetchPublishedPostsById, getPublishedById, loggedUser}) => {

  useEffect(() => {(fetchPublishedPostsById());}, [fetchPublishedPostsById]);

  console.log(getPublishedById);

  const {author, title, text, photo, phone, location, price, created, updated, _id} = getPublishedById;

  const parseData = (date) => {
    const [dateAndTime, localTime] = Date(date).split('GMT');
    return dateAndTime;
  };

  const renderIfAuthor = (postAuthor, loggedUser) => {
    if((postAuthor === loggedUser.mail) || loggedUser.admin === true) {
      return (
        <Link to={`/post/${_id}/edit`}>
          <Button
            variant="contained"
            color="default"
            startIcon={<EditIcon />}
          >
            Edit your Ad
          </Button>
        </Link>
      );
    }
  };

  return(
    <div className={clsx(className, styles.root)}>
      <Paper className={styles.description}>
        <Card className={styles.card}>
          <CardActionArea>
            <CardMedia
              className={styles.cardMedia}
              image={`http://localhost:8000/uploads/${photo}`}
              title={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2">
                {title}
              </Typography>
              <Typography variant="h6" component="h2">
                Price: {price ? price : 'to be agreed'}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                Description: {text}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                Created: {parseData(created)}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                Last update: {parseData(updated)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
      <div className={styles.contactContainer}>
        <Paper className={styles.contact}>
          <h2>Contact: </h2>
          <p>Email: {author}</p>
          {phone ? <p> Phone number: {phone}</p> : null}
          {location ? <p> Location: {location}</p> : null}
        </Paper>
        {renderIfAuthor(author, loggedUser)}
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loggedUser: PropTypes.object,
  fetchPublishedPostsById: PropTypes.func,
  getPublishedById: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const mapStateToProps = (state, props) => ({
  getPublishedById: getPostById(state),
  loggedUser: getUserStatus(state),
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
