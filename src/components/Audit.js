import React, { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import { API } from "aws-amplify";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  heading2: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    paddingLeft: '2%'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  card: {
    minWidth: "80%",
  },
  chip: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: "100%",
    flexGrow: 1,
  },
  expansionPanelDetails: {
    padding: 0,
    display: 'block'
  }
}));

const InitialState = {
  currentPlan: {
      endDate: null,
      payment: {
        date: null,
        mode: null,
        paidToPartner: null,
        transactionId: null
      },
      planId: null,
      startDate: null,
      totalNumberOfVisitsAllowed: null,
      totalNumberOfVisitsLeft: null,
      visitIds: []
  },
  previousPlans: [
    {
      endDate: null,
      payment: {
        date: null,
        mode: null,
        paidToPartner: null,
        transactionId: null
      },
      planId: null,
      startDate: null,
      totalNumberOfVisitsAllowed: null,
      totalNumberOfVisitsLeft: null,
      visitIds: []
    }
  ],
  dataLoadedFromAPI: null
}

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChangePanel = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const reducer = (state,action) => {
    switch(action.type) {
      case 'getPartnerCurrentPlan': 
        return {
          ...state,
          currentPlan: action.response.body,
          dataLoadedFromAPI: true
        }
      case 'getPartnerPreviousPlans' :
        return {
          ...state,
          previousPlans: action.response.body,
          dataLoadedFromAPI: true
        }
      default :
      return {
        ...state
      }
    }
  }

  const[state,dispatch] = useReducer(reducer, InitialState)

  const getCurrentPlans = () => {
    if (props.user.signInUserSession.accessToken.jwtToken) {
      if (state.dataLoadedFromAPI == null) {
        let apiName = "PartnerService";
        let path = "/PartnerServiceGetCurrentPlanLambda";
        let myInit = {
          // OPTIONAL
          queryStringParameters: {
            username: props.user.attributes.email
          },
          headers: {
            Authorization: props.user.signInUserSession.accessToken
              .jwtToken
          }
        };
        API.get(apiName, path, myInit)
          .then(response => {
              dispatch({type: 'getPartnerCurrentPlan', response: response})
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }

  const getPreviousPlans = () => {
    if (props.user.signInUserSession.accessToken.jwtToken) {
      if (state.dataLoadedFromAPI == null) {
        let apiName = "PartnerService";
        let path = "/PartnerServiceGetPreviousPlansLambda";
        let myInit = {
          // OPTIONAL
          queryStringParameters: {
            username: props.user.attributes.email
          },
          headers: {
            Authorization: props.user.signInUserSession.accessToken
              .jwtToken
          }
        };
        API.get(apiName, path, myInit)
          .then(response => {
              dispatch({type: 'getPartnerPreviousPlans', response: response})
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }

  useEffect(() => {
    getCurrentPlans()
    getPreviousPlans()
  })

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Audit Page</span>}
      />
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChangePanel('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Current Plan</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}  variant="subtitle2" gutterBottom>
        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Plan Details</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Start Date
              </TableCell>
              <TableCell align="right">{state.currentPlan.startDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                End Date
              </TableCell>
              <TableCell align="right">{state.currentPlan.endDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Visits allowed
              </TableCell>
              <TableCell align="right">{state.currentPlan.totalNumberOfVisitsAllowed}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Visits left
              </TableCell>
              <TableCell align="right">{state.currentPlan.totalNumberOfVisitsLeft}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Payment Date
              </TableCell>
              <TableCell align="right">{state.currentPlan.payment.date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Payment mode
              </TableCell>
              <TableCell align="right">{state.currentPlan.payment.mode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Amount Paid
              </TableCell>
              <TableCell align="right">{state.currentPlan.payment.paidToPartner}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Transaction Id
              </TableCell>
              <TableCell align="right">{state.currentPlan.payment.transactionId}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
        </Typography>   
      </CardContent>
    </Card>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChangePanel('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading2}>Previous Plans</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}  variant="subtitle2" gutterBottom>
          {state.previousPlans.map(data => {
            
            return(
              <div key={data.planId}>
              <Table  className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Plans Details</TableCell>
            <TableCell align="right">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Start Date
              </TableCell>
              <TableCell align="right">{data.startDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                End Date
              </TableCell>
              <TableCell align="right">{data.endDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Visits allowed
              </TableCell>
              <TableCell align="right">{data.totalNumberOfVisitsAllowed}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Visits left
              </TableCell>
              <TableCell align="right">{data.totalNumberOfVisitsLeft}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Payment Date
              </TableCell>
              <TableCell align="right">{data.payment.date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Payment mode
              </TableCell>
              <TableCell align="right">{data.payment.mode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Amount Paid
              </TableCell>
              <TableCell align="right">{data.payment.paidToPartner}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Transaction Id
              </TableCell>
              <TableCell align="right">{data.payment.transactionId}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
      <hr  style={{
          color: '#000000',
          backgroundColor: '#000000',
          height: .5,
          borderColor : '#000000'
      }}/>
      </div>
            )
          })}
        </Typography>   
      </CardContent>
    </Card>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
