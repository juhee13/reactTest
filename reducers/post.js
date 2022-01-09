const initialState = {
  post: {
    seq: null,
    title: null,
    contents: null,
    writer: null,
    date: null,
    category: null,
    comment_count: null,
    like: null,
  },
  Comment: [],
  User: [],
  isLoading: false,
  isSuccess: false,
};

export const BOARD_ALL_REQUEST = "BOARD_ALL_REQUEST";
export const BOARD_ALL_SUCCESS = "BOARD_ALL_SUCCESS";
export const BOARD_ALL_FAILURE = "BOARD_ALL_FAILURE";

export const BOARD_WRITE_REQUEST = "BOARD_WRITE_REQUEST";
export const BOARD_WRITE_SUCCESS = "BOARD_WRITE_SUCCESS";
export const BOARD_WRITE_FAILURE = "BOARD_WRITE_FAILURE";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BOARD_ALL_REQUEST:
      return { ...state, isLoading: true };
    case BOARD_ALL_SUCCESS:
      return { ...state, post: action.data, isLoading: false };
    case BOARD_ALL_FAILURE:
      return { ...state, isLoading: false, post: [] };
    case BOARD_WRITE_REQUEST:
      return { ...state, isLoading: true, isSuccess: false, message: "" };
    case BOARD_WRITE_SUCCESS:
      return { ...state, isSuccess: true, isLoading: false, message: "" };
    case BOARD_WRITE_FAILURE:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        post: [],
        message: action.error.err,
      };
    default:
      return state;
  }
};

export default reducer;
