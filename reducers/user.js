import produce from "../util/produce";

const initialState = {
  // 초기값. 데이터의 구조를 잡는다.
  user: {
    seq: null,
    id: null,
    nickname: null,
    token : null
  },
  isLogIn: false,
  isLoading : false
};

// 서버에서 받아왔다고 가정
const userData = {
  seq: 1,
  id: 'suho',
  nickname: '익명',
}

// 유저 정보 불러오기
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

// 로그인 하기
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";


const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (
      action.type // 액션의 타입을 확인
    ) {
      case LOAD_USER_REQUEST:
        draft.isLoading = false;
        break;
      case LOAD_USER_SUCCESS:
        draft.user = action.data.user;
        draft.isLoading = true;
        break;
      case LOAD_USER_FAILURE:
        draft.isLoading = false;
        break;
      case LOGIN_USER_REQUEST:
        draft.isLoadig = true;
        draft.isLogIn = false;
        break;
      case LOGIN_USER_SUCCESS:
        draft.isLoadig = false;
        draft.isLogIn = true;
        draft.user = action.data.data.user;
        draft.user.token = action.data.data.token;
        break;
      case LOGIN_USER_FAILURE:
        draft.isLoadig = false;
        draft.isLogIn = false;
        break;
      default:
        return state;
    }
  });

export default reducer;
