import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { getUserStatus } from '../../../redux/postsRedux';
import { addPostRequest} from '../../../redux/postRedux';

import {useHistory} from 'react-router-dom';

import styles from './PostAdd.module.scss';
import { NotFound } from '../NotFound/NotFound';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ImageUploader from 'react-images-upload';



const Component = ({className, loggedUserId, addPost}) => {
  
  const [formContent, setFormContent]= useState({
    author: '',
    created: '',
    updated: '',
    status: 'draft',
    title: '',
    text: '',
    price: '',
    phone: '',
    photo: '',
    location: '',
  });

  const history = useHistory();

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

  const routeChange = () =>{ 
    history.goBack();
  };

  const handleSubmit = (event) => {
    event.preventDefault();    
    const formData = new FormData();
    console.log(formContent);

    for(let key of ['author', 'title', 'text', 'price', 'phone', 'location']) {
      formData.append(key, formContent[key]);
    }

    formData.append('photo', formContent.photo);
    formData.append('created', new Date());
    formData.append('updated', new Date());
    formData.append('status', 'published');

    addPost(formData);

    routeChange();

    setFormContent({
      author: '',
      created: '',
      updated: '',
      status: 'draft',
      title: '',
      text: '',
      price: '',
      phone: '',
      location: '',
    });
  };

  ValidatorForm.addValidationRule('minLengthTitle', () => {
    if (formContent.title.length < 10) {
      return false;
    }
    return true;
  });

  ValidatorForm.addValidationRule('minLengthText', () => {
    if (formContent.text.length < 20) {
      return false;
    }
    return true;
  });

  const renderIfLogged = () => {
    if (loggedUserId) {
      return (
        <div>
          <h2>Add new advertisement</h2>
          <Paper className={styles.paper}>
            <ValidatorForm className={styles.formContainer} noValidate autoComplete="off" onSubmit={handleSubmit} onError={errors => console.log(errors)}>
              <TextValidator className={styles.input} id="outlined-basic" label="Author" variant="outlined" name="author" onChange={handleOnChange} value={formContent.author} validators={['required', 'isEmail']} errorMessages={['this field is required', 'email is not valid']} />
              <TextValidator className={styles.input} id="outlined-basic" label="Phone number" variant="outlined" name="phone" onChange={handleOnChange} value={formContent.phone} validators={['matchRegexp:^[0-9]']} errorMessages={['phone number is not valid']}/>
              <TextValidator className={styles.input} id="outlined-basic" label="Title (min 10 characters)" variant="outlined" name="title" onChange={handleOnChange} value={formContent.title} validators={['required', 'minLengthTitle']} errorMessages={['this field is required', 'title is too short']}/>
              <TextValidator className={styles.input} id="outlined-basic" label="Location" variant="outlined" name="location" onChange={handleOnChange}/>
              <TextValidator className={styles.input} id="outlined-basic" label="Price" variant="outlined" name="price" onChange={handleOnChange} value={formContent.price} validators={['matchRegexp:^[0-9]']} errorMessages={['price is not valid']}/>
              <TextValidator className={styles.input} id="outlined-multiline-static" label="Description (min 20 characters)" multiline rows={4} variant="outlined" name="text" onChange={handleOnChange} value={formContent.text} validators={['required', 'minLengthText']} errorMessages={['this field is required','description is too short']}/>
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
  };

  return (
    <div className={clsx(className, styles.root)}>
      {renderIfLogged()}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loggedUserId: PropTypes.object,
  addPost: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedUserId: getUserStatus(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: (post, data) => dispatch(addPostRequest(post, data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
