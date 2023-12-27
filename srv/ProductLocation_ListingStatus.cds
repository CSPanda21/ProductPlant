
// using { sap.cic.product.Product as Prd} from '../db/product/Product.cds';
using { sap.cic.product.ProductPlant as PP} from '../db/product/ProductPlant.cds';

/* This service gets the latest listing and returns its staus */
service ProductLocation_ListingStatus @(path:'api') @(requires: 'authenticated-user') {

// @readonly entity Products as projection on Prd;    

// @readonly entity ProductPlant_Listing as projection on PP {*, listing.isListed};
// @readonly entity ProductPlant_Listing as select * ,listing.isListed from PP where listing.isListed = true;
   @readonly entity ProductPlant_Listing as select * ,listing.isListed from PP where listing.validTo = '9999-12-31T00:00:00Z';

// Trigger Alert Notification Service
   action triggerNotification() returns String;    

}