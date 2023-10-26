# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
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
- cf7 deploy mta_archives/PRP1_1.0.0.mtar
- cf7 deploy mta_archives/PRP1_1.0.0.mtar --delete-services
- npm cache clean --force

To pull/push changes from main brach
- git pull/push origin main

### Note
- Initially after adding the authorization the path from approuter was not working. Then I have added in xs-security.json the redirect-uri "https://*.hana.ondemand.com/**" and it started working. So now if you deploy this code to CF and run app router it is working. But if you directly put the URI of service then it will not work because it has to pass authorization check. In app router it is done automatically by taking the JWOT token from XSUAA and calling the service with the same token. 
