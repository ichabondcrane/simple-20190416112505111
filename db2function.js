'use strict';

var db2 = require("./db2config").getConn();
let modules = {
    runquery: runquery
  };
  
  module.exports = modules;
  
function runquery(sql, fields, callback)  {
    db2.ibmdb.open(db2.connString, function (err, conn) {
        if (err) {
          return callback(err);
        }
        conn.query(sql, function (err, data, moreResultSets) {
          if (err) {
            conn.close();
            return callback(err);
          }
          var list = [];
          var tgtitem, srcitem;
          data.forEach(function (item) {
            var obj = {};
            fields.forEach(function (m) {
              srcitem = _cu(m);
              tgtitem = _cu(m);
              obj[tgtitem] = item[srcitem];
            });
            list.push(obj);
          });
          
          conn.close();
         callback(null, list);
        });
      });
  }
  function _cu(i) {
    return i.toUpperCase();
  }