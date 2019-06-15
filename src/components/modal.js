import React from "react";
import Modal from "react-modal";
import "../App.css";
import GetTime from "./timepicker";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./modal.css";

const customStyles = {
  content: {
    width: "87%",
    height: "37%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    opacity: 1,
    background: "rgba(209, 219, 255, 1)",
    overlfow: "scroll"
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

class ModalClass extends React.Component {
  constructor() {
    super();

    this.state = {
      day: {
        monday: {
          day: "monday",
          openingFirst: new Date(),
          closingFirst: new Date(),
          openingSecond: new Date(),
          closingSecond: new Date()
        },
        tuesday: {
          day: "tuesday",
          openingFirst: new Date(),
          closingFirst: new Date(),
          openingSecond: new Date(),
          closingSecond: new Date()
        },
        wednesday: {
          day: "wednesday",
          openingFirst: new Date(),
          closingFirst: new Date(),
          openingSecond: new Date(),
          closingSecond: new Date()
        },
        thursday: {
          day: "thursday",
          openingFirst: new Date(),
          closingFirst: new Date(),
          openingSecond: new Date(),
          closingSecond: new Date()
        },
        friday: {
          day: "friday",
          openingFirst: new Date(),
          closingFirst: new Date(),
          openingSecond: new Date(),
          closingSecond: new Date()
        },
        saturday: {
          day: "saturday",
          openingFirst: new Date(),
          closingFirst: new Date(),
          openingSecond: new Date(),
          closingSecond: new Date()
        },
        sunday: {
          day: "sunday",
          openingFirst: new Date(),
          closingFirst: new Date(),
          openingSecond: new Date(),
          closingSecond: new Date()
        }
      },
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleDateChangeOpeningFirst = (e, dayName) => {
    console.log(e);
    console.log(dayName);
    let dayNameFirstOpeningTime = this.state.day[dayName].day;
    let stateDays = this.state.day;
    switch (dayNameFirstOpeningTime) {
      case "monday":
        stateDays.monday = {
          openingFirst: e,
          openingSecond: this.state.day.monday.openingSecond,
          closingFirst: this.state.day.monday.closingFirst,
          closingSecond: this.state.day.monday.closingSecond,
          day: "monday",
        };
        this.setState(
          {
            day: stateDays,
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "tuesday":
        stateDays.tuesday = {
            openingFirst: e,
            openingSecond: this.state.day.tuesday.openingSecond,
            closingFirst: this.state.day.tuesday.closingFirst,
            closingSecond: this.state.day.tuesday.closingSecond,
            day: "tuesday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "wednesday":
        stateDays.wednesday = {
            openingFirst: e,
            openingSecond: this.state.day.wednesday.openingSecond,
            closingFirst: this.state.day.wednesday.closingFirst,
            closingSecond: this.state.day.wednesday.closingSecond,
            day: "wednesday",
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "thursday":
        stateDays.thursday = {
            openingFirst: e,
            openingSecond: this.state.day.thursday.openingSecond,
            closingFirst: this.state.day.thursday.closingFirst,
            closingSecond: this.state.day.thursday.closingSecond,
            day: "thursday",
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "friday":
        stateDays.friday = {
            openingFirst: e,
            openingSecond: this.state.day.friday.openingSecond,
            closingFirst: this.state.day.friday.closingFirst,
            closingSecond: this.state.day.friday.closingSecond,
            day: "friday",
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "saturday":
        stateDays.saturday = {
            openingFirst: e,
            openingSecond: this.state.day.saturday.openingSecond,
            closingFirst: this.state.day.saturday.closingFirst,
            closingSecond: this.state.day.saturday.closingSecond,
            day: "saturday",
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "sunday":
        stateDays.sunday = {
            openingFirst: e,
            openingSecond: this.state.day.sunday.openingSecond,
            closingFirst: this.state.day.sunday.closingFirst,
            closingSecond: this.state.day.sunday.closingSecond,
            day: "sunday",
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;
    }
  };

  handleDateChangeClosingFirst = (e, dayName) => {
    console.log(e);
    console.log(dayName);
    let dayNameFirstOpeningTime = this.state.day[dayName].day;
    let stateDays = this.state.day;
    switch (dayNameFirstOpeningTime) {
      case "monday":
        stateDays.monday = {
            openingFirst: this.state.day.monday.openingFirst,
            openingSecond: this.state.day.monday.openingSecond,
            closingFirst: e,
            closingSecond: this.state.day.monday.closingSecond,
            day: "monday",
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "tuesday":
        stateDays.tuesday = {
            openingFirst: this.state.day.tuesday.openingFirst,
            openingSecond: this.state.day.tuesday.openingSecond,
            closingFirst: e,
            closingSecond: this.state.day.tuesday.closingSecond,
            day: "tuesday",
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "wednesday":
        stateDays.wednesday = {
            openingFirst: this.state.day.wednesday.openingFirst,
            openingSecond: this.state.day.wednesday.openingSecond,
            closingFirst: e,
            closingSecond: this.state.day.wednesday.closingSecond,
            day: "wednesday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "thursday":
        stateDays.thursday = {
            openingFirst: this.state.day.thursday.openingFirst,
            openingSecond: this.state.day.thursday.openingSecond,
            closingFirst: e,
            closingSecond: this.state.day.thursday.closingSecond,
            day: "thursday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "friday":
        stateDays.friday = {
            openingFirst: this.state.day.friday.openingFirst,
            openingSecond: this.state.day.friday.openingSecond,
            closingFirst: e,
            closingSecond: this.state.day.friday.closingSecond,
            day: "friday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "saturday":
        stateDays.saturday = {
            openingFirst: this.state.day.saturday.openingFirst,
            openingSecond: this.state.day.saturday.openingSecond,
            closingFirst: e,
            closingSecond: this.state.day.saturday.closingSecond,
            day: "saturday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "sunday":
        stateDays.sunday = {
            openingFirst: this.state.day.sunday.openingFirst,
            openingSecond: this.state.day.sunday.openingSecond,
            closingFirst: e,
            closingSecond: this.state.day.sunday.closingSecond,
            day: "sunday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;
    }
  };

  handleDateChangeOpeningSecond = (e, dayName) => {
    console.log(e);
    console.log(dayName);
    let dayNameFirstOpeningTime = this.state.day[dayName].day;
    let stateDays = this.state.day;
    switch (dayNameFirstOpeningTime) {
      case "monday":
        stateDays.monday = {
            openingFirst: this.state.day.monday.openingFirst,
            openingSecond: e,
            closingFirst: this.state.day.monday.closingFirst,
            closingSecond: this.state.day.monday.closingSecond,
            day: "monday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "tuesday":
        stateDays.tuesday = {
            openingFirst: this.state.day.tuesday.openingFirst,
            openingSecond: e,
            closingFirst: this.state.day.tuesday.closingFirst,
            closingSecond: this.state.day.tuesday.closingSecond,
            day: "tuesday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "wednesday":
        stateDays.wednesday = {
            openingFirst: this.state.day.wednesday.openingFirst,
            openingSecond: e,
            closingFirst: this.state.day.wednesday.closingFirst,
            closingSecond: this.state.day.wednesday.closingSecond,
            day: "wednesday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "thursday":
        stateDays.thursday = {
            openingFirst: this.state.day.thursday.openingFirst,
            openingSecond: e,
            closingFirst: this.state.day.thursday.closingFirst,
            closingSecond: this.state.day.thursday.closingSecond,
            day: "thursday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "friday":
        stateDays.friday = {
            openingFirst: this.state.day.friday.openingFirst,
            openingSecond: e,
            closingFirst: this.state.day.friday.closingFirst,
            closingSecond: this.state.day.friday.closingSecond,
            day: "friday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "saturday":
        stateDays.saturday = {
            openingFirst: this.state.day.saturday.openingFirst,
            openingSecond: e,
            closingFirst: this.state.day.saturday.closingFirst,
            closingSecond: this.state.day.saturday.closingSecond,
            day: "saturday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "sunday":
        stateDays.sunday = {
            openingFirst: this.state.day.sunday.openingFirst,
            openingSecond: e,
            closingFirst: this.state.day.sunday.closingFirst,
            closingSecond: this.state.day.sunday.closingSecond,
            day: "sunday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;
    }
  };

  handleDateChangeClosingSecond = (e, dayName) => {
    console.log(e);
    console.log(dayName);
    let dayNameFirstOpeningTime = this.state.day[dayName].day;
    let stateDays = this.state.day;
    switch (dayNameFirstOpeningTime) {
      case "monday":
        stateDays.monday = {
            openingFirst: this.state.day.monday.openingFirst,
            openingSecond: this.state.day.monday.openingFirst,
            closingFirst: this.state.day.monday.closingFirst,
            closingSecond: e,
            day: "monday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "tuesday":
        stateDays.tuesday = {
            openingFirst: this.state.day.tuesday.openingFirst,
            openingSecond: this.state.day.tuesday.openingFirst,
            closingFirst: this.state.day.tuesday.closingFirst,
            closingSecond: e,
            day: "tuesday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "wednesday":
        stateDays.wednesday = {
            openingFirst: this.state.day.wednesday.openingFirst,
            openingSecond: this.state.day.wednesday.openingFirst,
            closingFirst: this.state.day.wednesday.closingFirst,
            closingSecond: e,
            day: "wednesday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "thursday":
        stateDays.thursday = {
            openingFirst: this.state.day.thursday.openingFirst,
            openingSecond: this.state.day.thursday.openingFirst,
            closingFirst: this.state.day.thursday.closingFirst,
            closingSecond: e,
            day: "thursday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "friday":
        stateDays.friday = {
            openingFirst: this.state.day.friday.openingFirst,
            openingSecond: this.state.day.friday.openingFirst,
            closingFirst: this.state.day.friday.closingFirst,
            closingSecond: e,
            day: "friday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "saturday":
        stateDays.saturday = {
            openingFirst: this.state.day.saturday.openingFirst,
            openingSecond: this.state.day.saturday.openingFirst,
            closingFirst: this.state.day.saturday.closingFirst,
            closingSecond: e,
            day: "saturday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;

      case "sunday":
        stateDays.sunday = {
            openingFirst: this.state.day.sunday.openingFirst,
            openingSecond: this.state.day.sunday.openingFirst,
            closingFirst: this.state.day.sunday.closingFirst,
            closingSecond: e,
            day: "sunday"
        };
        this.setState(
          {
            day: stateDays
          },
          function() {
            console.log(this.state.day);
          }
        );
        break;
    }
  };

  submitTime = () => {
      console.log(this.state.day.monday.openingFirst.getHours());
  }

  render() {
    return (
      <div>
        <button className="upload-btn-wrapper" onClick={this.openModal}>
          Edit Timings
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>
            Edit Timings
            <button onClick={this.closeModal}>
              <i className="fa fa-times" aria-hidden="true" />
            </button>
          </h2>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="heading">Monday</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.monday.day}
                      selectedDate={this.state.day.monday.openingFirst}
                      handleDateChange={this.handleDateChangeOpeningFirst}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.monday.day}
                      selectedDate={this.state.day.monday.closingFirst}
                      handleDateChange={this.handleDateChangeClosingFirst}
                    />
                  </div>
                  <div className="secondTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.monday.day}
                      selectedDate={this.state.day.monday.openingSecond}
                      handleDateChange={this.handleDateChangeOpeningSecond}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.monday.day}
                      selectedDate={this.state.day.monday.closingSecond}
                      handleDateChange={this.handleDateChangeClosingSecond}
                    />
                  </div>
                </div>
              </Typography>
                  
            </ExpansionPanelDetails>
            <button className="submitButton" onClick={this.submitTime}> Submit </button>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="heading">Tuesday</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.tuesday.day}
                      selectedDate={this.state.day.tuesday.openingFirst}
                      handleDateChange={this.handleDateChangeOpeningFirst}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.tuesday.day}
                      selectedDate={this.state.day.tuesday.closingFirst}
                      handleDateChange={this.handleDateChangeClosingFirst}
                    />
                  </div>
                  <div className="secondTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.tuesday.day}
                      selectedDate={this.state.day.tuesday.openingSecond}
                      handleDateChange={this.handleDateChangeOpeningSecond}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.tuesday.day}
                      selectedDate={this.state.day.tuesday.closingSecond}
                      handleDateChange={this.handleDateChangeClosingSecond}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <button className="submitButton" onClick={this.submitTime}> Submit </button>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="heading">Wednesday</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.wednesday.day}
                      selectedDate={this.state.day.wednesday.openingFirst}
                      handleDateChange={this.handleDateChangeOpeningFirst}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.wednesday.day}
                      selectedDate={this.state.day.wednesday.closingFirst}
                      handleDateChange={this.handleDateChangeClosingFirst}
                    />
                  </div>
                  <div className="secondTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.wednesday.day}
                      selectedDate={this.state.day.wednesday.openingSecond}
                      handleDateChange={this.handleDateChangeOpeningSecond}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.wednesday.day}
                      selectedDate={this.state.day.wednesday.closingSecond}
                      handleDateChange={this.handleDateChangeClosingSecond}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <button className="submitButton" onClick={this.submitTime}> Submit </button>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="heading">Thursday</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.thursday.day}
                      selectedDate={this.state.day.thursday.openingFirst}
                      handleDateChange={this.handleDateChangeOpeningFirst}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.thursday.day}
                      selectedDate={this.state.day.thursday.closingFirst}
                      handleDateChange={this.handleDateChangeClosingFirst}
                    />
                  </div>
                  <div className="secondTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.thursday.day}
                      selectedDate={this.state.day.thursday.openingSecond}
                      handleDateChange={this.handleDateChangeOpeningSecond}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.thursday.day}
                      selectedDate={this.state.day.thursday.closingSecond}
                      handleDateChange={this.handleDateChangeClosingSecond}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <button className="submitButton" onClick={this.submitTime}> Submit </button>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="heading">Friday</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.friday.day}
                      selectedDate={this.state.day.friday.openingFirst}
                      handleDateChange={this.handleDateChangeOpeningFirst}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.friday.day}
                      selectedDate={this.state.day.friday.closingFirst}
                      handleDateChange={this.handleDateChangeClosingFirst}
                    />
                  </div>
                  <div className="secondTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.friday.day}
                      selectedDate={this.state.day.friday.openingSecond}
                      handleDateChange={this.handleDateChangeOpeningSecond}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.friday.day}
                      selectedDate={this.state.day.friday.closingSecond}
                      handleDateChange={this.handleDateChangeClosingSecond}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <button className="submitButton" onClick={this.submitTime}> Submit </button>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="heading">Saturday</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.saturday.day}
                      selectedDate={this.state.day.saturday.openingFirst}
                      handleDateChange={this.handleDateChangeOpeningFirst}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.saturday.day}
                      selectedDate={this.state.day.saturday.closingFirst}
                      handleDateChange={this.handleDateChangeClosingFirst}
                    />
                  </div>
                  <div className="secondTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.saturday.day}
                      selectedDate={this.state.day.saturday.openingSecond}
                      handleDateChange={this.handleDateChangeOpeningSecond}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.saturday.day}
                      selectedDate={this.state.day.saturday.closingSecond}
                      handleDateChange={this.handleDateChangeClosingSecond}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <button className="submitButton" onClick={this.submitTime}> Submit </button>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="heading">Sunday</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.sunday.day}
                      selectedDate={this.state.day.sunday.openingFirst}
                      handleDateChange={this.handleDateChangeOpeningFirst}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.sunday.day}
                      selectedDate={this.state.day.sunday.closingFirst}
                      handleDateChange={this.handleDateChangeClosingFirst}
                    />
                  </div>
                  <div className="secondTime">
                    From:{" "}
                    <GetTime
                      day={this.state.day.sunday.day}
                      selectedDate={this.state.day.sunday.openingSecond}
                      handleDateChange={this.handleDateChangeOpeningSecond}
                    />
                    <br/>
                    To :{" "}
                    <GetTime
                      day={this.state.day.sunday.day}
                      selectedDate={this.state.day.sunday.closingSecond}
                      handleDateChange={this.handleDateChangeClosingSecond}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <button className="submitButton" onClick={this.submitTime}> Submit </button>
          </ExpansionPanel>
        </Modal>
      </div>
    );
  }
}

export default ModalClass;
