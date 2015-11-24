# Beacon

## Quick Setup from scratch

* #### clone code 
git clone <path> <target_directory>

* #### setup configuration (specify host / database / user for DB connection) 
add config/local.js 

example of code to include:
 (using 3 databases, one of which (gvdb) accesses DB via Pivotal):

```
   models: {
       'connection' : 'brcaDB'
   },

   connections: {
       'testDB': {
            adapter: 'sails-mysql',
            host: 'limsdemo.bcgsc.ca',
            user: 'tester',
            password: 'testpass',
            database: 'beacon'
        },
       'beaconDB': {
            adapter: 'sails-postgresql',
            host: 'phdmgt3.hadoop.bcgsc.ca',
            user: 'rguin',
            password: 'mypassword',
            database: 'gvdb',
            prefix: 'postgres',     // used to generate connection string (eg 'postgres' -> 'postgres://....');
        },
       'brcaDB': {
            adapter: 'sails-mysql',
            host: 'limsdemo.bcgsc.ca',
            user: 'tester',
            password: 'testpass',
            database: 'brca',
        },
    }
```



### Requirements

This runs on a machine with node.js installed, and uses the sails framework.
It accesses databasei (or multiple databases) which may be mysql, postgres, mongo or whatever other db is desired.

* nodejs
* sails
* DB (any standard type)

a [Sails](http://sailsjs.org) application

Building from scratch:

sails new GSC_beacon

/* add beacon controller */
/* add demose */

/* adjust views */

/* edit connections   to specify host, database, user, password */
