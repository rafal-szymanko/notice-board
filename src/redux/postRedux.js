import axios from 'axios';

/* selectors */
export const getPostById = ({post}) => post.data;

export const getPostByAuthor = ({posts}, id) => posts.data.filter(post => id === post.userId);

/* action name creator */
const reducerName = 'post';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');


/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const addPost = payload => ({ payload, type: ADD_POST });
export const updatePost = payload => ({ payload, type: UPDATE_POST });

/* thunk creators */

export const fetchPublishedById =  (id) => {
  
  return async (dispatch, getState)  => {
    dispatch(fetchStarted());
    try {
      let res = await axios.get(`http://localhost:8000/api/post/${id}`);
      dispatch(fetchSuccess(res.data));
    } catch(e) {
      dispatch(fetchError(e.message || true));
    }
  };
};

export const addPostRequest = (post) => {


  return async dispatch => {
    dispatch(startRequest({ name: 'ADD_POST' }));

    try {
      let res = await axios.post(
        `/api/post/add`,
        post,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      dispatch(addPost(res));
      dispatch(endRequest({ name: 'ADD_POST' }));
  
    } catch(e) {
      dispatch(errorRequest({ name: 'ADD_POST', error: e.message }));
    }
  }; 
};

export const addPutRequest = (post, id) => {


  return async dispatch => {
    dispatch(startRequest({ name: 'UPDATE_POST' }));

    try {
      let res = await axios.put(
        `/api/post/${id}/edit`,
        post,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      dispatch(updatePost(res));
      dispatch(endRequest({ name: 'UPDATE_POST' }));
  
    } catch(e) {
      dispatch(errorRequest({ name: 'UPDATE_POST', error: e.message }));
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
    default:
      return statePart;
  }
};
