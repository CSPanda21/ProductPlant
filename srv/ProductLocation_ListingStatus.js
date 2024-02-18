const connectivity = require('@sap-cloud-sdk/connectivity');
const HttpRequest = require('@sap-cloud-sdk/http-client');

module.exports = function (srv) {

srv.on('triggerNotification', async (req) => {

 console.log("Action triggered");

 let destinationConnect = async () => {
    try {
        
            const destinations = connectivity.getDestinationFromDestinationService({destinationName: 'basic_alert' });
            const res = await destinations;
            let accessToken = res.originalProperties;
            return accessToken;
    } catch (err) {
        return err;
    }
}

let data = await destinationConnect();

let response = await HttpRequest.executeHttpRequest({ destinationName: 'basic_alert'}, {
    method: 'POST',
    url: "/cf/producer/v1/resource-events",
    data: {
        "eventType": "MyAlert",
        "resource": {
        "resourceName": "sampleName",
        "resourceType": "sampleType",
        "tags": {
            "sampleTag": "sampleValue"
                }
        },
        "severity": "FATAL",
        "category": "ALERT",
        "subject": "New Listing created",
        "body": "Wow! This message you see is triggered from CAP Application.",
        "tags": {
            "ans:correlationId": "30118",
            "ans:status": "CREATE_OR_UPDATE",
            "customTag": "customTagValue"
        }
    }
});

// console.log(data);

console.log(response.data);

});

srv.on('productListing', async (req) => { 

    // console.log(req.req.user);
    // console.log('planner' in req.req.user.roles);
    const { 'ProductLocation_ListingStatus.ProductPlant_Listing': ProductPlant_Listing } = cds.entities();
    const { 'sap.cic.product.ProductPlant.listing': Listing } = cds.entities();

    const prodPlant = await SELECT.from(ProductPlant_Listing).where({ product_id : 19091, plant_id: 1051 });
    if (prodPlant.length !== 0 ) {
        try {
            // const data = {...req.data};
            req.data.productPlant.isListed = req.data.productPlant.isListed=== undefined? true :req.data.productPlant.isListed; 
            req.data.productPlant.validFrom = req.data.productPlant.validFrom===undefined? Date() : req.data.productPlant.validFrom;
            const data = {
                up__product_id : req.data.productPlant.product_id,
                up__plant_id:    req.data.productPlant.plant_id,
                validFrom:       req.data.productPlant.validFrom,
                validTo:         req.data.productPlant.validTo,
                isListed:        req.data.productPlant.isListed
            }
            const response = await INSERT( data ).into(Listing);
            return req.info(200, "Successfuly listed");
        } catch (error) {
            if (error.code && error.message === "ENTITY_ALREADY_EXISTS" ) {
               return req.info("Listing condition exists for the date range");
            } else {
                return req.error("Listing failed");  
            }
        }  
    }
    
} )


}