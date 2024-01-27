import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect } from 'react';

  const getData = async () => {

    try {
    const response = await axios.get("/api/ProductPlant_Listing",
    {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": "Fetch"
      }
    });
    const data = response.data;
    console.log("result",data);
    return data.value;
  } catch (error) {
    console.log(error);
  }
};



const ProdPlantTable = () => {

  // Get the data from server
  const [data, setData] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  },[]);

return(

    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell>Plant</TableCell>
          <TableCell align="right">isListed</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((line) => (
          <TableRow
            key={`${line.product_id}-${line.plant_id}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="line">
              {line.product_id}
            </TableCell>
            <TableCell>{line.plant_id}</TableCell>
            <TableCell align="right">{line.isListed? "Yes": "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

}

export default ProdPlantTable;


