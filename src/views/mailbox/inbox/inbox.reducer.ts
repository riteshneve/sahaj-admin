import { fromJS, merge } from "immutable";
import { FluxStandardAction } from "__utils/type";
import { MailView } from "./inbox.types";

export interface inboxState {
	selectedView: string;
	selectedMail: MailView | null;
	showNewMailDrawer: boolean;
	emailList: MailView[];
	unreadMailsCount: number;
}
const rawState: inboxState = {
	selectedView: "",
	selectedMail: null,
	showNewMailDrawer: false,
	emailList: [],
	unreadMailsCount: 0,
};
const intialState = fromJS(rawState);

export default function InboxReducer(
	state = intialState,
	action: FluxStandardAction
) {
	switch (action.type) {
		case "SET_SELECTED_VIEW":
			return merge(state, fromJS({ selectedView: action.payload.data }));
		case "SET_SELECTED_MAIL":
			return merge(state, fromJS({ selectedMail: action.payload.data }));
		case "SET_SHOW_NEW_MAIL_DRAWER":
			return merge(state, fromJS({ showNewMailDrawer: action.payload.data }));
		case "SET_EMAIL_LIST":
			return merge(state, fromJS({ emailList: action.payload.data }));
		case "SET_UNREAD_MAILS_COUNT":
			return merge(state, fromJS({ unreadMailsCount: action.payload.data }));
		case "DEC_UNREAD_MAILS_COUNT":
			return merge(state, fromJS({ unreadMailsCount: state.toJS().unreadMailsCount - 1 }));
		default:
			return state;
	}
}
