import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import {getPostByID, getUserStatus} from '../../../redux/postsRedux';

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




const Component = ({className, children, postById, loggedUserId}) => {

  const {description, price, mail, contact, title, phone, id, userId} = postById;

  const [formContent, setFormContent]= useState({
    name: '',
    phone: '',
    email: '',
    title: '',
    price: '',
    description: '',
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

  const renderIfAuthor = () => {
    if(loggedUserId === userId) {
      return (
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
          <Paper className={styles.form}>
            <form className={styles.formContainer} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField id="outlined-basic" label="Name" variant="outlined" defaultValue={contact} name="name" onChange={handleOnChange} required />
              <TextField id="outlined-basic" label="Phone number" variant="outlined" defaultValue={phone} name="phone" onChange={handleOnChange} required/>
              <TextField id="outlined-basic" label="Email" type="email" variant="outlined"  defaultValue={mail} name="email" onChange={handleOnChange} required/>
              <TextField id="outlined-basic" label="Title" variant="outlined" name="title" defaultValue={title} onChange={handleOnChange} required/>
              <TextField id="outlined-basic" label="Price" variant="outlined" name="price"defaultValue={price} onChange={handleOnChange} required/>
              <TextField id="outlined-multiline-static" label="Description" multiline rows={4} defaultValue={description} variant="outlined" name="description" onChange={handleOnChange} required/>
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
      {renderIfAuthor()}
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

const Container = connect(mapStateToProps)(Component);


export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
