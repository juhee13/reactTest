import produce from "../util/produce";

const initialState = {
  comments: [
    {
      seq: "",
      c_like: "",
      c_dislike: "",
      ins_dttm: null,
      upt_dttm: null,
    },
  ],
  commentLoading: null,
  commentSuccess: null,
  commentError: null,
  User: [],
  Post: [],
};

export const COMMENT_LOAD_REQUEST = "COMMENT_LOAD_REQUEST";
export const COMMENT_LOAD_SUCCESS = "COMMENT_LOAD_SUCCESS";
export const COMMENT_LOAD_FAILURE = "COMMENT_LOAD_FAILURE";

export const COMMENT_WRITE_REQUEST = "COMMENT_WRITE_REQUEST";
export const COMMENT_WRITE_SUCCESS = "COMMENT_WRITE_SUCCESS";
export const COMMENT_WRITE_FAILURE = "COMMENT_WRITE_FAILURE";

export const RECOMMENT_WRITE_REQUEST = "RECOMMENT_WRITE_REQUEST";
export const RECOMMENT_WRITE_SUCCESS = "RECOMMENT_WRITE_SUCCESS";
export const RECOMMENT_WRITE_FAILURE = "RECOMMENT_WRITE_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case COMMENT_WRITE_REQUEST:
        draft.commentLoading = true;
        draft.commentSuccess = false;
        break;
      case COMMENT_WRITE_SUCCESS:
        draft.commentLoading = false;
        draft.commentSuccess = true;
        //draft.comments = action.data;
        draft.comments.push({
          writer: "익명",
          contents: action.data.contents,
          seq: action.seq,
          comment_seq: action.seq,
        });
        break;
      case COMMENT_WRITE_FAILURE:
        draft.commentLoading = false;
        draft.commentSuccess = false;
        draft.commentError = action.error.err;
        break;
      case RECOMMENT_WRITE_REQUEST:
        draft.commentLoading = true;
        draft.commentSuccess = false;
        break;
      case RECOMMENT_WRITE_SUCCESS:
        draft.commentLoading = false;
        draft.commentSuccess = true;
        //draft.comments = action.data;
        // 원 댓글을 찾는다.
        let index = draft.comments.findIndex(
          (v) => v.seq === action.data.comment_seq
        );
        //console.log("comment", index);
        //let index = draft.comment.indexOf(comment);
        //console.log("index", index);
        // 원 댓글의 다음 인덱스에 대댓글을 넣는다.
        const comment_group = draft.comments.filter(
          (v) => v.comment_group === action.data.comment_seq
        );
        console.log("comment_group", comment_group.length);

        draft.comments.splice(parseInt(index) + comment_group.length, 0, {
          writer: "익명",
          contents: action.data.contents,
          seq: action.seq,
          comment_group: action.data.comment_seq,
        });
        break;
      case RECOMMENT_WRITE_FAILURE:
        draft.commentLoading = false;
        draft.commentSuccess = false;
        draft.commentError = action.error.err;
        break;
      case COMMENT_LOAD_REQUEST:
        draft.commentLoading = true;
        //draft.commentSuccess = false;
        break;
      case COMMENT_LOAD_SUCCESS:
        draft.commentLoading = false;
        //draft.commentSuccess = true;
        draft.comments = action.data;
        break;
      case COMMENT_LOAD_FAILURE:
        draft.commentLoading = false;
        //draft.commentSuccess = false;
        draft.commentError = action.error.err;
        break;
      default:
        return state;
    }
  });

export default reducer;
