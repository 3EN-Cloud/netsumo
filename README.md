# NetSUMO

NetSUite MOcker

__________________

[![Build Status](https://travis-ci.org/ProductEarthSolutions/netsumo.svg?branch=master)](https://travis-ci.org/ProductEarthSolutions/netsumo)

[![NPM](https://nodei.co/npm/netsumo.png)](https://nodei.co/npm/netsumo/)

__________________

## Installation ##

Pre Reqs

* Node
* NPM

Install using the command:


`npm install netsumo`

________________

## Getting Started ##

#### Project Setup ####
Add netsumo to your project using the command `npm install netsumo`

Add your testing framework of choice, we're going to use chai and mocha for this example, install them using these commands:

`npm install -g mocha`

`npm install chai`

Add a directory to the root of your project named 'test' and add a test file to it, ours is called 'suiteletTest.js'

Add a directory to the root of your project named fileCabinet, we will use this to store the suitelet files we want to test.

#### Adding a suitelet to test ####

Add a suitelet to the fileCabinet directory called suitelet.js, here's some sample suitelet code you can use:

```javascript
function makeNetSuiteMagic() {

   nlapiLogExecution('DEBUG','makeNetSuiteMagic','Loading the record')
   var record = nlapiLoadRecord('magicrecord',1234)

   record.selectNewLineItem('item')
   record.setCurrentLineItemValue('item','item','My Magic Item')
   record.setCurrentLineItemValue('item','quantity',20)
   record.commitLineItem('item')

   nlapiLogExecution('DEBUG','makeNetSuiteMagic','Submitting the record')
   nlapiSubmitRecord(record)

}
```

#### Writing a suitelet unit test ####

Jumping back into the suiteletTest.js file we created earlier, add the following require statements to the top of the file:

```javascript
var should = require('chai').should();
var netsumo = require('netsumo');
var nsLoader = netsumo.nsLoader;
var nsContext = netsumo.nsContext;
var nlobjRecord = netsumo.nlobjRecord;
```

Next, add the following boilerplate code for defining the test:

```javascript
describe('suitelet.js', function() {
  describe('#makeNetSuiteMagic', function() {
     it('Adds a line item called My Magic Item and sets the quantity to 20', function() {

     })
  })
})
```

Inside the 'it' function call add some code to set up the mocked `nlobjRecord` with a type of 'magicrecord' an ID of 1234 as required in the suitelet.

```javascript
var mockedRecord = nlobjRecord('magicrecord', 1234);
```

Next, create a default `nsContext` and submit our `mockedRecord` object using `nlapiSubmitRecord`.

```javascript
var context = nsContext.getDefaultContext();
context.nlapiSubmitRecord(mockedRecord);
```

You will notice that the context uses method names that are the same as the NetSuite api, picture this context as a simulated instance of NetSuite, it will be the same context that is used by the suitescript.

Next, we want to load in our suitelet to the default context and execute the `makeNetSuiteMagic` function that we want to test:

```javascript
var suitelet = nsLoader('fileCabinet/suitelet.js', context);
suitelet.makeNetSuiteMagic();
```

At this point we have loaded our mock record and executed our suite script, the next step is to assert that our suitelet is working as expected.

In our simple example we want to retrieve the record with id 1234, and determine if a line item has been added.

```javascript
var magicRecord = context.nlapiLoadRecord('magicrecord',1234)
magicRecord.getLineItemValue('item','item',1).should.equal('My Magic Item')
magicRecord.getLineItemValue('item','quantity',1).should.equal(20)
```

Putting it all together you should have a test that looks like this:

```javascript
var should = require('chai').should();
var netsumo = require('netsumo');
var nsLoader = netsumo.nsLoader;
var nsContext = netsumo.nsContext;
var nlobjRecord = netsumo.nlobjRecord;


describe('suitelet.js', function() {

  describe('#makeNetSuiteMagic', function() {

     it('Adds a line item called My Magic Item and sets the quantity to 20', function() {

       var mockedRecord = nlobjRecord('magicrecord', 1234);

       var context = nsContext.getDefaultContext();
       context.nlapiSubmitRecord(mockedRecord);

       var suitelet = nsLoader('fileCabinet/suitelet.js', context);
       suitelet.makeNetSuiteMagic();

       var magicRecord = context.nlapiLoadRecord('magicrecord',1234)
       magicRecord.getLineItemValue('item','item',1).should.equal('My Magic Item')
       magicRecord.getLineItemValue('item','quantity',1).should.equal(20)

     })

  })

})
```

#### Running your test ####

Jump to the root of your project in a terminal window and run the command: `mocha`

This will run your test and output the result:



      suitelet.js
        #makeNetSuiteMagic
    TYPE: DEBUG | TITLE: makeNetSuiteMagic | DETAILS: Loading the record
    TYPE: DEBUG | TITLE: makeNetSuiteMagic | DETAILS: Submitting the record
          ✓ Adds a line item called My Magic Item and sets the quantity to 20


      1 passing (40ms)

You will notice that the output from the `nlapiLogExecution` function calls in our suite script are also displayed.

## Options ##

A number of options can be passed to the `nsContext.getDefaultContext()` function to help configure the context. These are all optional.

```javascript
var opts = {
    'suppressNlapiLogOutput': true, //will suppress log output for all calls to nlapiLogExecution from your suitelet. Makes log output less verbose.
    'emailPath':'/some/path' //The directory path to where nlapiSendEmail emails will be saved.
}

var context = nsContext.getDefaultContext(opts);
```
