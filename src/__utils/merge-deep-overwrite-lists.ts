// https://github.com/immutable-js/immutable-js/issues/1452#issuecomment-386162309
import { List } from "immutable";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isMergeable = (a: any) =>
	a &&
	typeof a === "object" &&
	typeof a.mergeWith === "function" &&
	!List.isList(a);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeDeepOverwriteLists = (a: any, b: any) => {
	// If b is null, it would overwrite a, even if a is mergeable
	if (b === null) return b;

	if (isMergeable(a) && !List.isList(a)) {
		return a.mergeWith(mergeDeepOverwriteLists, b);
	}

	return b;
};
