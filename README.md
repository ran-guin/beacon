# Beacon

## Quick Setup from scratch

* #### clone code 

  ```
  > git clone \<path\> \<target_directory\>
  ```

* #### setup configuration (specify host / database / user for DB connection) 
  ```
> vi config/local.js 
  ```
  example of code to include (obviously change all values to those applicable to your environment):
  (using 3 databases, one of which (gvdb) accesses DB via Pivotal):
  ```
  module.exports = {
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
  }
  ```

* #### install npm modules
  ```
> npm install
  ```

* #### load js or css files (may add lib link or replace individual asset files)
  ```
  > cd .. # go to directory where you want to place js/css/image library (normally one directory below main node project directory)

  > git clone git@github.com:ran-guin/3rdPartyLib.git lib

  > cd -
  > find assets/ -xtype l  ## check for broken links ... this should return nothing
  ```

* #### run sails
  ```
> sails lift   
>  ... ( if asked which mode to run in, use 'alter' mode while debugging, or 'safe' mode when finished )
  ```

* #### run using nodemon / forever / supervisor as desired ... 
  ```
> nodemon app.js
  ```

* #### reverse alias url if desired 

  eg: add to /etc/httpd/conf/httpd.conf (if running with apache)

  (*ensure port (1111 in this example, but it can be anything) matches port specification in config.local.js file above*) :

  ```
ProxyPass /beacon http://limsdemo.bcgsc.ca:1111
ProxyPassReverse /beacon http://limsdemo.bcgsc.ca:1111
  ```

### Requirements

This runs on a machine with node.js installed, and uses the sails framework.
It accesses databasei (or multiple databases) which may be mysql, postgres, mongo or whatever other db is desired.

* nodejs
* sails
* DB (any standard type)

(I have a number of npm modules installed globally.... some of these may be necessary if not already included)
* bower
* express
* express-generator
* forever
* nodemon
* npm
* grunt
* sails
* supervisor

## Customizing Options:

* Customize database connection specifications (in config/local.js)
* Adapt views as desired:
** views are in views/ directory and are written using jade markup
** controllers are in api/controllers/ directory and are run on the server side
* Adapt angular code for BRCA controller (in assets/js/private/brca/BrcaController.js) 
