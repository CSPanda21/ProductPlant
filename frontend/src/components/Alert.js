import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useState } from 'react';

const Navbar = () => {

  const [msg, setMsg] = useState("");

  let onClick = () => {
    alert('You clicked'+ msg);
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