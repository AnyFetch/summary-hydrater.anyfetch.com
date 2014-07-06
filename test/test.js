'use strict';

require('should');
var fs = require('fs');
var anyfetchFileHydrater = require('anyfetch-file-hydrater');
var summary = require('../lib/');

describe('Test Summary results', function() {
  it('should summarize an article in english', function(done) {
    var document = {
      title: "Walmart Node.js Memory Leak",
      metadata: {
        author: "TJ Fontaine",
        source: "http://www.joyent.com/blog/walmart-node-js-memory-leak",
        text: fs.readFileSync(__dirname + "/samples/article-en.txt", {encoding: 'utf8'})
      }
    };

    var changes = anyfetchFileHydrater.defaultChanges();

    summary(null, document, changes, function() {
      changes.metadata.summary.should.match(/memory leak/i);
      changes.metadata.summary.should.match(/malloc/i);
      changes.metadata.summary.should.match(/flamegraph/i);
      changes.metadata.summary.should.match(/v8 heap/i);
      changes.metadata.summary.should.match(/handlescope/i);

      changes.metadata.summary.should.not.match(/node apis/i);
      changes.metadata.summary.should.not.match(/master branch/i);
      changes.metadata.summary.should.not.match(/josh clulow/i);
      done();
    });
  });
});
