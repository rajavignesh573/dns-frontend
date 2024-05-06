import { FETCH_DOMAINS, ADD_DOMAIN, DELETE_DOMAIN } from '../actions/types';

const initialState = {
    domains: [],
};

export default function domainreducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DOMAINS:
            console.log("action", action.payload);
            return {
                ...state,
                domains: action.payload,
            };

        case ADD_DOMAIN:
            return {
                ...state,
                domains: [...state.domains, action.payload],
            };

        case DELETE_DOMAIN:
            console.log("action", action.payload);
            return {
                ...state,
                domains: state.domains.filter(
                    (domain) => domain.Id !== action.payload
                ),
            };

        default:
            return state;
    }
}
