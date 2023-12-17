import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Navbar = () => {

return(

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <h3> My App </h3>
        </Toolbar>
      </AppBar>
    </Box>
)

}

export default Navbar;