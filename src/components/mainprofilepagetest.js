import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import { API } from "aws-amplify";

export default function MainProfilePageTest(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name', editable: 'never'},
      { title: 'Details', field: 'details' },
    ],
    data: [
      { 
        name: 'Gym Name',
        id: 'name',
        details: props.userData.name
      },
      {
        name: 'Phone Number',
        id: 'phoneNumber',
        details: props.userData.phoneNumber,
      },
      {
        name: 'Address',
        id: 'address',
        details: props.userData.address,
      },
      {
        name: 'Contact Person Name',
        id: 'contactPersonName',
        details: props.userData.contactPersonName,
      },
      {
        name: 'Contact Person Email',
        id: 'contactPersonEmail',
        details: props.userData.contactPersonEmail,
      },
      {
        name: 'Contact Person Phone Number',
        id: 'contactPersonNumber',
        details: props.userData.contactPersonNumber,
      },
      {
        name: 'Contact Person Designation',
        id: 'contactPersonDesignation',
        details: props.userData.contactPersonDesignation,
      },
    ],
  });
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let apiName = "PartnerService";
      let path = "/PartnerServiceUpdateUserDataLambda";
      let bodyobj = {
        username: props.user.attributes.email,
      }

      bodyobj[state.data[0].id] = state.data[0].details
      bodyobj[state.data[1].id] = state.data[1].details
      bodyobj[state.data[2].id] = state.data[2].details
      bodyobj[state.data[3].id] = state.data[3].details
      bodyobj[state.data[4].id] = state.data[4].details
      bodyobj[state.data[5].id] = state.data[5].details
      bodyobj[state.data[6].id] = state.data[6].details
      let myInit = {
        headers: {
          Authorization: props.user.signInUserSession.accessToken
            .jwtToken
        },
        body: bodyobj
      };
      API.post(apiName, path, myInit)
        .then(response => {
          console.log("Response sent")
        })
        .catch(error => {
          console.log(error);
        });
  })


  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Profile Page</span>}
      />
      <MaterialTable
      title="Gym Profile"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 300);
          }),
      }}
      options = {
        {
          pageSize : 8,
          pageSizeOptions: [8,12,15],
          paging : false
        }
      }
      style={
        {
          width: "100%",
          flexGrow: 1,
        }
        
      }
      

    />
    </div>
    
  );
}
