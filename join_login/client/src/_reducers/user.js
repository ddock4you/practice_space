import { LOGIN_USER, JOIN_USER, AUTH_USER } from "../_actions/user";

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.payload,
            };
        case JOIN_USER:
            return {
                ...state,
                joinSuccess: action.payload,
            };
        case AUTH_USER:
            return {
                ...state,
                userDate: action.payload,
            };

        default:
            return state;
    }
}
