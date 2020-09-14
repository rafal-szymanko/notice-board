import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import {getPostByID, getUserStatus} from '../../../redux/postsRedux';

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



const Component = ({className, postById, loggedUserId}) => {

  const {description, price, mail, contact, title, image, phone, id, userId} = postById;

  const renderIfAuthor = (postAuthorId, loggedUserId) => {
    if(loggedUserId === postAuthorId) {
      return (
        <Link to={`/post/${id}/edit`}>
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
              image={'img'}
              title={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2">
                {title}
              </Typography>
              <Typography variant="h5" component="h2">
                Price: {price} €
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Description: {description} 
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
      <div className={styles.contactContainer}>
        <Paper className={styles.contact}>
          <h2>Contact: {contact}</h2>
          <p>Mail: {mail}</p>
          <p>Phone number : {phone}</p>
        </Paper>
        {renderIfAuthor(userId, loggedUserId)}
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  postById: PropTypes.object,
  loggedUserId: PropTypes.number,
};

const mapStateToProps = (state, props) => ({
  postById: getPostByID(state, Number(props.match.params.id)),
  loggedUserId: getUserStatus(state),
});


// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const Container = connect(mapStateToProps)(Component);


export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
