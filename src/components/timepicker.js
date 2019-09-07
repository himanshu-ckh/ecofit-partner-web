import React from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export default function GetTime(props) {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        keyboard="true"
        mask={[/\d/, /\d/, ":", /\d/, /\d/, " ", /a|p/i, "M"]}
        value={props.selectedDate}
        onChange={(e) => props.handleDateChange(e, props.day)}
        disableOpenOnEnter
      />
    </MuiPickersUtilsProvider>
  );
}