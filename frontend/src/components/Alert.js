import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

const Navbar = () => {

  const [msg, setMsg] = useState("");

  let onClick = () => {
    //  alert('You clicked'+ msg);

    //Get the csrfToken from Approuter
    axios.get("/api/ProductPlant_Listing",
    {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": "Fetch"
      }
    }).then((response) => {
      let csrfToken = response.headers['x-csrf-token'];
      //Call POST with received csrfToken
      axios.post( "/api/triggerNotification",
      { }, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      }
      ).catch((error) => {console.log(error);});

    }).catch((error) => {console.log(error);});
  
  }

return(
<Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 3, width: "50ch" }
      }}
      noValidate
      autoComplete="off"
    >
      <div class="flex-container" >
        <TextField
          required
          id="outlined-required"
          label="Alert Message"
          defaultValue="Sample Alert Body"
          value={msg} onChange={(e) => setMsg(e.target.value)}
        />
        <Button variant="contained" onClick={onClick}>Send Notification</Button>
      </div>
    </Box>
)

}

export default Navbar;