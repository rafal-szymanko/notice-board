import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';


import { connect } from 'react-redux';
import {getPostById, fetchPublishedById, addPutRequest} from '../../../redux/postRedux';
import {getUserStatus} from '../../../redux/postsRedux';

import {parseData} from '../../../utils/parseData';
import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';

import styles from './PostEdit.module.scss';

import {NotFound} from '../../views/NotFound/NotFound';


import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ImageUploader from 'react-images-upload';



const Component = ({className, loggedUser, getPublishedById, fetchPublishedPostsById, updatePost}) => {

  const [formContent, setFormContent]= useState({});

  const {author, title, text, photo, price, created, updated} = getPublishedById;


  useEffect(() => {(fetchPublishedPostsById());}, [fetchPublishedPostsById]);
  useEffect(() => {setFormContent(getPublishedById);}, [getPublishedById]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormContent({
      ...formContent,
      [name]: value,
    });
  };

  const handleOnChangeUpload = (files) => {
    setFormContent({
      ...formContent,
      photo: files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    for(let key of ['author', 'title', 'text', 'price', 'phone', 'location', 'created', 'status']) {
      formData.append(key, formContent[key]);
    }

    formData.append('photo', formContent.photo);
    formData.append('updated', new Date());
    updatePost(formData);
  };

  const renderIfAuthorOrAdmin = () => {
    if (isNotEmpty(formContent)) {
      if((author === loggedUser.mail || loggedUser.admin === true)) {
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
                    <Typography variant="h6" component="h2">
                      Price: {price ? price : 'to be agreed'}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Description: {text}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Created: {parseData(created, getPublishedById)}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Last update: {parseData(updated, getPublishedById)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
            <Paper className={styles.form}>
              <ValidatorForm className={styles.formContainer} noValidate autoComplete="off" onSubmit={handleSubmit} onError={errors => console.log(errors)}>
                <TextValidator className={styles.input} value={formContent.author} id="outlined-basic" label="Author" variant="outlined" name="author" onChange={handleOnChange} validators={['required', 'isEmail']} errorMessages={['this field is required', 'email is not valid']} />
                <TextValidator className={styles.input} value={formContent.phone ? formContent.phone : ''} id="outlined-basic" label="Phone number" variant="outlined" name="phone" onChange={handleOnChange} validators={['matchRegexp:^[0-9]']} errorMessages={['phone number is not valid']}/>
                <TextValidator className={styles.input} value={formContent.title} id="outlined-basic" label="Title" variant="outlined" name="title" onChange={handleOnChange} validators={['required']} errorMessages={['this field is required']}/>
                <TextValidator className={styles.input} value={formContent.location  ? formContent.location : ''} id="outlined-basic" label="Location" variant="outlined" name="location" onChange={handleOnChange}/>
                <TextValidator className={styles.input} value={formContent.price  ? formContent.price : ''} id="outlined-basic" label="Price" variant="outlined" name="price"onChange={handleOnChange} validators={['matchRegexp:^[0-9]']} errorMessages={['price is not valid']}/>
                <TextValidator className={styles.input} value={formContent.text} id="outlined-multiline-static" label="Description" multiline rows={4} variant="outlined" name="text" onChange={handleOnChange} validators={['required']} errorMessages={['this field is required']}/>
                <ImageUploader
                  withIcon={true}
                  buttonText='Choose image'
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  withPreview={true}
                  onChange={handleOnChangeUpload}
                  singleImage={true}
                  className={styles.imageInput}
                  fileContainerStyle ={{flexDirection: 'row'}}
                />
                <Button variant="contained" color="primary" type="submit">Confirm</Button>
              </ValidatorForm>
            </Paper>
          </div>
        );
      } else {
        return <NotFound></NotFound>;
      }
    } else {
      return (
        <div className={styles.progressContainer}>
          <CircularProgress style={{height: '150px', width: '150px'}} color="secondary" />
        </div>
      );
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
  updatePost: PropTypes.func,
};


const mapStateToProps = (state, props) => ({
  getPublishedById: getPostById(state),
  loggedUser: getUserStatus(state),
});


const mapDispatchToProps = (dispatch, props) => ({
  fetchPublishedPostsById: () => dispatch(fetchPublishedById(props.match.params.id)),
  updatePost: (post) => dispatch(addPutRequest(post, props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);


export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
