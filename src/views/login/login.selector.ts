/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";

const getTokenInfo = (state: any) => state.getIn(["LoginReducer", "tokenInfo"]);

const LoginSelector = createSelector(
	[getTokenInfo],
	(tokenInfo) => ({
		tokenInfo
	})
);

export default LoginSelector;
