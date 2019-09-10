import React, { useReducer } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';

const InitalState = {
    modalIsOpen: false,
    currentPassword: ' ',
    newpassword: ' ',
    confirmNewPassword: ' ',
    passwordSetSuccessFul: 0
};

const dialogStyle = {
  // backgroundColor: 'black',
  width: '100%'
};

const closeButtonStyle = {
  // float: "right",
  // marginRight: "4%",
  // marginBottom: "2%",
  // marginTop: '2%'
  position: 'absolute',
  top: '0',
  right: '0'
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    main: {
      width: 'auto',
      marginLeft: theme.spacing.unit *3,
      marginRight: theme.spacing.unit *3,
      [theme.breakpoints.up(400 + theme.spacing.unit *3 *2)]: {
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      opacity: '.9',
    },
    paper: {
      marginTop: theme.spacing.unit *8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit *2}px ${theme.spacing.unit *3}px ${theme.spacing.unit *3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
    join: {
      paddingTop: 10,
      display: 'inlineBlock',
    },
    email: {
      fontWeight: 400,
    },
    password: {
      fontWeight: 400,
    },
    submit: {
      marginTop: theme.spacing.unit *2,
    },
    forgotpassword: {
  
      marginTop: theme.spacing.unit,
      marginLeft: theme.spacing.unit *1,
      fontWeight: 500,
      display: 'flex',
      flexDirection: 'column',
    },
    verificationCode: {
      fontWeight: 400,
    },
    links: {
      color: "White",
    },
    linkButton: {
      marginTop: '10px'
    },
    chip: {
      margin: theme.spacing.unit,
      height: '50px',
      color: '#2e7d32',
      fontWeight: 'bold'
    },
  })
);

export default function ChangePasswordInside (props) {
  const classes = useStyles();
    const reducer = (state,action) => {
        switch(action.type) {
            case 'modalOpened':
                return {
                    ...state,
                    modalIsOpen:true
                }
              case 'handleChangeCurentPassword':
                return {
                  ...state,
                  currentPassword: action.value
                }
              case 'handleChangeNewPassword':
                return {
                  ...state,
                  newpassword: action.value
                }
              case 'handleChangeConfirmNewPassword':
                return {
                  ...state,
                  confirmNewPassword: action.value
                }
              case 'passwordSetSuccesful':
                return {
                  ...state,
                  passwordSetSuccessFul: 1
                }
              case 'modalClosed':
                return {
                    ...state,
                    modalIsOpen:false
                }
                default:
        }
    }
    const [state,dispatch] = useReducer(reducer, InitalState)
    const openModal = () => {
        dispatch({
            type: 'modalOpened'
        })
      }

     const handleChangeCurentPassword = (event) => {
        event.preventDefault();
        dispatch({
          type: 'handleChangeCurentPassword',
          value: event.target.value
      })
      }

      const handleChangeNewPassword = (event) => {
        event.preventDefault();
        dispatch({
          type: 'handleChangeNewPassword',
          value: event.target.value
      })
      }

      const handleChangeConfirmNewPassword = (event) => {
        event.preventDefault();
        dispatch({
          type: 'handleChangeConfirmNewPassword',
          value: event.target.value
      })
      }

    const updatePassword = (e) => {
      e.preventDefault()
      console.log(state.currentPassword, state.confirmNewPassword)
      if(state.newpassword === state.confirmNewPassword) {
        if(state.newpassword.length>=6) {
          Auth.changePassword(props.user, state.currentPassword, state.confirmNewPassword)
          .then(data => 
            dispatch({
              type: 'passwordSetSuccesful',
          }))
          .catch(err => console.log(err));
        }
          else {
            alert("Password should be of at least 6 characters")
          }
      }
      else {
        alert("Password Do not Match!! Please check the Password again")
      }
    }

    const closeModal = () => {
      dispatch({
        type: 'modalClosed'
    })
    }

    const checkModal = (classes) => {
      if (state.passwordSetSuccessFul === 0) {
        return (
          <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Current Password</InputLabel>
                  <Input className={classes.password} onChange={(e) =>handleChangeCurentPassword(e)} name="currentPassword" type="password" id="currentPassword" />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">New Password</InputLabel>
                  <Input className={classes.password} onChange={(e) =>handleChangeNewPassword(e)} name="newpassword" type="password" id="newPassword1" />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Confirm Password</InputLabel>
                  <Input className={classes.password} onChange={(e) =>handleChangeConfirmNewPassword(e)} name="confirmNewPassword" type="password" id="newPassword2" />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e) => updatePassword(e)}
                >
                  Update Password
            </Button>
          </form>
                
        )
      }
      else {
        return (
              <div className={classes.chip}>
                Password reset was successful!!
              </div>
             
        )
      }
    }

    return(
        <div>
            <Button variant="outlined" color="secondary" onClick={openModal}>
            Change Password
            </Button>
                <Dialog
                  open={state.modalIsOpen}
                  TransitionComponent={Transition}
                  keepMounted
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                  style={dialogStyle} >
                    <main className={classes.main}>
                      <CssBaseline />
                      <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                          <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                          Change Password
                    </Typography>
                    <Button style={closeButtonStyle} variant="outlined" color="secondary" onClick={closeModal}>
                      <i className="fa fa-times" aria-hidden="true" />
                      </Button>
                {checkModal(classes)}

                </Paper>
        </main>
          </Dialog>
            
            
        </div>
    )
}