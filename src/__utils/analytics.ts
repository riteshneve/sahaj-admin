import { FluxStandardAction, CommonTypeTuple } from "./type";

interface DataLayerObj {
	event: string | undefined;
	type: string | undefined;
	field: string | undefined;
	value: CommonTypeTuple;
}

export const trackListener = (
	event: FluxStandardAction,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	eventsHistory: FluxStandardAction[]
) => {
	const { type, payload } = event;
	const { field, evt, value } = payload;
	const analytics = field.analytics;
	if (analytics && analytics.track && analytics.eventType === type) {
		const dataLayerObj: DataLayerObj = {
			event: undefined,
			type: undefined,
			field: undefined,
			value: undefined
		};
		dataLayerObj.event = type;
		dataLayerObj.type = type;
		dataLayerObj.field = field.name;
		switch (analytics.eventType) {
			case "blur":
				dataLayerObj.value = evt.target.value;
				break;
			case "change":
				dataLayerObj.value = value;
				break;
			default:
				dataLayerObj.value =
					type === "ON_CHANGE" ? value : evt.target.value;
				break;
		}
		window.dataLayer.push(dataLayerObj);
	}
};

trackListener.eventType = ["ON_BLUR", "ON_CHANGE"];

export default trackListener;
