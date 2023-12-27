// Custom server.js
// I have used it for solving strict-origin-when-cross-origin issue using the CORS middleware
const cds = require('@sap/cds')
const cors = require('cors');

cds.on('bootstrap', (app) => { 
    app.use(cors());
    app.use((req,res,next) => {
        res.append("Access-Control-Expose-Header","OData-Version");
        next();
    });
})