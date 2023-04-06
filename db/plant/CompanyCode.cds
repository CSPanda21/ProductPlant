namespace sap.cic.organizationaldata;


/*
 * Company code.
 *
 * Smallest organizational unit in financial accounting for which individual
 * financial statements for external reporting are drawn, such as balance
 * sheets, profit and loss accounts.
 *
 * The S/4HANA table is T001, the maintenance view is V_T001.
 *
 * The IMG Path in S/4HANA is SAP Customizing Implementation Guide ->
 * Enterprise Structure -> Definition -> Financial Accounting -> Edit, Copy,
 * Delete, Check Company Code.
 */


// using {sap.cic.organizationaldata.CompanyCodeId} from './types.cds';


/*
 * Company code.
 *
 * Smallest organizational unit in financial accounting for which individual
 * financial statements for external reporting are drawn, such as balance
 * sheets, profit and loss accounts.
 */

/**
 * A company code represents the smallest organizational unit
 * in Financial Accounting for which individual financial
 * statements for external reporting are made.
 */
@cic.version: '1.1.2'
@ODM.root   : true
@title      : 'Company Codes'
@description: 'Ingest company codes from a source system.'
entity CompanyCode {
      /**
       * The technical ID for the company code.
       */
      /*
       * S/4HANA field: T001-BUKRS.
       */

  key id        : String(4) not null;
      /**
       * The company code.
       */
      /*
       * S/4HANA-field: T001-BUKRS.
       */

      // displayId : CompanyCodeId;
      /**
       * The name of the company code.
       */
      /*
       * Short text of the company code.  Note that this is not
       * language-dependent in S/4HANA and in this model.
       *
       * S/4HANA field: T001-BUTXT.
       */
      name      : String(20);
}