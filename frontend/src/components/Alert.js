import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

const Alert = () => {

  // const [msg, setMsg] = useState("");
  const [product_id, setProduct] = useState("");
  const [plant_id, setPlant] = useState("");
  const [validTo, setValidTo] = useState("");

  let onListing = () => {
    //  alert('You clicked'+ msg);
    // Validation
    if (!product_id || !plant_id || !validTo) {
      alert('Fill all mandatory fields');
      return;
    }

    console.log("ValidTo",new Date(validTo).toISOString());
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
      axios.post( "/api/productListing",
      { 
          "productPlant": {
          "product_id" : product_id,
          "plant_id": plant_id,
          "validTo": new Date(validTo).toISOString()
      }
      }, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      }
      ).catch((error) => {console.log(error);});
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
      noValidate
      autoComplete="off"
    >
      <div class="flex-container" >
        {/* <TextField
          required
          id="outlined-required"
          label="Alert Message"
          defaultValue="Sample Alert Body"
          value={msg} onChange={(e) => setMsg(e.target.value)}
        /> */}
        <TextField
        required
        id="Product_ID"
        label="Product ID"
        value={product_id} onChange={(e) => setProduct(e.target.value)}
        />
        <TextField
        required
        id="Plant_ID"
        label="Plant ID"
        value={plant_id} onChange={(e) => setPlant(e.target.value)}
        />
        <TextField
        required
        id="ValidTo"
        label="ValidTo(YYYY-MM-DD)"
        value={validTo} onChange={(e) => setValidTo(e.target.value)}
        />
        <Button title="Run Listing" variant="contained" onClick={onListing}>Run Listing</Button>
      </div>
    </Box>
)

}

export default Alert;