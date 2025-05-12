// This is a reducer function for handling filter changes in the app state
const filterReducer = (state = '', action) => {
    switch (action.type) {
        // If the action type is 'SET_FILTER', update the state with the new filter value
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}

// This is an action creator function that returns a 'SET_FILTER' action with the given filter value
export const filterChange = filter => {
    return {
        type: 'SET_FILTER', 
        payload: filter // New filter value to be stored
    }
}

export default filterReducer