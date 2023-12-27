# Getting Started

Welcome to this new project. This is a CAP + BTP services + React project. Enjoy!!

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for App router
`frontend/` | Content for frontend app - In this case I have used React
`db/` | domain models and data go here
`srv/` | service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide



## Next Steps

- Open a new terminal and run `cds watch` 
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.

## I have added

Below Navigation URL is working:
https://port4004-workspaces-ws-r6nnf.us10.trial.applicationstudio.cloud.sap/product-location/ProductPlant(product_id='19091',plant_id='1011')/listing

Steps for installation and deploy.

Run the below commands:
- npm install
- cds add hana
- cds add mta
- mbt build
- cf deploy mta_archives/my_proj_1.0.0.mtar
- cf deploy mta_archives/my_proj_1.0.0.mtar --delete-services
- npm cache clean --force

To pull/push changes from main brach
- git pull/push origin main

To create a new branch and push your changes to remore
- git checkout -b <new_branch_name>
- git add .
- git commit -m "<message>"
- git push --set-upstrem origin  <new_branch_name>

### Branches in this repository
- main : In this branch there is domain modeling and a service. This is a complex modeling with entities and replationships and a smiple service.

- 1.Basic_service : In this branch the deployment errors to CF are corrected. Check the below link for more details
https://answers.sap.com/questions/13982886/error-while-deploying-my-cap-project-to-cf.html

- 2.Added_Approuter_and_authentication : In this branch I have added approuter and authentication to the application.

Initially after adding the authorization the path from approuter was not working. Then I have added in xs-security.json the redirect-uri "https://*.hana.ondemand.com/**" and it started working. So now if you deploy this code to CF and run app router it is working. But if you directly put the URI of service then it will not work because it has to pass authorization check. In app router it is done automatically by taking the JWOT token from XSUAA and calling the service with the same token.

- 3.Added_MSTeams_notification : In this brach we have added an action which sends notification to MS Teams channel.

It uses sap-cloud-sdk to access a BTP destination which points to the SAP Alert Notification service. And this service is responsible for sending notification to MS Teams. From the Teams channel a webhook has been created which is used in the SAP Alert Notification Service.

- 4.Added_frontend_reactapp : It is working now. In this branch added the react frontend app. All mta,approuter configurations corrected.
Faced multiple challenges here: 
    - Initially it was giving "503 Service Temporarily Unavailable" - Did troubleshooting using CF HTML5 CLI commands and got to know that I was giving wrong app name and which was deployed that name was different. Used CF HTML5-LIST commands. Mode details : https://github.com/SAP/cf-html5-apps-repo-cli-plugin. There is a troubleshooting guide also in the BTP help in the developn user interface section.
    - Then the above 503 issue is solved but it was giving blank page. Then when I checked the browser developer tool got to know that it is not finding the .js file. Then corrected the sequence of the routes in the xs-app.json of approuter and then it started working.
    - Also I was facing the '403 Forbidden' error for the POST calls from React. It was because of the CSRF error, also I found this from browser developer tools. Then added CORS node module and the server.js file in the SRV folder. Still the issue did not resolve, only the GET calls started working after I added CORS, but the POST call to triggerNotification did not work. This is because the App Router is automatically configured to require a CSRF token by default for all protected routes and all HTTP requests methods except HEAD and GET. Read more details for CSRF and CROSS from CAP documentation link
    https://cap.cloud.sap/docs/node.js/best-practices#cross-site-request-forgery-csrf-token
    Then after adding the CSRF token to the POST call of triggerNotification it started working. Wow!!!!! :)
