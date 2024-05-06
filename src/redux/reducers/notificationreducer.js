import { FETCH_NOTIFICATIONS } from '../actions/types';

const initialState = {
    notifications: [],
};

export default function notificationreducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS:
            console.log("action", action.payload);
            return {
                ...state,
                notifications: action.payload,
            };

        default:
            return state;
    }
}
