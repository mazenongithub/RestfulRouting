import { LOAD_USER, CREATE_POST, FETCH_USER, DELETE_USER, EDIT_USER } from '../actions/'
import _ from 'lodash'
export default function(state = {}, action) {
    console.log(action.payload);
    switch (action.type) {
        case LOAD_USER:
            return _.mapKeys(action.payload, '_id');
        case FETCH_USER:
            return (state, action.payload) || false;
        case EDIT_USER:
            return (state, action.payload) || false;
        case CREATE_POST:
            return (state, action.payload) || false;
        case DELETE_USER:
            console.log(action);
            return _.omit(state, action.payload) || false;
        default:
            return state;
    }
}
