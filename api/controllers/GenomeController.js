/**
 * GenomeController
 *
 * @description :: Server-side logic for managing genomes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    find_variant: function (req, res) {
        var chromosome = req.param('chrom');
        var allele = req.param('allele');
        var position = req.param('pos');
        var reference = req.param('ref');
        var conditions = req.param('conditions');

        var table = 'snps_dim';

        table = 'genome, reference';  // TEMPORARY
        conditions = ['reference_id = reference.id'];

        var condition = conditions.join(' AND ');
        if (condition) { condition = " WHERE " + condition }

        var SQL;
        if (chromosome && position && allele) {
            SQL = "SELECT find_variant(" + chromosome + ',' + position + ',' + allele + ') FROM ' + table + condition;

            console.log("QUERY: " + SQL);
        Genome.query(SQL, function (err, result) {
            if (err) { return res.negotiate(err) }
            
            var found = false;
            if (result && result.length) {
                found = true;
            }
   
            console.log("Result: " + JSON.stringify(result));

            response = {
                beacon: {
                    'id': "BCGSC",
                    'name': "Genome Sciences Centre",
                    'organization': "BC Cancer Agency"
                },
                query: {
                    'allele': allele,
                    'chromosome': chromosome,
                    'position': position,
                    'reference': reference
                },
                response: found,
                count: result.length,
            };

            return res.send(response);
        });
        }
        else {
            return res.send("INVALID REQUEST");
        }
    
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
 
    query: function (req, res) {

        /* input parameters: chrom, allele, pos, ref */
        var chromosome = req.param('chrom');
        var allele = req.param('allele');
        var position = req.param('pos');
        var reference = req.param('ref');

        var query = "SELECT chromosome, reference.name, sequence, " + position + " from genome,reference WHERE reference_id=reference.id";
        query += " AND chromosome = " + chromosome;
        query += " AND reference.name = '" + reference + "'";
        query += " AND MID(sequence, 1 + " + position + " - position,1) = '" + allele + "'";

        if (!chromosome || !allele || !position) {
            var message = "Incorrect Query - require chromosome, allele, position (got"
                + chromosome + ', ' 
                + allele + ', '
                + position + ')';
            return res.send( { response: null, message: message } );
        }

        console.log('Genome Query: ' + query);
        
        console.log("Try once...");
        var SQL = query;
        var test = Genome.query({SQL : SQL, chromosome : chromosome, allele : allele, position : position, reference : reference});
       
        console.log("GOT: " + test);

        Genome.query(query, function (err, result) {
            if (err) { return res.negotiate(err) }
            
            var found = false;
            if (result && result.length) {
                found = true;
            }
   
            console.log("Result: " + JSON.stringify(result));

            response = {
                beacon: {
                    'id': "BCGSC",
                    'name': "Genome Sciences Centre",
                    'organization': "BC Cancer Agency"
                },
                query: {
                    'allele': allele,
                    'chromosome': chromosome,
                    'position': position,
                    'reference': reference
                },
                response: found,
                count: result.length,
            };

            return res.send(response);
        });
    },

};

