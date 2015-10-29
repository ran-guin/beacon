/**
* Brca.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    Gene_symbol : { 
        type : 'string'
    },

    Genomic_Coordinate : { 
        type : 'string'
    },

    Reference_sequence : { 
        type : 'string'
    },
    HGVS_cDNA : { 
        type : 'string'
    },
    BIC_Nomenclature : { 
        type : 'string'
    },
    Abrev_AA_change : { 
        type : 'string'
    },
    URL : { 
        type : 'string'
    },
    Condition_ID_type : { 
        type : 'string'
    },
    Condition_ID_value : { 
        type : 'string'
    },
    Condition_category : { 
        type : 'string'
    },
    Clinical_significance : { 
        type : 'string'
    },
    Date_last_evaluated : { 
        type : 'string'
    },
    Assertion_method : { 
        type : 'string'
    },
    Assertion_method_citation : { 
        type : 'string'
    },
    Clinical_significance_citations : { 
        type : 'string'
    },
    Comment_on_clinical_significance : { 
        type : 'string'
    },
    Collection_method : { 
        type : 'string'
    },
    Allele_origin : { 
        type : 'string'
    },
    ClinVarAccession : { 
        type : 'string'
    },
    HGVS_protein : { 
        type : 'string'
    },
  },
  
  'displayFields' : ['Gene_symbol', 'Genomic_Coordinate', 'HGVS_cDNA', 'HGVS_protein',  'BIC_Nomenclature', 'Clinical_significance'],

};

