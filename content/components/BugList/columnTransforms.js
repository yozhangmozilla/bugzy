import React from "react";
import {emails} from "../../../config/people";
const {DateTime} = require("luxon");

const OPEN_BUG_URL = "https://bugzilla.mozilla.org/show_bug.cgi?id=";

function getShortName(email) {
  if (email === "nobody@mozilla.org") return "";
  return emails[email] || email;
}

export const columnTransforms = {
  id(value) {
    return (<a href={OPEN_BUG_URL + value}>{value}</a>);
  },
  assigned_to(value) {
    return getShortName(value);
  },
  last_change_time(value) {
    const now = new DateTime.local();
    const t = new DateTime.fromISO(value).setZone();
    if (t.hasSame(now, "day")) {
      return t.toFormat("t");
    } else {
      return t.toFormat("MMM d t");
    }
  }
};
