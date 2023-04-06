namespace sap.cic.product;
using { sap.cic.product.Product } from './Product';

/**
 * A product group groups together several products with the
 * same properties. It is used only for retail scenarios.
 */

@cic.version : '1.0.1'
@ODM.root    : true
entity ProductGroup {
        /**
         * The key of the product group. In retail it is the
         * merchandise category.
         */
    key id          : String(9) not null;
        /**
         * The dispalyId is not in use and can be ignored.
         */
        /*
        * S/4HANA field: T023-MATKL.
        */
        // displayId   : String(9);
        /**
         * Language-dependent short text of the product group.
         */
        /*
        * S/4HANA field: T023T-WGBEZ.
        */
        name        : String(20);
        /**
         * Language-dependent long text of the product group.
         */
        /*
        * S/4HANA field: T023T-WGBEZ60.
        */
        description : String(60);
}