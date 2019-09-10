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
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { API } from "aws-amplify";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const buttonStyle = {
  float: "right",
  marginRight: "4%",
  marginBottom: "2%"
};

const dialogStyle = {
  // backgroundColor: 'black',
  width: '100%'
};

const closeButtonStyle = {
  float: "right",
  marginRight: "4%",
  marginBottom: "2%",
  marginTop: '2%'
};

const headingStyle = {
  paddingLeft: '4%'
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

class ModalTest extends React.Component {
  constructor(props) {
    super(props);

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
      modalIsOpen: false,
      userData: {
        workingHours: {
          Monday: "0000000000000000",
          Tuesday: "0000000000000000",
          Wednesday: "0000000000000000",
          Thursday: "0000000000000000",
          Friday: "0000000000000000",
          Saturday: "0000000000000000",
          Sunday: "0000000000000000",
          openNowOverride: "0000000000000000",
        }
    },
    dataLoadedFromAPI: null,
    totalToSend: null,
    dayToSend: null,
    };

    // // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  handleDateChangeOpeningFirst = (e, dayName) => {
    let dayNameFirstOpeningTime = this.state.day[dayName].day;
    console.log(dayName)
    console.log(dayNameFirstOpeningTime)
    switch (dayNameFirstOpeningTime) {
      case "monday":
        let timeMonday = this.state.userData.workingHours.Monday
        let hourMonday = e.getHours()
        hourMonday = ("0" + hourMonday).slice(-2)
        let minutesMonday = e.getMinutes()
        minutesMonday = ("0" + minutesMonday).slice(-2)
        console.log(minutesMonday)
        let currTimeMonday = timeMonday.slice(4,16)
        let totalTimeMonday = hourMonday.toString()+minutesMonday.toString()+currTimeMonday
        console.log(totalTimeMonday)
        this.setState({
          userData: {
            workingHours: {
              Monday: totalTimeMonday,
              Tuesday: "0000000000000000",
              Wednesday: "0000000000000000",
              Thursday: "0000000000000000",
              Friday: "0000000000000000",
              Saturday: "0000000000000000",
              Sunday: "0000000000000000",
              openNowOverride: "0000000000000000",
            }
        }
        }
        )

        break;
        case 'tuesday' :
            let timeTuesday = this.state.userData.workingHours.Tuesday
            let hourTuesday = e.getHours()
            hourTuesday = ("0" + hourTuesday).slice(-2)
            let minutesTuesday = e.getMinutes()
            minutesTuesday = ("0" + minutesTuesday).slice(-2)
            let currTimeTuesday = timeTuesday.slice(4,16)
            let totalTimeTuesday = hourTuesday.toString()+minutesTuesday.toString()+currTimeTuesday
            this.setState({
              userData: {
                workingHours: {
                  Monday: "0000000000000000",
                  Tuesday: totalTimeTuesday,
                  Wednesday: "0000000000000000",
                  Thursday: "0000000000000000",
                  Friday: "0000000000000000",
                  Saturday: "0000000000000000",
                  Sunday: "0000000000000000",
                  openNowOverride: "0000000000000000",
                }
            }
            })
          break;
          case 'wednesday' :
              let timeWednesday = this.state.userData.workingHours.Wednesday
              let hourWednsday = e.getHours()
              hourWednsday = ("0" + hourWednsday).slice(-2)
              let minutesWednesday = e.getMinutes()
              minutesWednesday = ("0" + minutesWednesday).slice(-2)
              let currTimeWednesday = timeWednesday.slice(4,16)
              let totalTimeWednesday = hourWednsday.toString()+minutesWednesday.toString()+currTimeWednesday
              this.setState({
                userData: {
                  workingHours: {
                    Monday: "0000000000000000",
                    Tuesday: "0000000000000000",
                    Wednesday: totalTimeWednesday,
                    Thursday: "0000000000000000",
                    Friday: "0000000000000000",
                    Saturday: "0000000000000000",
                    Sunday: "0000000000000000",
                    openNowOverride: "0000000000000000",
                  }
              }
              })
            break;
            case 'thursday' :
                let timeThursday = this.state.userData.workingHours.Thursday
                let hourThursday = e.getHours()
                hourThursday = ("0" + hourThursday).slice(-2)
                let minutesThursday = e.getMinutes()
                minutesThursday = ("0" + minutesThursday).slice(-2)
                let currTimeThursday = timeThursday.slice(4,16)
                let totalTimeThursday = hourThursday.toString()+minutesThursday.toString()+currTimeThursday
                this.setState({
                  userData: {
                    workingHours: {
                      Monday: "0000000000000000",
                      Tuesday: "0000000000000000",
                      Wednesday: "0000000000000000",
                      Thursday: totalTimeThursday,
                      Friday: "0000000000000000",
                      Saturday: "0000000000000000",
                      Sunday: "0000000000000000",
                      openNowOverride: "0000000000000000",
                    }
                }
                })
              break;
              case 'friday' :
                  let timeFriday = this.state.userData.workingHours.Friday
                  let hourFriday = e.getHours()
                  hourFriday = ("0" + hourFriday).slice(-2)
                  let minutesFriday = e.getMinutes()
                  minutesFriday = ("0" + minutesFriday).slice(-2)
                  let currTimeFriday = timeFriday.slice(4,16)
                  let totalTimeFriday = hourFriday.toString()+minutesFriday.toString()+currTimeFriday
                  this.setState({
                    userData: {
                      workingHours: {
                        Monday: "0000000000000000",
                        Tuesday: "0000000000000000",
                        Wednesday: "0000000000000000",
                        Thursday: "0000000000000000",
                        Friday: totalTimeFriday,
                        Saturday: "0000000000000000",
                        Sunday: "0000000000000000",
                        openNowOverride: "0000000000000000",
                      }
                  }
                  })
                break;
                case 'saturday' :
                    let timeSaturday = this.state.userData.workingHours.Saturday
                    let hourSaturday = e.getHours()
                    hourSaturday = ("0" + hourSaturday).slice(-2)
                    let minutesSaturday = e.getMinutes()
                    minutesSaturday = ("0" + minutesSaturday).slice(-2)
                    let currTimeSaturday = timeSaturday.slice(4,16)
                    let totalTimeSaturday = hourSaturday.toString()+minutesSaturday.toString()+currTimeSaturday
                    this.setState({
                      userData: {
                        workingHours: {
                          Monday: "0000000000000000",
                          Tuesday: "0000000000000000",
                          Wednesday: "0000000000000000",
                          Thursday: "0000000000000000",
                          Friday: "0000000000000000",
                          Saturday: totalTimeSaturday,
                          Sunday: "0000000000000000",
                          openNowOverride: "0000000000000000",
                        }
                    }
                    })
                  break;
                  case 'sunday' :
                      let timeSunday = this.state.userData.workingHours.Sunday
                      let hourSunday = e.getHours()
                      hourSunday = ("0" + hourSunday).slice(-2)
                      let minutesSunday = e.getMinutes()
                      minutesSunday = ("0" + minutesSunday).slice(-2)
                      let currTimeSunday = timeSunday.slice(4,16)
                      let totalTimeSunday = hourSunday.toString()+minutesSunday.toString()+currTimeSunday
                      this.setState({
                        userData: {
                          workingHours: {
                            Monday: "0000000000000000",
                            Tuesday: "0000000000000000",
                            Wednesday: "0000000000000000",
                            Thursday: "0000000000000000",
                            Friday: "0000000000000000",
                            Saturday: "0000000000000000",
                            Sunday: totalTimeSunday,
                            openNowOverride: "0000000000000000",
                          }
                      }
                      })
                    break;
      default:
    }
  };

  handleDateChangeClosingFirst = (e, dayName) => {
    let dayNameFirstOpeningTime = this.state.day[dayName].day;
    switch (dayNameFirstOpeningTime) {
      case "monday":
        let timeMonday = this.state.userData.workingHours.Monday
        let hourMonday = e.getHours()
        hourMonday = ("0" + hourMonday).slice(-2)
        let minutesMonday = e.getMinutes()
        minutesMonday = ("0" + minutesMonday).slice(-2)
        let currTime1Monday = timeMonday.slice(0,4)
        let currTime2Monday = timeMonday.slice(8,16)
        let totalTimeMonday = currTime1Monday+hourMonday.toString()+ minutesMonday.toString()+ currTime2Monday
        this.setState({
          userData: {
            workingHours: {
              Monday: totalTimeMonday,
              Tuesday: "0000000000000000",
              Wednesday: "0000000000000000",
              Thursday: "0000000000000000",
              Friday: "0000000000000000",
              Saturday: "0000000000000000",
              Sunday: "0000000000000000",
              openNowOverride: "0000000000000000",
            }
        }
        })
        break;
        case 'tuesday' :
            let timeTuesday = this.state.userData.workingHours.Tuesday
            let hourTuesday = e.getHours()
            hourTuesday = ("0" + hourTuesday).slice(-2)
            let minutesTuesday = e.getMinutes()
            minutesTuesday = ("0" + minutesTuesday).slice(-2)
            let currTime1Tuesday = timeTuesday.slice(0,4)
            let currTime2Tuesday = timeTuesday.slice(8,16)
            let totalTimeTuesday = currTime1Tuesday+hourTuesday.toString()+ minutesTuesday.toString()+ currTime2Tuesday
            this.setState({
              userData: {
                workingHours: {
                  Monday: "0000000000000000",
                  Tuesday: totalTimeTuesday,
                  Wednesday: "0000000000000000",
                  Thursday: "0000000000000000",
                  Friday: "0000000000000000",
                  Saturday: "0000000000000000",
                  Sunday: "0000000000000000",
                  openNowOverride: "0000000000000000",
                }
            }
            })
          break;
          case 'wednesday' :
              let timeWednesday = this.state.userData.workingHours.Wednesday
              let hourWednsday = e.getHours()
              hourWednsday = ("0" + hourWednsday).slice(-2)
              let minutesWednesday = e.getMinutes()
              minutesWednesday = ("0" + minutesWednesday).slice(-2)
              let currTime1Wednesday = timeWednesday.slice(0,4)
              let currTime2Wednesday = timeWednesday.slice(8,16)
              let totalTimeWednesday = currTime1Wednesday+hourWednsday.toString()+ minutesWednesday.toString()+ currTime2Wednesday
              this.setState({
                userData: {
                  workingHours: {
                    Monday: "0000000000000000",
                    Tuesday: "0000000000000000",
                    Wednesday: totalTimeWednesday,
                    Thursday: "0000000000000000",
                    Friday: "0000000000000000",
                    Saturday: "0000000000000000",
                    Sunday: "0000000000000000",
                    openNowOverride: "0000000000000000",
                  }
              }
              })
            break;
            case 'thursday' :
                let timeThursday = this.state.userData.workingHours.Thursday
                let hourThursday = e.getHours()
                hourThursday = ("0" + hourThursday).slice(-2)
                let minutesThursday = e.getMinutes()
                minutesThursday = ("0" + minutesThursday).slice(-2)
                let currTime1Thursday = timeThursday.slice(0,4)
                let currTime2Thursday = timeThursday.slice(8,16)
                let totalTimeThursday = currTime1Thursday+hourThursday.toString()+ minutesThursday.toString()+ currTime2Thursday
                this.setState({
                  userData: {
                    workingHours: {
                      Monday: "0000000000000000",
                      Tuesday: "0000000000000000",
                      Wednesday: "0000000000000000",
                      Thursday: totalTimeThursday,
                      Friday: "0000000000000000",
                      Saturday: "0000000000000000",
                      Sunday: "0000000000000000",
                      openNowOverride: "0000000000000000",
                    }
                }
                })
              break;
              case 'friday' :
                  let timeFriday = this.state.userData.workingHours.Friday
                  let hourFriday = e.getHours()
                  hourFriday = ("0" + hourFriday).slice(-2)
                  let minutesFriday = e.getMinutes()
                  minutesFriday = ("0" + minutesFriday).slice(-2)
                  let currTime1Friday = timeFriday.slice(0,4)
                  let currTime2Friday = timeFriday.slice(8,16)
                  let totalTimeFriday = currTime1Friday+hourFriday.toString()+ minutesFriday.toString()+ currTime2Friday
                  this.setState({
                    userData: {
                      workingHours: {
                        Monday: "0000000000000000",
                        Tuesday: "0000000000000000",
                        Wednesday: "0000000000000000",
                        Thursday: "0000000000000000",
                        Friday: totalTimeFriday,
                        Saturday: "0000000000000000",
                        Sunday: "0000000000000000",
                        openNowOverride: "0000000000000000",
                      }
                  }
                  })
                break;
                case 'saturday' :
                    let timeSaturday = this.state.userData.workingHours.Saturday
                    let hourSaturday = e.getHours()
                    hourSaturday = ("0" + hourSaturday).slice(-2)
                    let minutesSaturday = e.getMinutes()
                    minutesSaturday = ("0" + minutesSaturday).slice(-2)
                    let currTime1Saturday = timeSaturday.slice(0,4)
                    let currTime2Saturday = timeSaturday.slice(8,16)
                    let totalTimeSaturday = currTime1Saturday+hourSaturday.toString()+ minutesSaturday.toString()+ currTime2Saturday
                    this.setState({
                      userData: {
                        workingHours: {
                          Monday: "0000000000000000",
                          Tuesday: "0000000000000000",
                          Wednesday: "0000000000000000",
                          Thursday: "0000000000000000",
                          Friday: "0000000000000000",
                          Saturday: totalTimeSaturday,
                          Sunday: "0000000000000000",
                          openNowOverride: "0000000000000000",
                        }
                    }
                    })
                  break;
                  case 'sunday' :
                      let timeSunday = this.state.userData.workingHours.Sunday
                      let hourSunday = e.getHours()
                      hourSunday = ("0" + hourSunday).slice(-2)
                      let minutesSunday = e.getMinutes()
                      minutesSunday = ("0" + minutesSunday).slice(-2)
                      let currTime1Sunday = timeSunday.slice(0,4)
                      let currTime2Sunday = timeSunday.slice(8,16)
                      let totalTimeSunday = currTime1Sunday+hourSunday.toString()+ minutesSunday.toString()+ currTime2Sunday
                      this.setState({
                        userData: {
                          workingHours: {
                            Monday: "0000000000000000",
                            Tuesday: "0000000000000000",
                            Wednesday: "0000000000000000",
                            Thursday: "0000000000000000",
                            Friday: "0000000000000000",
                            Saturday: "0000000000000000",
                            Sunday: totalTimeSunday,
                            openNowOverride: "0000000000000000",
                          }
                      }
                      })
                    break;
                  default:
    }
  };

  handleDateChangeOpeningSecond = (e, dayName) => {
    let dayNameFirstOpeningTime = this.state.day[dayName].day;
    switch (dayNameFirstOpeningTime) {
      case "monday":
        let timeMonday = this.state.userData.workingHours.Monday
        let hourMonday = e.getHours()
        hourMonday = ("0" + hourMonday).slice(-2)
        let minutesMonday = e.getMinutes()
        minutesMonday = ("0" + minutesMonday).slice(-2)
        let currTime1Monday = timeMonday.slice(0,8)
        let currTime2Monday = timeMonday.slice(12,16)
        let totalTimeMonday = currTime1Monday+hourMonday.toString()+ minutesMonday.toString()+ currTime2Monday
        this.setState({
          userData: {
            workingHours: {
              Monday: totalTimeMonday,
              Tuesday: "0000000000000000",
              Wednesday: "0000000000000000",
              Thursday: "0000000000000000",
              Friday: "0000000000000000",
              Saturday: "0000000000000000",
              Sunday: "0000000000000000",
              openNowOverride: "0000000000000000",
            }
        }
        })
        break;
        case 'tuesday' :
            let timeTuesday = this.state.userData.workingHours.Tuesday
            let hourTuesday = e.getHours()
            hourTuesday = ("0" + hourTuesday).slice(-2)
            let minutesTuesday = e.getMinutes()
            minutesTuesday = ("0" + minutesTuesday).slice(-2)
            let currTime1Tuesday = timeTuesday.slice(0,8)
            let currTime2Tuesday = timeTuesday.slice(12,16)
            let totalTimeTuesday = currTime1Tuesday+hourTuesday.toString()+ minutesTuesday.toString()+ currTime2Tuesday
            this.setState({
              userData: {
                workingHours: {
                  Monday: "0000000000000000",
                  Tuesday: totalTimeTuesday,
                  Wednesday: "0000000000000000",
                  Thursday: "0000000000000000",
                  Friday: "0000000000000000",
                  Saturday: "0000000000000000",
                  Sunday: "0000000000000000",
                  openNowOverride: "0000000000000000",
                }
            }
            })
          break;
          case 'wednesday' :
              let timeWednesday = this.state.userData.workingHours.Wednesday
              let hourWednsday = e.getHours()
              hourWednsday = ("0" + hourWednsday).slice(-2)
              let minutesWednesday = e.getMinutes()
              minutesWednesday = ("0" + minutesWednesday).slice(-2)
              let currTime1Wednesday = timeWednesday.slice(0,8)
              let currTime2Wednesday = timeWednesday.slice(12,16)
              let totalTimeWednesday = currTime1Wednesday+hourWednsday.toString()+ minutesWednesday.toString()+ currTime2Wednesday
              this.setState({
                userData: {
                  workingHours: {
                    Monday: "0000000000000000",
                    Tuesday: "0000000000000000",
                    Wednesday: totalTimeWednesday,
                    Thursday: "0000000000000000",
                    Friday: "0000000000000000",
                    Saturday: "0000000000000000",
                    Sunday: "0000000000000000",
                    openNowOverride: "0000000000000000",
                  }
              }
              })
            break;
            case 'thursday' :
                let timeThursday = this.state.userData.workingHours.Thursday
                let hourThursday = e.getHours()
                hourThursday = ("0" + hourThursday).slice(-2)
                let minutesThursday = e.getMinutes()
                minutesThursday = ("0" + minutesThursday).slice(-2)
                let currTime1Thursday = timeThursday.slice(0,8)
                let currTime2Thursday = timeThursday.slice(12,16)
                let totalTimeThursday = currTime1Thursday+hourThursday.toString()+ minutesThursday.toString()+ currTime2Thursday
                this.setState({
                  userData: {
                    workingHours: {
                      Monday: "0000000000000000",
                      Tuesday: "0000000000000000",
                      Wednesday: "0000000000000000",
                      Thursday: totalTimeThursday,
                      Friday: "0000000000000000",
                      Saturday: "0000000000000000",
                      Sunday: "0000000000000000",
                      openNowOverride: "0000000000000000",
                    }
                }
                })
              break;
              case 'friday' :
                  let timeFriday = this.state.userData.workingHours.Friday
                  let hourFriday = e.getHours()
                  hourFriday = ("0" + hourFriday).slice(-2)
                  let minutesFriday = e.getMinutes()
                  minutesFriday = ("0" + minutesFriday).slice(-2)
                  let currTime1Friday = timeFriday.slice(0,8)
                  let currTime2Friday = timeFriday.slice(12,16)
                  let totalTimeFriday = currTime1Friday+hourFriday.toString()+ minutesFriday.toString()+ currTime2Friday
                  this.setState({
                    userData: {
                      workingHours: {
                        Monday: "0000000000000000",
                        Tuesday: "0000000000000000",
                        Wednesday: "0000000000000000",
                        Thursday: "0000000000000000",
                        Friday: totalTimeFriday,
                        Saturday: "0000000000000000",
                        Sunday: "0000000000000000",
                        openNowOverride: "0000000000000000",
                      }
                  }
                  })
                break;
                case 'saturday' :
                    let timeSaturday = this.state.userData.workingHours.Saturday
                    let hourSaturday = e.getHours()
                    hourSaturday = ("0" + hourSaturday).slice(-2)
                    let minutesSaturday = e.getMinutes()
                    minutesSaturday = ("0" + minutesSaturday).slice(-2)
                    let currTime1Saturday = timeSaturday.slice(0,8)
                    let currTime2Saturday = timeSaturday.slice(12,16)
                    let totalTimeSaturday = currTime1Saturday+hourSaturday.toString()+ minutesSaturday.toString()+ currTime2Saturday
                    this.setState({
                      userData: {
                        workingHours: {
                          Monday: "0000000000000000",
                          Tuesday: "0000000000000000",
                          Wednesday: "0000000000000000",
                          Thursday: "0000000000000000",
                          Friday: "0000000000000000",
                          Saturday: totalTimeSaturday,
                          Sunday: "0000000000000000",
                          openNowOverride: "0000000000000000",
                        }
                    }
                    })
                  break;
                  case 'sunday' :
                      let timeSunday = this.state.userData.workingHours.Sunday
                      let hourSunday = e.getHours()
                      hourSunday = ("0" + hourSunday).slice(-2)
                      let minutesSunday = e.getMinutes()
                      minutesSunday = ("0" + minutesSunday).slice(-2)
                      let currTime1Sunday = timeSunday.slice(0,8)
                      let currTime2Sunday = timeSunday.slice(12,16)
                      let totalTimeSunday = currTime1Sunday+hourSunday.toString()+ minutesSunday.toString()+ currTime2Sunday
                      this.setState({
                        userData: {
                          workingHours: {
                            Monday: "0000000000000000",
                            Tuesday: "0000000000000000",
                            Wednesday: "0000000000000000",
                            Thursday: "0000000000000000",
                            Friday: "0000000000000000",
                            Saturday: "0000000000000000",
                            Sunday: totalTimeSunday,
                            openNowOverride: "0000000000000000",
                          }
                      }
                      })
                    break;
                  default:
    }
  };

  handleDateChangeClosingSecond = (e, dayName) => {
    let dayNameFirstOpeningTime = this.state.day[dayName].day;
    switch (dayNameFirstOpeningTime) {
      case "monday":
        let timeMonday = this.state.userData.workingHours.Monday
        let hourMonday = e.getHours()
        hourMonday = ("0" + hourMonday).slice(-2)
        let minutesMonday = e.getMinutes()
        minutesMonday = ("0" + minutesMonday).slice(-2)
        let currTimeMonday = timeMonday.slice(0,12)
        let totalTimeMonday = currTimeMonday + hourMonday.toString()+minutesMonday.toString()
        this.setState({
          userData: {
            workingHours: {
              Monday: totalTimeMonday,
              Tuesday: "0000000000000000",
              Wednesday: "0000000000000000",
              Thursday: "0000000000000000",
              Friday: "0000000000000000",
              Saturday: "0000000000000000",
              Sunday: "0000000000000000",
              openNowOverride: "0000000000000000",
            }
        }
        })
        break;
        case 'tuesday' :
            let timeTuesday = this.state.userData.workingHours.Tuesday
            let hourTuesday = e.getHours()
            hourTuesday = ("0" + hourTuesday).slice(-2)
            let minutesTuesday = e.getMinutes()
            minutesTuesday = ("0" + minutesTuesday).slice(-2)
            let currTimeTuesday = timeTuesday.slice(0,12)
            let totalTimeTuesday = currTimeTuesday + hourTuesday.toString()+minutesTuesday.toString()
            this.setState({
              userData: {
                workingHours: {
                  Monday: "0000000000000000",
                  Tuesday: totalTimeTuesday,
                  Wednesday: "0000000000000000",
                  Thursday: "0000000000000000",
                  Friday: "0000000000000000",
                  Saturday: "0000000000000000",
                  Sunday: "0000000000000000",
                  openNowOverride: "0000000000000000",
                }
            }
            })
          break;
          case 'wednesday' :
              let timeWednesday = this.state.userData.workingHours.Wednesday
              let hourWednsday = e.getHours()
              hourWednsday = ("0" + hourWednsday).slice(-2)
              let minutesWednesday = e.getMinutes()
              minutesWednesday = ("0" + minutesWednesday).slice(-2)
              let currTimeWednesday = timeWednesday.slice(0,12)
              let totalTimeWednesday = currTimeWednesday + hourWednsday.toString()+minutesWednesday.toString()
              this.setState({
                userData: {
                  workingHours: {
                    Monday: "0000000000000000",
                    Tuesday: "0000000000000000",
                    Wednesday: totalTimeWednesday,
                    Thursday: "0000000000000000",
                    Friday: "0000000000000000",
                    Saturday: "0000000000000000",
                    Sunday: "0000000000000000",
                    openNowOverride: "0000000000000000",
                  }
              }
              })
            break;
            case 'thursday' :
                let timeThursday = this.state.userData.workingHours.Thursday
                let hourThursday = e.getHours()
                hourThursday = ("0" + hourThursday).slice(-2)
                let minutesThursday = e.getMinutes()
                minutesThursday = ("0" + minutesThursday).slice(-2)
                let currTimeThursday = timeThursday.slice(0,12)
                let totalTimeThursday = currTimeThursday + hourThursday.toString()+minutesThursday.toString()
                this.setState({
                  userData: {
                    workingHours: {
                      Monday: "0000000000000000",
                      Tuesday: "0000000000000000",
                      Wednesday: "0000000000000000",
                      Thursday: totalTimeThursday,
                      Friday: "0000000000000000",
                      Saturday: "0000000000000000",
                      Sunday: "0000000000000000",
                      openNowOverride: "0000000000000000",
                    }
                }
                })
              break;
              case 'friday' :
                  let timeFriday = this.state.userData.workingHours.Friday
                  let hourFriday = e.getHours()
                  hourFriday = ("0" + hourFriday).slice(-2)
                  let minutesFriday = e.getMinutes()
                  minutesFriday = ("0" + minutesFriday).slice(-2)
                  let currTimeFriday = timeFriday.slice(0,12)
                  let totalTimeFriday = currTimeFriday + hourFriday.toString()+minutesFriday.toString()
                  this.setState({
                    userData: {
                      workingHours: {
                        Monday: "0000000000000000",
                        Tuesday: "0000000000000000",
                        Wednesday: "0000000000000000",
                        Thursday: "0000000000000000",
                        Friday: totalTimeFriday,
                        Saturday: "0000000000000000",
                        Sunday: "0000000000000000",
                        openNowOverride: "0000000000000000",
                      }
                  }
                  })
                break;
                case 'saturday' :
                    let timeSaturday = this.state.userData.workingHours.Saturday
                    let hourSaturday = e.getHours()
                    hourSaturday = ("0" + hourSaturday).slice(-2)
                    let minutesSaturday = e.getMinutes()
                    minutesSaturday = ("0" + minutesSaturday).slice(-2)
                    let currTimeSaturday = timeSaturday.slice(0,12)
                    let totalTimeSaturday = currTimeSaturday + hourSaturday.toString()+minutesSaturday.toString()
                    this.setState({
                      userData: {
                        workingHours: {
                          Monday: "0000000000000000",
                          Tuesday: "0000000000000000",
                          Wednesday: "0000000000000000",
                          Thursday: "0000000000000000",
                          Friday: "0000000000000000",
                          Saturday: totalTimeSaturday,
                          Sunday: "0000000000000000",
                          openNowOverride: "0000000000000000",
                        }
                    }
                    })
                  break;
                  case 'sunday' :
                      let timeSunday = this.state.userData.workingHours.Sunday
                      let hourSunday = e.getHours()
                      hourSunday = ("0" + hourSunday).slice(-2)
                      let minutesSunday = e.getMinutes()
                      minutesSunday = ("0" + minutesSunday).slice(-2)
                      let currTimeSunday = timeSunday.slice(0,12)
                      let totalTimeSunday = currTimeSunday+hourSunday.toString()+minutesSunday.toString()
                      this.setState({
                        userData: {
                          workingHours: {
                            Monday: "0000000000000000",
                            Tuesday: "0000000000000000",
                            Wednesday: "0000000000000000",
                            Thursday: "0000000000000000",
                            Friday: "0000000000000000",
                            Saturday: "0000000000000000",
                            Sunday: totalTimeSunday,
                            openNowOverride: "0000000000000000",
                          }
                      }
                      })
                    break;
                  default:
    }
  };

  submitTime = (dayName) => {
    dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1,dayName.length)
    console.log(dayName)
    let openingFirstHour = ("0" + this.state.userData.workingHours[dayName].slice(0,2)).slice(-2);
    let openingSecondHour = ("0" + this.state.userData.workingHours[dayName].slice(8,10)).slice(-2);
    let closingFirstHour = ("0" + this.state.userData.workingHours[dayName].slice(4,6)).slice(-2);
    let closingSecondHour = ("0" + this.state.userData.workingHours[dayName].slice(12,14)).slice(-2);
    let openingFirstMinutes = ("0" + this.state.userData.workingHours[dayName].slice(2,4)).slice(-2);
    let openingSecondMinutes = ("0" + this.state.userData.workingHours[dayName].slice(10,12)).slice(-2);
    let closingFirstMinutes = ("0" + this.state.userData.workingHours[dayName].slice(6,8)).slice(-2);
    let closingSecondMinutes = ("0" + this.state.userData.workingHours[dayName].slice(14,16)).slice(-2);
    let totalToSend = "" + openingFirstHour + openingFirstMinutes+ closingFirstHour + closingFirstMinutes + openingSecondHour + openingSecondMinutes + closingSecondHour + closingSecondMinutes;
    
    console.log(totalToSend);

    this.setState({
      totalToSend: totalToSend,
      dayToSend: dayName
    },
    () => this.APIcallCheck())
  }

  APIcallCheck = () => {
      let apiName = "PartnerService";
              let path = "/PartnerServiceUpdateWorkingHoursLambda";
              let myInit = {
                body:{
                  username: this.props.user.attributes.email,
        workingHours: this.state.totalToSend,
        day: this.state.dayToSend
                },
                headers: {
                  Authorization: this.props.user.signInUserSession.accessToken
                    .jwtToken
                }
              };
              API.post(apiName, path, myInit)
                .then(response => {
                  console.log("Result Posted")
                })
                .catch(error => {
                  console.log(error);
                });
  };



getUserData = () =>{
  if (this.props.user.signInUserSession.accessToken.jwtToken) {
    if (this.state.dataLoadedFromAPI == null) {
      let apiName = "PartnerService";
      let path = "/PartnerServiceGetUserDetailsLambda";
      let myInit = {
        // OPTIONAL
        queryStringParameters: {
          username: this.props.user.attributes.email
        },
        headers: {
          Authorization: this.props.user.signInUserSession.accessToken
            .jwtToken
        }
      };
      API.get(apiName, path, myInit)
        .then(response => {
            this.setState({
              userData: response.body,
              dataLoadedFromAPI: true
            })
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  }

componentDidUpdate = () => {
    this.getUserData()
 }

  render() {
    return (
      <div>
        <Button variant="outlined" color="secondary" onClick={this.openModal}>
          Edit Timings
        </Button>
        <Dialog
          open={this.state.modalIsOpen}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          style={dialogStyle} 
        >
          <h2 style={headingStyle} color="secondary" >
            Edit Timings
            <Button style={closeButtonStyle} variant="outlined" color="secondary" onClick={this.closeModal}>
            <i className="fa fa-times" aria-hidden="true" />
            </Button>
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
              <Typography component={'span'}>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:(Morning){" "}
                    <GetTime
                      day={this.state.day.monday.day}
                      selectedDate={this.state.day.monday.openingFirst.setHours(this.state.userData.workingHours.Monday.substring(0,2),this.state.userData.workingHours.Monday.substring(2,4))}
                      handleDateChange={(e) => this.handleDateChangeOpeningFirst(e,this.state.day.monday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.monday.day}
                      selectedDate={this.state.day.monday.closingFirst.setHours(this.state.userData.workingHours.Monday.substring(4,6),this.state.userData.workingHours.Monday.substring(6,8))}
                      handleDateChange={(e) =>this.handleDateChangeClosingFirst(e,this.state.day.monday.day)}
                    />
                  </div>
                  <div className="secondTime">
                    From:(Evening){" "}
                    <GetTime
                      day={this.state.day.monday.day}
                      selectedDate={this.state.day.monday.openingSecond.setHours(this.state.userData.workingHours.Monday.substring(8,10),this.state.userData.workingHours.Monday.substring(10,12))}
                      handleDateChange={(e) => this.handleDateChangeOpeningSecond(e,this.state.day.monday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.monday.day}
                      selectedDate={this.state.day.monday.closingSecond.setHours(this.state.userData.workingHours.Monday.substring(12,14),this.state.userData.workingHours.Monday.substring(14,16))}
                      handleDateChange={(e) => this.handleDateChangeClosingSecond(e,this.state.day.monday.day)}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              style={buttonStyle}
              className="submitButton"
              onClick={ () => this.submitTime(this.state.day.monday.day)}
            >
              Save
            </Button>
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
              <Typography component={'span'}>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:(Morning){" "}
                    <GetTime
                      day={this.state.day.tuesday.day}
                      selectedDate={this.state.day.tuesday.openingFirst.setHours(this.state.userData.workingHours.Tuesday.substring(0,2),this.state.userData.workingHours.Tuesday.substring(2,4))}
                      handleDateChange={(e) => this.handleDateChangeOpeningFirst(e,this.state.day.tuesday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.tuesday.day}
                      selectedDate={this.state.day.tuesday.closingFirst.setHours(this.state.userData.workingHours.Tuesday.substring(4,6),this.state.userData.workingHours.Tuesday.substring(6,8))}
                      handleDateChange={(e) =>this.handleDateChangeClosingFirst(e,this.state.day.tuesday.day)}
                    />
                  </div>
                  <div className="secondTime">
                    From:(Evening){" "}
                    <GetTime
                      day={this.state.day.tuesday.day}
                      selectedDate={this.state.day.tuesday.openingSecond.setHours(this.state.userData.workingHours.Tuesday.substring(8,10),this.state.userData.workingHours.Tuesday.substring(10,12))}
                      handleDateChange={(e) =>this.handleDateChangeOpeningSecond(e,this.state.day.tuesday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.tuesday.day}
                      selectedDate={this.state.day.tuesday.closingSecond.setHours(this.state.userData.workingHours.Tuesday.substring(12,14),this.state.userData.workingHours.Tuesday.substring(14,16))}
                      handleDateChange={(e) =>this.handleDateChangeClosingSecond(e,this.state.day.tuesday.day)}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              style={buttonStyle}
              className="submitButton"
              onClick={ () => this.submitTime(this.state.day.tuesday.day)}
            >
              Save
            </Button>
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
              <Typography component={'span'}>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:(Morning){" "}
                    <GetTime
                      day={this.state.day.wednesday.day}
                      selectedDate={this.state.day.wednesday.openingFirst.setHours(this.state.userData.workingHours.Wednesday.substring(0,2),this.state.userData.workingHours.Wednesday.substring(2,4))}
                      handleDateChange={(e) =>this.handleDateChangeOpeningFirst(e,this.state.day.wednesday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.wednesday.day}
                      selectedDate={this.state.day.wednesday.closingFirst.setHours(this.state.userData.workingHours.Wednesday.substring(4,6),this.state.userData.workingHours.Wednesday.substring(6,8))}
                      handleDateChange={(e) =>this.handleDateChangeClosingFirst(e,this.state.day.wednesday.day)}
                    />
                  </div>
                  <div className="secondTime">
                    From:(Evening){" "}
                    <GetTime
                      day={this.state.day.wednesday.day}
                      selectedDate={this.state.day.wednesday.openingSecond.setHours(this.state.userData.workingHours.Wednesday.substring(8,10),this.state.userData.workingHours.Wednesday.substring(10,12))}
                      handleDateChange={(e) =>this.handleDateChangeOpeningSecond(e,this.state.day.wednesday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.wednesday.day}
                      selectedDate={this.state.day.wednesday.closingSecond.setHours(this.state.userData.workingHours.Wednesday.substring(12,14),this.state.userData.workingHours.Wednesday.substring(14,16))}
                      handleDateChange={(e) =>this.handleDateChangeClosingSecond(e,this.state.day.wednesday.day)}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              style={buttonStyle}
              className="submitButton"
              onClick={ () => this.submitTime(this.state.day.wednesday.day)}
            >
              Save
            </Button>
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
              <Typography component={'span'}>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:(Morning){" "}
                    <GetTime
                      day={this.state.day.thursday.day}
                      selectedDate={this.state.day.thursday.openingFirst.setHours(this.state.userData.workingHours.Thursday.substring(0,2),this.state.userData.workingHours.Thursday.substring(2,4))}
                      handleDateChange={(e) =>this.handleDateChangeOpeningFirst(e,this.state.day.thursday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.thursday.day}
                      selectedDate={this.state.day.thursday.closingFirst.setHours(this.state.userData.workingHours.Thursday.substring(4,6),this.state.userData.workingHours.Thursday.substring(6,8))}
                      handleDateChange={(e) =>this.handleDateChangeClosingFirst(e,this.state.day.thursday.day)}
                    />
                  </div>
                  <div className="secondTime">
                    From:(Evening){" "}
                    <GetTime
                      day={this.state.day.thursday.day}
                      selectedDate={this.state.day.thursday.openingSecond.setHours(this.state.userData.workingHours.Thursday.substring(8,10),this.state.userData.workingHours.Thursday.substring(10,12))}
                      handleDateChange={(e) =>this.handleDateChangeOpeningSecond(e,this.state.day.thursday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.thursday.day}
                      selectedDate={this.state.day.thursday.closingSecond.setHours(this.state.userData.workingHours.Thursday.substring(12,14),this.state.userData.workingHours.Thursday.substring(14,16))}
                      handleDateChange={(e) =>this.handleDateChangeClosingSecond(e,this.state.day.thursday.day)}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              style={buttonStyle}
              className="submitButton"
              onClick={ () => this.submitTime(this.state.day.thursday.day)}
            >
              Save
            </Button>
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
              <Typography component={'span'}>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:(Morning){" "}
                    <GetTime
                      day={this.state.day.friday.day}
                      selectedDate={this.state.day.friday.openingFirst.setHours(this.state.userData.workingHours.Friday.substring(0,2),this.state.userData.workingHours.Friday.substring(2,4))}
                      handleDateChange={(e) =>this.handleDateChangeOpeningFirst(e,this.state.day.friday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.friday.day}
                      selectedDate={this.state.day.friday.closingFirst.setHours(this.state.userData.workingHours.Friday.substring(4,6),this.state.userData.workingHours.Friday.substring(6,8))}
                      handleDateChange={(e) =>this.handleDateChangeClosingFirst(e,this.state.day.friday.day)}
                    />
                  </div>
                  <div className="secondTime">
                    From:(Evening){" "}
                    <GetTime
                      day={this.state.day.friday.day}
                      selectedDate={this.state.day.friday.openingSecond.setHours(this.state.userData.workingHours.Friday.substring(8,10),this.state.userData.workingHours.Friday.substring(10,12))}
                      handleDateChange={(e) =>this.handleDateChangeOpeningSecond(e,this.state.day.friday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.friday.day}
                      selectedDate={this.state.day.friday.closingSecond.setHours(this.state.userData.workingHours.Friday.substring(12,14),this.state.userData.workingHours.Friday.substring(14,16))}
                      handleDateChange={(e) =>this.handleDateChangeClosingSecond(e,this.state.day.friday.day)}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              style={buttonStyle}
              className="submitButton"
              onClick={ () => this.submitTime(this.state.day.friday.day)}
            >
              Save
            </Button>
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
              <Typography component={'span'}>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:(Morning){" "}
                    <GetTime
                      day={this.state.day.saturday.day}
                      selectedDate={this.state.day.saturday.openingFirst.setHours(this.state.userData.workingHours.Saturday.substring(0,2),this.state.userData.workingHours.Saturday.substring(2,4))}
                      handleDateChange={(e) =>this.handleDateChangeOpeningFirst(e,this.state.day.saturday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.saturday.day}
                      selectedDate={this.state.day.saturday.closingFirst.setHours(this.state.userData.workingHours.Saturday.substring(4,6),this.state.userData.workingHours.Saturday.substring(6,8))}
                      handleDateChange={(e) =>this.handleDateChangeClosingFirst(e,this.state.day.saturday.day)}
                    />
                  </div>
                  <div className="secondTime">
                    From:(Evening){" "}
                    <GetTime
                      day={this.state.day.saturday.day}
                      selectedDate={this.state.day.saturday.openingSecond.setHours(this.state.userData.workingHours.Saturday.substring(8,10),this.state.userData.workingHours.Saturday.substring(10,12))}
                      handleDateChange={(e) =>this.handleDateChangeOpeningSecond(e,this.state.day.saturday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.saturday.day}
                      selectedDate={this.state.day.saturday.closingSecond.setHours(this.state.userData.workingHours.Saturday.substring(12,14),this.state.userData.workingHours.Saturday.substring(14,16))}
                      handleDateChange={(e) =>this.handleDateChangeClosingSecond(e,this.state.day.saturday.day)}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              style={buttonStyle}
              className="submitButton"
              onClick={ () => this.submitTime(this.state.day.saturday.day)}
            >
              Save
            </Button>
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
              <Typography component={'span'}>
                <div className="wrappingDivForTwoTimes">
                  <div className="firstTime">
                    From:(Morning){" "}
                    <GetTime
                      day={this.state.day.sunday.day}
                      selectedDate={this.state.day.sunday.openingFirst.setHours(this.state.userData.workingHours.Sunday.substring(0,2),this.state.userData.workingHours.Sunday.substring(2,4))}
                      handleDateChange={(e) =>this.handleDateChangeOpeningFirst(e,this.state.day.sunday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.sunday.day}
                      selectedDate={this.state.day.sunday.closingFirst.setHours(this.state.userData.workingHours.Sunday.substring(4,6),this.state.userData.workingHours.Sunday.substring(6,8))}
                      handleDateChange={(e) =>this.handleDateChangeClosingFirst(e,this.state.day.sunday.day)}
                    />
                  </div>
                  <div className="secondTime">
                    From:(Evening){" "}
                    <GetTime
                      day={this.state.day.sunday.day}
                      selectedDate={this.state.day.sunday.openingSecond.setHours(this.state.userData.workingHours.Sunday.substring(8,10),this.state.userData.workingHours.Sunday.substring(10,12))}
                      handleDateChange={(e) =>this.handleDateChangeOpeningSecond(e,this.state.day.sunday.day)}
                    />
                    <br />
                    
                    To :{" "}
                    <br />
                    <GetTime
                      day={this.state.day.sunday.day}
                      selectedDate={this.state.day.sunday.closingSecond.setHours(this.state.userData.workingHours.Sunday.substring(12,14),this.state.userData.workingHours.Sunday.substring(14,16))}
                      handleDateChange={(e) =>this.handleDateChangeClosingSecond(e,this.state.day.sunday.day)}
                    />
                  </div>
                </div>
              </Typography>
            </ExpansionPanelDetails>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              style={buttonStyle}
              className="submitButton"
              onClick={ () => this.submitTime(this.state.day.sunday.day)}
            >
              Save
            </Button>
          </ExpansionPanel>
          </Dialog>
      </div>
    );
  }
}

export default ModalTest;
