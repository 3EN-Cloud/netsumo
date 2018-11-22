# NetSUMO

## NetSuite Mocker - Unit test your SuiteScript 2.0 scripts.

### For SuiteScript 1.0 testing -  [click here](./SuiteScript_1.md)

### For SuiteScript 2.0 testing -  [continue reading](#getting-started).
__________________

[![Build Status](https://travis-ci.org/3EN-Cloud/netsumo.svg?branch=master)](https://travis-ci.org/3EN-Cloud/netsumo)

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

Create a new test file somewhere in your project, in our examples we are going to use jest as our testing framework, but NetSumo is test framework agnostic.

Create your awesome SuiteScript 2.0 file, in this example we are creating a user event script that sets a value on a record.

```javascript
/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
 define(['N/record'], function(record) {

  function beforeSubmit(context) {
      if(context.type == context.UserEventType.CREATE) {
        var fulfilmentRecord = context.newRecord;

        fulfilmentRecord.setValue({
          fieldId:"custbody_a_custom_field",
          value:"Hello World!"
        })
      }
  }

  return {
      beforeSubmit: beforeSubmit
  };

});

```

Create your new test file and add the following require statements:

```javascript
const {loadSuiteScriptModule, NRecord} = require('netsumo');
```

The `loadSuiteScriptModule` is super important, it allows us to load SuiteScript 2.0 modules (which use AMD module syntax) into Node.js (Which uses Common.js module syntax).

The `NRecord` is our mocked N/record representation. We also have support for N/error, N/file, N/https, N/search, N/sso, we will build up these modules as they are needed. You can also use mocked objects to represent these modules if you wish.

Next step is to load our module using `loadSuiteScriptModule`

```javascript
const {loadSuiteScriptModule, NRecord} = require('netsumo');
const FulfilmentUserEventModule = loadSuiteScriptModule('src/userevent/Fulfilment_UE.js') //this is the path to the file in your local copy
```

Next step is to write our test!

```javascript
const sinon = require('sinon')
const {loadSuiteScriptModule, NRecord} = require('netsumo');

const FulfilmentUserEventModule = loadSuiteScriptModule('src/userevent/Fulfilment_UE.js')

test("It sets my custom field value to Hello World!", ()=>{
  //create a new instance of N/record
  var record = new NRecord();

  //create a new item fulfilment record
  var itemFulfilmentRecord = record.create({
    type:record.Type.ITEM_FULFILLMENT,
    id:1234,
    defaultValues:{
      shipmethod:{
        value:1,
        text:"DPD"
      }
      ... //populate default values here
    },
    sublists:{
      'package':[{
        packageweight:10,
        sys_id:1232342342434,
        sys_parentid:89842893742837,
        pkgWeightUnit:"lbs",
        packagedescr:"some description",
        shippingaddress: record.create({ // create a sublist subrecord (or use an existing Record reference)
          type: record.Type.Address,
          id: 1235,
          defaultValues:{
            addr1: 'Main street'
          }
        })
      }]
      ... //populate sublists here
    }
  })

  //Instantiate our module, passing in our dependencies
  const fulfilmentUserEvent = FulfilmentUserEventModule({
    "N/record":record
  })

  //Execute the beforeSubmit method, passing in our context
  fulfilmentUserEvent.beforeSubmit({
    type:"create",
    UserEventType:{
      CREATE:"create",
      EDIT:"edit"
    },
    newRecord:itemFulfilmentRecord
  })

  //Perform assertions
  expect(itemFulfilmentRecord.getValue("custbody_a_custom_field")).toBe("Hello World!")
})
```

Next step is to run the test using our test runner and enjoy!
