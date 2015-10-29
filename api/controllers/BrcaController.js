/**
 * BrcaController
 *
 * @description :: Server-side logic for managing Brcas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    search: function (req, res) {
        console.log("BRCA Exchange Query to Database");
        var string = req.param('string'); 
        var chrom = req.param('chrom');
        var pos   = req.param('pos');
        var allele = req.param('allele');
        var reference = req.param('reference');
        var format = req.param('format') || 'ui';

        var condition = '';
        
        var displayFields = Brca.displayFields;
        console.log("Fields found: " + displayFields); 
        
        if (string) {
            var test = " LIKE '%" + string + "%'";
            var string_condition = displayFields.join(test + ' OR '); 
            condition = string_condition + test;    
        }
        var SQL = "SELECT * from brca";
        if (condition) { SQL = SQL + " WHERE " + condition }
        
        console.log("SQL: " + SQL);

        if (! (sails && sails.config && sails.config.connections && sails.config.connections.brcaDB) ) {
            console.log("missing Brca connection settings");
            return res.send("Brca Database not defined");
        }
        
        Brca.query(SQL, function(err, result) {
                if(err) {
                    return res.send( { response : "failure", message : "Error executing query: " + SQL}) ;
                }
    
                console.log(result.length + " Records found");
                console.log("Fields found: " + displayFields); 
               
                if (format.match('ui')) {
                    console.log("Fields: " + JSON.stringify(displayFields));
                    var Send = { data : result, fields : displayFields };
                    console.log("Send: " + JSON.stringify(Send));
                    return res.render('brca/Results', Send);
                }
                else {
                    return res.send(result);
                }
         });
    },
 
    source: function (req, res) {
        return res.send(
       {
            "aggregator": false,
            "id": "bcgsc",
            "name": "Michael Smith Genome Sciences Centre - BC Cancer Agency",
            "organization": "BCGSC"
        });
    }, 

    demo: function (req, res) {
        var type = req.param('type');
        
        console.log("Demo Function");
        
        var SQL = "SELECT * from brca ";
        if (condition) { SQL = SQL + " WHERE " + condition }
        
        console.log("SQL: " + SQL);

        if (! (sails && sails.config && sails.config.connections && sails.config.connections.brcaDB) ) {
            console.log("missing Brca connection settings");
            return res.send("Brca Database not defined");
        }
        
        var dbc = sails.config.connections.brcaB;
        
        var prefix = dbc.prefix;
        var host = dbc.host;
        var user = dbc.user;
        var pwd = dbc.password;
        var database = dbc.database;

        Brca.query(SQL, function(err, result) {
                if(err) {
                    return res.send( { response : "failure", message : "Error executing query: " + SQL}) ;
                }
    
                console.log(result.rows[0]);
                
                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST) 
                client.end();
               
                return res.send(result);
         });
    },

};

