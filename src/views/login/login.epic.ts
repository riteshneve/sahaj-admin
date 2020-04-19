import { ofType, Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AjaxResponse, AjaxError } from "rxjs/ajax";
import { get } from "__utils/ajax-wrapper";
import { FluxStandardAction } from "__utils/type";

export const loginEpic: Epic<
	FluxStandardAction,
	FluxStandardAction
> = action$ => {
	return action$.pipe(
		ofType("LOGIN_API_FETCH"),
		mergeMap((action) => {
			return get(`/api/v1/user/register`).pipe(
				map(
					(
						response: AjaxResponse | AjaxError
					): FluxStandardAction => {
						if (response.status === 200) {
							return {
								type: "LOGIN_API_SUCCESS",
								payload: {
									data: response.response
								}
							};
						} else {
							return {
								type: "LOGIN_API_ERROR",
								payload: {
									data: response
								}
							};
						}
					}
				),
				catchError(error =>
					of({ type: "LOGIN_API_ERROR", error })
				)
			);
		})
	);
};
