'use strict';

var  datab, connString;
var hrdb;
let modules = {
  getConn: getConn
};

module.exports = modules;

function getConn() {
  var cfenv = require('cfenv');
  var Pool = require('ibm_db').Pool;
  var appenv = cfenv.getAppEnv();
  var sthpdm;

  datab = appenv.getServiceCreds(process.env.DB2);
  if (datab) {
  } else {
    cfenv = require('./env.json');
    var node_env = cfenv.NODE_ENV;
    // datab = cfenv[node_env].DB2;
    datab = cfenv.DB2;
  }
  
  
    sthpdm = {
      connString: 'DRIVER={DB2}; PROTOCOL=TCPIP;DATABASE=' + datab.db +
        ';UID=' + datab.username +
        ';PWD=' + datab.password +
        ';HOSTNAME=' + datab.hostname + ';PORT=' + datab.port + ';DISABLEUNICODE=0',
        ibmdb: new Pool(),
        schema: process.env.SCHEMA || datab.schema
    };
    return  sthpdm;
}
