import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';


import { connect } from 'react-redux';
import {getPostById, fetchPublishedById} from '../../../redux/postRedux';
import {getUserStatus} from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';

import {NotFound} from '../../views/NotFound/NotFound';


import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';




const Component = ({className, children, loggedUser, getPublishedById, fetchPublishedPostsById}) => {

  useEffect(() => {(fetchPublishedPostsById());}, [fetchPublishedPostsById]);

  const {author, title, text, photo, phone, location, price, created, updated, _id} = getPublishedById;


  const [formContent, setFormContent]= useState({
    location: '',
    phone: '',
    email: '',
    title: '',
    price: '',
    text: '',
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormContent({
      ...formContent,
      [name]: value,
    });
  }; 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formContent);
  };

  const renderIfAuthorOrAdmin = () => {
    if((author === loggedUser.mail) || loggedUser.admin === true) {
      return (
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
                  <Typography variant="h5" component="h2">
                  Price: {price} €
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  Description: {text} 
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Paper>
          <Paper className={styles.form}>
            <form className={styles.formContainer} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField id="outlined-basic" label="Phone number" variant="outlined" value={phone} name="phone" onChange={handleOnChange} required/>
              <TextField id="outlined-basic" label="Email" type="email" variant="outlined"  defaultValue={author} name="email" onChange={handleOnChange} required/>
              <TextField id="outlined-basic" label="Title" variant="outlined" name="title" defaultValue={title} onChange={handleOnChange} required/>
              <TextField id="outlined-basic" label="Location" variant="outlined" name="location" defaultValue={location} onChange={handleOnChange} required/>
              <TextField id="outlined-basic" label="Price" variant="outlined" name="price" defaultValue={price} onChange={handleOnChange} required/>
              <TextField id="outlined-multiline-static" label="Description" multiline rows={4} defaultValue={text} variant="outlined" name="description" onChange={handleOnChange} required/>
              <Button variant="contained" color="primary" type="submit">Confirm your change</Button>
            </form>
          </Paper>
        </div>
      );
    } else {
      return <NotFound></NotFound>;
    }
  };
  
  return(
    <div>
      {renderIfAuthorOrAdmin()}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  postById: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  loggedUser: PropTypes.object,
  getPublishedById: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  fetchPublishedPostsById: PropTypes.func,
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
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
