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
        "subject": "Triggered from CAP Application",
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



})




}