namespace sap.cic.plant;

using { sap.cic.organizationaldata.CompanyCode } from './CompanyCode';


/*
 * CIC related model for plant with retail specific aspects (aka site)
 * In S4H, plant entities are stored in table (T001W) and the DRF outbound implementation class is CL_DMF_LOC_OUT.
 */
/**
 * A plant can be a place for storing products, a distribution
 * center, or a retail store.
 */

@cic.version : '5.0.0'
@ODM.root    : true
@title       : 'Plants'
@description : 'Ingest plants from a source system.'
entity Plant {
      /*
       * S4H local ID for plant
       * S4H DB: T001W-WERKS
       */
      /**
       * The technical ID for the plant.
       */
  key id                         : String(4) not null;
      /*
       * Human-readable identifier of the plant
       * DB: T001W-WERKS
       */
      /**
       * The ID for the plant.
       */
      displayId                  : String(4);
      /*
       * S4H local name of the plant.
       * S4H DB: T001W-NAME1
       */
      /**
       * The name of the plant.
       */

      name                       : String(30);
      /**
       * The company code of the plant.
       */
      companyCode                : Association to one CompanyCode;
    //   /*
    //    * Category of the plant, either Plant (null), Distribution Center (A) or
    //    * Store (B).
    //    * S4H DB: T001W-VLFKZ
    //    * category                   : type of PlantODM : category;
    //    */
    //   /**
    //    * The category of the plant
    //    *
    //    * 'plant' - for a production plant
    //    *
    //    * 'distributionCenter' - Distribution Center
    //    *
    //    * 'store' - Retail Store
    //    *
    //    * 'customerStore' - not in use
    //    */
    //   category                   : PlantCategory;
    //   /**
    //    * The address of the plant.
    //    */
    //   /*
    //   * Address of the plant composition via T001W-ADRNR
    //   */
    //   address                    : Composition of one OrganizationAddress;
    //   /*
    //    * Supplier ID of the plant (not yet in ODM) S4H DB:
    //    * S4H DB: T001W-LIFNR
    //    */
    //   /**
    //    * The ID of the supplier for the products stored at or sold by
    //    * the plant.
    //    */
    //   supplier                   : Association to one Supplier;
    //   /*
    //    * Customer ID of the plant (not yet in ODM) S4H DB:
    //    * S4H DB: T001W-KUNNR
    //    */
    //   /**
    //    * The ID of the customer that purchases the products stored at
    //    * or sold by the plant.
    //    */
    //   customer                   : Association to one Customer;

}