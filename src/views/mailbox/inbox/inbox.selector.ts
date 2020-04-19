/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";

const getSelectedView = (state: any) => state.getIn(["InboxReducer", "selectedView"]);
const getSelectedMail = (state: any) => state.getIn(["InboxReducer", "selectedMail"]);
const getShowNewMailDrawer = (state: any) => state.getIn(["InboxReducer", "showNewMailDrawer"]);
const getEmailList = (state: any) => state.getIn(["InboxReducer", "emailList"]);
const getUnreadMailsCount = (state: any) => state.getIn(["InboxReducer", "unreadMailsCount"]);

const InboxSelector = createSelector(
	[getSelectedView, getSelectedMail, getShowNewMailDrawer, getEmailList, getUnreadMailsCount],
	(selectedView, selectedMail, showNewMailDrawer, emailList, unreadMailsCount) => ({
		selectedView,
		selectedMail,
		showNewMailDrawer,
		emailList,
		unreadMailsCount
	})
);

export default InboxSelector;
