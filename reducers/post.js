import produce from "../util/produce";

const initialState = {
  Posts: [],
  post: {
    seq: null,
    title: null,
    contents: null,
    writer: null,
    date: null,
    category: null,
    comment_count: null,
    like: null,
    Liker : [],
    DisLiker : []
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

// 글 내용 불러오는 액션
export const BOARD_DETAIL_REQUEST = "BOARD_DETAIL_REQUEST";
export const BOARD_DETAIL_SUCCESS = "BOARD_DETAIL_SUCCESS";
export const BOARD_DETAIL_FAILURE = "BOARD_DETAIL_FAILURE";

export const LIKE_UPDATE_REQUEST = "LIKE_UPDATE_REQUEST";
export const LIKE_UPDATE_SUCCESS = "LIKE_UPDATE_SUCCESS";
export const LIKE_UPDATE_FAILURE = "LIKE_UPDATE_FAILURE";

export const DISLIKE_UPDATE_REQUEST = "DISLIKE_UPDATE_REQUEST";
export const DISLIKE_UPDATE_SUCCESS = "DISLIKE_UPDATE_SUCCESS";
export const DISLIKE_UPDATE_FAILURE = "DISLIKE_UPDATE_FAILURE";


const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BOARD_ALL_REQUEST:
        draft.isLoading = true;
        break;
      case BOARD_ALL_SUCCESS:
        draft.Posts = action.data;
        draft.Posts.data.map(v => {
          if (v.category === "H") {
            v.category = "유머";
            v.color = "#0099FF";
          } else if (v.category === "I") {
            v.category = "이슈";
            v.color = "#E865AB";
          } else if (v.category === "S") {
            v.category = "공포/오컬트";
            v.color = "#9461FE";
          } else {
            v.category = "정보";
            v.color = "#00A806";
          }
        })
        draft.isLoading = false;
        break;
      case BOARD_ALL_FAILURE:
        draft.isLoading = false;
        draft.Posts = [];
        break;
      case BOARD_WRITE_REQUEST:
        draft.isLoading = true;
        draft.isSuccess = false;
        draft.message = "";
        break;
      case BOARD_WRITE_SUCCESS:
        draft.isSuccess = true;
        draft.isLoading = false;
        draft.message = "";
        break;
      case BOARD_WRITE_FAILURE:
        draft.isSuccess = false;
        draft.isLoading = false;
        draft.post = [];
        draft.message = action.error.err;
        break;
      case BOARD_DETAIL_REQUEST:
        draft.isLoading = true;
        draft.isSuccess = false;
        draft.message = "";
        break;
      case BOARD_DETAIL_SUCCESS:
        draft.isLoading = false;
        draft.isSuccess = true;
        draft.post = action.data;
        draft.post.Liker = action.liker;
        //console.log('action.liker',action.liker);
        //sconsole.log(action.disLiker);
        draft.post.DisLiker = action.disLiker;
        draft.message = "";
        break;
      case BOARD_DETAIL_FAILURE:
        draft.isLoading = false;
        draft.isSuccess = false;
        draft.post = {};
        draft.message = action.error.err;
        break;
      case LIKE_UPDATE_REQUEST:

        break;
      case LIKE_UPDATE_SUCCESS:
        draft.post.b_like = state.post.b_like + 1;
        console.log('action.data.user_seq',action.data.user_seq);
        draft.post.Liker.push({user_seq : action.data.user_seq});
        break;
      case LIKE_UPDATE_FAILURE:
        break;
      case DISLIKE_UPDATE_REQUEST:

        break;
      case DISLIKE_UPDATE_SUCCESS:
        draft.post.b_dislike = state.post.b_dislike + 1;
        draft.post.DisLiker.push({ user_seq: action.data.user_seq});
        break;
      case DISLIKE_UPDATE_FAILURE:

      default:
        return state;
    }
  });

export default reducer;
