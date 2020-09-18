import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

import styles from './PostAdd.module.scss';
import { getUserStatus } from '../../../redux/postsRedux';
import { NotFound } from '../NotFound/NotFound';



const Component = ({className, loggedUserId}) => {

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

  const renderIfLogged = () => {
    if (loggedUserId) {
      return (
        <div>
          <h2>Add new advertisement</h2>
          <Paper className={styles.paper}>
            <form className={styles.formContainer} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField id="outlined-basic" label="Name" variant="outlined" name="name" onChange={handleOnChange} required />
              <TextField id="outlined-basic" label="Phone number" variant="outlined" name="phone" onChange={handleOnChange} required/>
              <TextField id="outlined-basic" label="Email" variant="outlined" name="email" onChange={handleOnChange} required/>
              <TextField id="outlined-basic" label="Title" variant="outlined" name="title" onChange={handleOnChange} required/>
              <TextField id="outlined-basic" label="Price" variant="outlined" name="price"onChange={handleOnChange} required/>
              <TextField id="outlined-multiline-static" label="Description" multiline rows={4} variant="outlined" name="description" onChange={handleOnChange} required/>
              <Button variant="contained" color="primary" type="submit">Confirm</Button>
            </form>
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
  loggedUserId: PropTypes.number,
};

const mapStateToProps = state => ({
  loggedUserId: getUserStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
