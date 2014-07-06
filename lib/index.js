'use strict';

var async = require('async');
var SummaryTool = require('node-summary');

/**
 * Extract the most important sentences out of the text
 *
 * @param {string} path Path of the specified file
 * @param {string} document to hydrate
 * @param {function} done Callback, first parameter, is the error if any, then the processed data
 */
module.exports = function(path, document, changes, done) {
  async.waterfall([
    function startSummary(cb) {
      SummaryTool.summarize(document.title, document.metadata.text, cb);
    },
    function extractSummary(summary, cb) {
      changes.metadata.summary = summary;
      cb(null, document);
    }
  ], done);
};
