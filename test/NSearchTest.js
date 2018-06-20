var NSearch = require('../modules/SS2/NSearch.js')
var should = require('chai').should();

describe('NSearch', function() {

  describe('searchShouldYieldMultipleResults calls the callback in each for each result', function() {

    var search = new NSearch();
    search.searchShouldYieldMultipleResults([1,2,3,4,5]);

    const multipleSearch = search.create({
      type: 'search_type',
      columns: ['internalid', 'name'],
      filters: []
    });

    const results = [];

    multipleSearch.run().each((result) => {
      results.push(result);
      return true;
    });

    results[0].should.equal(1);
    results[1].should.equal(2);
    results[2].should.equal(3);
    results[3].should.equal(4);
    results[4].should.equal(5);

  })

})
