# Calculator

A simple calculator written in Asp.Net 7 with Angular.

## Assumptions
Throughout some assumptions have been made that have been used for various design decisions. 
These typically explain the presence or absence of features:
* Authentication/Authorization has not been implemented
  * It is assumed that there would already be an authentication mechanism for this to plug into
  * The provided school/user IDs will not be verified in terms of presence or whether the
    student is allowed in the school. All data will be stored as needed
  * No data is encrypted, though would expect to be encrypted in transit (TLS) and at rest (DB)
* Browser specification
  * It is assumed that only modern browsers are supported (the use of `E2021.string` 
    is an example of where some of the functionality will likely break in older browsers)
* Database Management
  * Due to difficulties in getting Dapper to complete a 'code first' approach, there is an 
    expected table structure that will need to be created. This is referenced below
  * Connection managed through a connection string for simplicity
  * Database latency will be low - the DB access has been made synchronous for simplicity with the
    assumption of a local DB. Adjusting some code to be more asynchronous may be appropriate. Ie. 
    Allow the browse to update to UI locally and send requests off to store in the DB. It is possible
    though unlikely that in those instances data desynchronisation can happen and needs to be accounted
    for
* Reasonably small numbers will be used
  * It is not anticipated that users will require equations that result in values that 
  exceed that stored within a `decimal` datatype

## Configuration
There are several values required for configuration and the application will not start without
some of them.

### CalculatorDataAccessOptions
All options here should go (if in a json) within an object with the name `CalculatorDataAccessOptions`  

|Key|Required|Description|Example|
|---|---|---|---|
|`ConnectionString`|Yes|The connection string to the database. This should connect directly to the database as required|`Server=(localdb)\MSSQLLocalDB;Initial Catalog=master;Integrated Security=True;MultipleActiveResultSets=True;Trust Server Certificate=true;Integrated Security=SSPI`|
|`Schema`|Yes|The name of the schema that contains the target table|`dbo`|
|`TableName`|Yes|The name of the table that will contain the information. This needs to match the table specification below|`CalculatorHistory`|
|`MaximumConnectionRetries`|No|The maximum number of retries on a failed connection - this is only really relevant if the database is not local to the server|`1`|

## Database
The database will need to have the table created, the main reason for this is that the 
entries for the schoolId and the UserId should be foreign keys to other tables. This can't
be predicted without first seeing the DB in question.

If this was to be in charge of creating the table in the DB we would need to have the app check
if the table is present, if not, create it. Though my preference would be
through a pre-generated script that could be copied and run on the DB as part
of the release process.

![CalculatorHistory](CalculatorHistory.png)  
  
``` sql
create schema calc
go

create table calc.CalculatorHistory
(
    Id            int identity               not null,
    SchoolId      uniqueidentifier           not null,
    UserId        int                        not null,
    Equation      varchar(100)               not null,
    EquationValue numeric                    not null,
    CreatedAt     datetime default getdate() not null,
    constraint CalculatorHistory_pk
        primary key (Id, SchoolId, UserId)
)
go
```

## Future Work
In order to make this production ready the following should be completed:
* Height limit and scrolling implemented on the table
* Unit tests
  * Updating the various specs to:
    * Prevent user input
    * Press a series of keys and ensure validity
    * Various types of equation parsing
  * Handle invalid input handling
* Edge case handling
  * Currently extremely large values can cause a storage error due to the DB model
  * Similar with extremely small results
* Break the form down into further components:
  * The input buttons themselves could be a component with a provided argument instead
    of so much repeated HTML 
* Back-end validation for the equation models. Currently, although it is within the Javascript
  someone could submit non-valid equations and these would not be validated as a real equation
  before submission

Further improvements to the application that would extend beyond the scope of
the provided scope:
* More complicated equation support
  * Possibly update equation model to utilise a binary tree structure
* Reactive entry field to represent equations
* Allow equations starting/ending with an operator to assume use of the previous result
* Add some first time tips/hints to allow the user to familiarize themselves
* Show historic results as well (this was omitted as the brief wanted a resubmission
  and showing the results outright kind of rendered that redundant)