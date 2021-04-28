import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

const initialState = []

export default function(state = initialState, action){
    const { type, payload } = action   //payload is the data

    switch(type){
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}

//after the set alert has been dispatched, then we add it to the array in the set alert case.
//This will create a domino effect where the Alert component is getting the state
