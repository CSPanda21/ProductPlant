namespace sap.cic.product;

using { managed } from '@sap/cds/common';
using {sap.cic.product.BrandCode} from './BrandCodes';
using {sap.cic.product.ProductGroup} from './ProductGroup';

@cic.version : '3.0.0'
@ODM.root    : true
@title       : 'Products'
@description : 'Ingest products from a source system.'
entity Product : managed {

     key id                       : String(40) not null;
        /**
         * An additional ID of the product for display purposes only.
         * This field is currently not in use.
         */
        /*
        * To be used for display purposes only; referencing must use
        * the id attribute.
        *
        * S/4HANA field: MARA-MATNR.
        */
        displayId                : String(40);
        /**
         * The name of the product. The name can be different in
         * different languages.
         */
        /*
        * S/4HANA field: MAKT-MAKTX.
        */
        name                     : localized String(255);
        /**
         * The brand of the product. It is an optional information for
         * retail products.
         */
        /*
        * S/4HANA field: MARA-BRAND_ID.
        */
        brand                    : BrandCode;
        /**
         * There can be a product group for, for example, raw
         * materials, operating supplies, or trading goods. For retail
         * it is the merchandise category of the product and only
         * relevant for retail scenarios. Such a product group must be
         * assigned to a merchandise category node in the merchandise
         * category hierarchy node entity.
         */
        /*
        * S/4HANA field: MARA-MATKL.
        */
        productGroup             : Association to one ProductGroup;

}