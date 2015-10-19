/**
 * BeaconController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var pg = require('pg');

module.exports = {

    find_variant: function (req, res) {
        console.log("Beacon Query to Database");
        
        var chrom = req.param('chrom');
        var pos   = req.param('pos');
        var allele = req.param('allele');
        var reference = req.param('reference');

        if (! (chrom && pos && allele) ) {
            return res.send({ response: 'failure', message : "Missing Required Parameter (chrom, pos, or allele)"} );
        }

        var input = [chrom, pos, allele];
        
        var SQL = "SELECT find_variant('" + input.join("','") + "');"
        
        console.log("SQL: " + SQL);

        if (! (sails && sails.config && sails.config.connections && sails.config.connections.beaconDB) ) {
            console.log("missing beacon connection settings");
            return res.send("beacon Database not defined");
        }
        
        var dbc = sails.config.connections.beaconDB;
        
        var prefix = dbc.prefix;
        var host = dbc.host;
        var user = dbc.user;
        var pwd = dbc.password;
        var database = dbc.database;

        console.log("config: " + JSON.stringify(dbc));

//        var conString = "postgres://rguin:shin@r.shine@phdmgt3.hadoop.bcgsc.ca/rguin";
        
        var conString = prefix + '://' + user + ':' + pwd + '@' + host + '/' + database;

        var client = new pg.Client(conString);
        client.connect(function(err) {
            if (err) {
                return res.send( { response : "failure", message : "Error connecting to " + database + " database.  Please check with administrator."}) ;
            }
            
            client.query(SQL, function(err, result) {
                if(err) {
                    return res.send( { response : "failure", message : "Error executing query: " + SQL}) ;
                }
    
                console.log(result.rows[0]);
                
                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST) 
                client.end();
               
                response = {
                    beacon: {
                        'id': "BCGSC",
                        'name': "Genome Sciences Centre",
                        'organization': "BC Cancer Agency"
                    },
                    query: {
                        'allele': allele,
                        'chromosome': chrom,
                        'position': pos,
                        'reference': reference
                    },
                    response: result.rows[0].find_variant,
                    count: result.rows.length,
                };

                return res.send(response);
            });
         });
    },
 
    beacon: function (req, res) {
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

        var response;
        var allele = 'A';
        if (type == 'true') {
            response = 'TRUE';
        }
        else if (type == 'false') {
            response = 'FALSE';
            allele = 'C';
        }
        else {
            return res.send( { response: "failure", message : "Required Input Missing: allele"} );
        }
        
        return res.send(
                        {
                      'beacon': {
                          'id': "BCGSC",
                          'name': "Genome Sciences Centre",
                          'organization': "BC Cancer Agency"
                      },
                      'query': {
                          'allele': allele,
                          'chromosome': 1,
                          'position': 1000,
                          'reference': 'hg18'
                      },
                      'response': response,
         });
    }
};

