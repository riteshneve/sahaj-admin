import { tupleNum } from "__utils/type";
import { Dict } from "__utils/type";

declare global {
	interface Window {
		dataLayer: Dict<common>;
	}
}

window.dataLayer = window.dataLayer || {};
