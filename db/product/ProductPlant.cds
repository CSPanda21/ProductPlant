namespace sap.cic.product;

using { sap.cic.product.Product } from './Product';
using { sap.cic.plant.Plant } from '../plant/Plant';


/**
 * The ID for the plant responsible for planning, 
 * procuring and distributing products and services 
 * under one company code.
 */
@ODM.root    : true
@cic.version : '2.1.0'

entity ProductPlant {
        /**
         * The ID for the product.
         */
        /*
        * S/4HANA field: MARC-MATNR.
        */
    key product             : Association to one Product not null;
        /**
         * The ID for the plant.
         */
        /*
        * S/4HANA field: MARC-WERKS.
        */
    key plant               : Association to one Plant not null;
        /**
         * Specifies whether the product plant data is deleted.
         */
        /*
        * S/4HANA field: MARC-LVORM.
        */
        isMarkedForDeletion : Boolean;
        /**
         * Date from which the plant-specific product is blocked for replenishment.  
         * The plant-specific product is blocked for replenishment if the product status 
         * is configured to display an error message when the product is considered during the MRP run.    
         */ 
        /*
        * The blocked from-date is derived from product status (MARC-MMSTA) and the configuration details of the status (T141-DDISP). 
        */ 
        blockedForReplenishmentStartingFrom    : Date;     
        /**
         * The plant-specific sales attributes of the product.
         */
        // salesPlant          : Composition of one SalesPlant;
        /**
         * The plant-specific listing attributes of retail products.
         */
        listing             : Composition of many ProductPlantListing;

}


aspect ProductPlantListing {

    /**
     * The date and time in the UTC time zone from when 
     * the product is listed to the plant.
     */
    /*
    * S/4HANA field: WLK1-DATAB.
    * note: WLK1 and WRS1 use Dates (without Time) for start and end of validity
    * BUT the interface implementation in CL_DMF_LOCPROD_MASTER already contains the Date->Timestamp conversion !
    * The key fields FILIA and ARTNR from table WLK1 correspond to the key fields WERKS and MATNR from table MARC.
    * The fields ARTNR and MATNR can be compared directly, but FILIA corresponds to the supplier number in the T001W (LIFNR),
    * whereas WERKS from MARC corresponds to WERKS in T001W.
     */
    key validFrom : DateTime;
    /**
     * The date and time in the UTC time zone until when 
     * the product is listed to the plant.
     */
    /*
    * S/4HANA field: WLK1-DATBI.
    */
    validTo       : DateTime;
    /**
     * Specifies whether the product is listed to the plant.
     */
    /*
    * Status of listing: if WLK1-NEGAT is initial, this indicator
    * has to be set to true, otherwise false which means it is delisted for the period
    */
    isListed      : Boolean;
}

