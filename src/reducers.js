import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

const initialStateSearch = {
    searchField: ''
};

export const searchReducer = (state=initialStateSearch, action={}) => {
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

const initialStateRequest = {
    isPending: false,
    robots: [],
    error: ''
};

export const requestReducer = (state=initialStateRequest, action={}) => {
    switch (action.type) {
        case REQUEST_ROBOTS_PENDING:
            return Object.assign({}, state, { isPending: true});
        case REQUEST_ROBOTS_SUCCESS:
            return Object.assign({}, state, {robots: action.payload, isPending: false});
        case REQUEST_ROBOTS_FAILED:
            return Object.assign({}, state, {error: action.payload, isPending: false});
        default:
            return state;
    }
}