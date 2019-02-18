import { CHANGE_SEARCH_FIELD } from './constants';

const initialState = {
    searchField: ''
};

export const searchReducer = (state=initialState, action={}) => {
    let returnState;
    switch(action.type){
        case CHANGE_SEARCH_FIELD:
        returnState = Object.assign({}, state, {searchField:action.payload});
            break;
        default:
            returnState = state;
    }
    return returnState;
};