import axios from 'axios';
import {ADD_POST} from './postRedux';

/* selectors */
export const getAllPublished = ({posts}) => posts.data;
export const getPostByAuthor = ({posts}, author) => posts.data.filter(post => post.author === author);

export const getUserStatus = ({loggedUser}) => loggedUser;


/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */
export const fetchPublished = () => {

  return (dispatch, getState) => {
    const state = getState();
    
    if(state.posts.data.length === 0 && state.posts.loading.active === false) {
      dispatch(fetchStarted());
      axios
        .get('http://localhost:8000/api/posts')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    } 
  };
};

/* reducers */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        data: action.payload.data.reverse(),
        loading: {
          ...statePart.loading,
        },
      };
    }
    default:
      return statePart;
  }
};
