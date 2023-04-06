namespace sap.cic.product;

@cic.version : '1.1.1'
@ODM.codeList
entity BrandCodes {
        /**
         * Brand code.
         */
        /*
         * S/4HANA field: WRF_BRANDS-BRAND_ID.
         */
    key code : String(4) not null;
        /**
         * Short text for the brand.
         */
        /*
        * S/4HANA field: WRF_BRANDS_T-BRAND_DESCR.
         */
        name : localized String(30);
}

/**
 * A specific code that represents the brand.
 */
type BrandCode : Association to one BrandCodes;