import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";

export default function GetTime(props) {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        keyboard
        mask={[/\d/, /\d/, ":", /\d/, /\d/, " ", /a|p/i, "M"]}
        placeholder="08:00 AM"
        value={props.selectedDate}
        onChange={(e) => props.handleDateChange(e, props.day)}
        disableOpenOnEnter
      />
    </MuiPickersUtilsProvider>
  );
}