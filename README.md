# Getting Started

Welcome to this new project. This is a CAP + React app deployed to BTP Cloud Foundry runtime. Enjoy!!

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
- git add . , git commit -m "<message>" , git pull/push origin main

To create a new branch and push your changes to remore
- git checkout -b <new_branch_name>
- git add .
- git commit -m "<message>"
- git push --set-upstrem origin  <new_branch_name>

### Running the application locally:
- Open a new terminal and install dependencies by running npm install
- Copy the Environment details from CF "my_proj-srv" application to "default-env.json" file in root directory.
- In the frontend folder create a ".env" file and put "DANGEROUSLY_DISABLE_HOST_CHECK=true". This is for the proxy details to 
  work which is given in the package.json. Required for running app locally.
- Then, run `npm run start:server`. This will run with the development profile. So the mocked authentication are used.
- Then, run `npm run start:client`.

### Branches in this repository
- main : In this branch, there exists both domain modeling and a service. It is a complex domain modeling involving entities and relationships, while the service is relatively straightforward.

- 1.Basic_service : In this branch, the deployment errors to CF are corrected. Check the below link for more details
https://answers.sap.com/questions/13982886/error-while-deploying-my-cap-project-to-cf.html

- 2.Added_Approuter_and_authentication : In this branch I have added approuter and authentication to the application.

**Challenges:** Initially after adding the authorization the path from approuter was not working. Then I have added in xs-security.json the redirect-uri "https://*.hana.ondemand.com/**" and it started working. So now if you deploy this code to CF and run app router it is working. But if you directly put the URI of service then it will not work because it has to pass authorization check. In app router it is done automatically by taking the JWOT token from XSUAA and calling the service with the same token.

- 3.Added_MSTeams_notification : In this brach I have added an action which sends notification to MS Teams channel.

It utilizes the SAP Cloud SDK to connect to a BTP destination, directing to the SAP Alert Notification service. This service is tasked with dispatching notifications to Microsoft Teams. A webhook, established within the Teams channel, and that is used in SAP Alert Notification Service.

- 4.Added_frontend_reactapp : It is working now. In this branch added the react frontend app. All mta and approuter configurations corrected.
**Faced multiple challenges:** 
    - Initially it was giving "503 Service Temporarily Unavailable" - Did troubleshooting using CF HTML5 CLI commands and discovered that I had provided an incorrect app name, and the deployed app had a different name. Used CF HTML5-LIST commands. More details : https://github.com/SAP/cf-html5-apps-repo-cli-plugin. There is a troubleshooting guide also in the BTP help in the develop user interface section.
    - The previously encountered 503 issue has been resolved, but a blank page persisted. Upon inspecting the browser developer tools, I identified that the .js file was not being found. After adjusting the sequence of routes in the xs-app.json file of the app router, the issue was resolved, and the application began functioning correctly.
    - Also I was facing the '403 Forbidden' error for the POST calls from React. It was because of the CSRF error, also I found this from browser developer tools. Then added CORS node module and the server.js file in the SRV folder. Still the issue did not resolve, only the GET calls started working after I added CORS, but the POST call to triggerNotification did not work. This is because the App Router is automatically configured to require a CSRF token by default for all protected routes and all HTTP requests methods except HEAD and GET. Read more details for CSRF and CROSS from CAP documentation link
    https://cap.cloud.sap/docs/node.js/best-practices#cross-site-request-forgery-csrf-token
    Then after adding the CSRF token to the POST call of triggerNotification it started working. 
    Wow!!!!!
