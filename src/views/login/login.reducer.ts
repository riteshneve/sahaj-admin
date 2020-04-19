import { fromJS, merge } from "immutable";
import { FluxStandardAction } from "__utils/type";

export interface loginState {
	tokenInfo: any;
}
const rawState: loginState = {
	tokenInfo: undefined
};
const intialState = fromJS(rawState);

export default function LoginReducer(
	state = intialState,
	action: FluxStandardAction
) {
	switch (action.type) {
		case "LOGIN_API_SUCCESS":
			return merge(state, fromJS({ tokenInfo: action.payload.data }));
		case "LOGIN_API_ERROR":
			return state;
		case "RESET_LOGIN_TOKEN":
			return merge(state, fromJS({ tokenInfo: null }));
		default:
			return state;
	}
}
