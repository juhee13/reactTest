import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';
import comment from './comment';

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({ 
    index: (state = {}, action) => { // 리듀서에서 state와 action을 받아옴
        // switch case로 액션을 정의
        switch (action.type) {
            case HYDRATE:
                return {...state, ...action.payload};
            default:
                return state;
        }
    },
    user,
    post,
    comment
})

export default rootReducer;