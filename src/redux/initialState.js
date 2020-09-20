export const initialState = {
  loggedUser: {
    mail: 'the.admin@example.com',
    admin: true,
  },
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  post: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
};
