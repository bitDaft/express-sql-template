# Nodejs/Express Template :robot:

[![CodeFactor](https://www.codefactor.io/repository/github/bitdaft/nodejs-express-boilerplate/badge)](https://www.codefactor.io/repository/github/bitdaft/nodejs-express-boilerplate)

### :rocket: An [Opinionated](#my-opinions) template to kickstart your Nodejs/Express project.

<img src="https://64.media.tumblr.com/126fc1df4e999677f554c471139b3754/tumblr_oq9dm3D8J11relg8bo1_500.gif" height="150" />

# Table of Content

- [Features](#features)
- [Quick Start](#quick-start)
- [Quick Overview](#quick-overview)
  - [Modules](#modules)
  - [Database](#database)
  - [Config](#config)
- [File Structure](#file-structure)
- [My Opinions](#my-opinions)
- [The Boilerplate in depth](#the-boilerplate-in-depth)
  - [File Loader](#file-loader)
  - [Config](#config-1)
  - [Uniform success and error response](#uniform-success-and-error-response)
  - [Global throw and automatic success response](#global-throw-and-automatic-success-response)
  - [Centralized response handling](#centralized-response-handling)
  - [Logger](#logger)
  - [Modules](#modules-1)
  - [Message queues](#message-queues)
  - [Database & Models](#database-and-models)
  - [Migrations & Seeds](#migrations-and-seeds)
  - [Multi-Tenancy](#multi-tenancy)
  - [Docker](#docker)
  - [Utils & lib](#utils-and-lib)
  - []()
- [TODO](#todo)

# Features

- Clean structure allowing for writing testable code
- Hierarchical config with config file, args, and env variables, all accessible through single config object
- Easy multi-database connection management
- Message queues, and workers on separate processes
- Automatic static file loading
- Module based business login code encapsulation
- Logging on separate process with tagged structured logs
- Easy centralized failure and success handling mechanism

<img src="https://media.tenor.com/It6WN9CY4HMAAAAM/wow-oh-my-god.gif"/>

# Quick start

To create a new project based on this template using degit:

```shell
npx degit bitDaft/nodejs-express-boilerplate new-app-backend
```

> _Note that you will need to have Node.js installed_

Get started
Install the dependencies...

```shell
cd new-app-backend
npm install
```

Run the server in development mode

```shell
npm run dev-a
```

# Quick Overview

### Modules

The most important section is the `modules` folder.  
Inside the folder contain a single `_route.js` file, which routes to each of the different modules.  
An existing template module (`_template`) is already created, so you may simply copy paste it to create a new module.

Inside each module you will find files for each action, such as:

- `*._controller.js` - controller handling
- `*._route.js` - route handling
- `*.db.js` - db queries and calls
- `*.validate.js` - controller parameter validation methods

You may also create other files for your own purposes.

> ###### A working `auth` module has been defined as an example to learn the usage
>
> ###### [Postman collection link](https://documenter.getpostman.com/view/5939662/2s8Yt1r96h)

### Database

The database folder contains all the files related to databases, such as its connections and models.  
New Models can be added to the `models` folder (Don't forget to re-export it in the `index.js` barrel file).  
You may also optionally add a schema for the model into the `schema` folder. This is purely for documentation purpose, although you may use to validate the models, once converted to JSON.  
The migrations and seeds will be available in their respective folder, after being generated by the `Knex` cli.

### Config

The `config` folder contains the all the configurations and provides an export for use in other areas of the project.  
Both static JSON config file and env config file are stored here, in their respective files.

**NB: make sure to run `npm run FIX_ERR_REQUIRE_ESM_BULLMQ` first after `npm install` to fix bullmq issue with module imports**

### **:tada: :confetti_ball: Thats all there is to know, go ahead and use this template now**

<img src="https://media.tenor.com/XReQgcgWE8YAAAAM/omg-yay.gif" />

# File structure

```
.
├─bin                 // contains the executable
├─config              // contains config data
│ └─environment       // env file to store env variables
├─database            // contains files relevant to db
│ ├─conn              // db connection scripts
│ ├─migrations        // migrations files
│ ├─models            // db objection models
│ ├─schema            // schema description, not used in code
│ └─seeds             // seed files
├─jobs                // contains file for msq queues
│ ├─queue             // define msg queue
│ └─worker            // worker for queue
│   └─sandbox         // sandboxed worker
├─lib                 // contains lib files, usually wont need to import or interact with them except for 'logger' and 'Failure' objects
├─loadFile            // auto loads files in folder
├─middlewares         // custom middlewares for express
├─modules             // contains the actual src
│ ├─template          // a template of a module to copy paste when creating new modules
│ └─auth              // auth module pre made for most apps
└─utils               // utils functions
```

Although this is an opinionated template, the file structure has been made with the consideration that all workflows and tools used by users may be different and this template should **_ideally_** accomodate that and be able to make those changes while keeping the rest intact.

As such,

- if you use a different DB or ORM, `database` folder goes **_YEET_**
- if you have a different queue and worker mechanics, `jobs` folder goes **_YEEET_**
- if you have different routing and controller mechanics, `modules` folder goes **_YEEEET_**
- etc..., you get the idea

<img src="https://media.tenor.com/jSx1KiL3L2UAAAAC/yeet-lion-king.gif" height="200" alt="yeet" />

Removing these folders usually should not cause issues, since they are loosely coupled.
Even then if you are removing them, please make sure to check where all the imports are used in the rest of the project and make a note on how to replace them

For example

- If removing the `database` folder, you will also need you to modify `<module>.db.js` file, as it imports db models to make queries.
- If removing the `config` folder, you will need to provide an alternative export for the config, with env vars and config keys, as it is used in quite a few places, or you will need to edit those where it is already in usage to suit your needs .

> The removal/replacement of almost all folders except for `config` folder is trivially possible, with very little to change in other files.

# My Opinions

#### ([skip](#the-boilerplate-in-depth) this section or [go back to top](#nodejsexpress-template-robot) if you don't care :stuck_out_tongue_closed_eyes:)

- It uses JS over TS.
  - You may convert it to TS if needed. or if i find a need for it.
  - I have nothing against static typing, in fact i really like it. but i am waiting for typing in JS.
- There is separation of concerns but it does not properly follow the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), as there no proper injection of dependencies which is needed to prevent the business logic from knowing about its dependencies.
  - So the business logic does know about caches and such.
  - For the data layer, the DAO is not injected but instead stored in its own file, imported and called.
  - Dependencies can be/are abstracted by a layer(another file, function) to provide an abstraction which can be mocked for testing.
  - This is in favor of having to only pass needed variables as parameters to controller and not include dependencies, which will pollute the parameter list and not having to wrap functions up in a class or return them in an object with dependency closure.
- It does not use schema validation on database mutating operations(although there is support in objectionjs, which is used), as i think that it is useless and should be handled by properly implementing the db with proper indexes, constraints, relations and such.
- It uses objection/knex as opposed to sequelize or other more popular ORM, as they do not have great support for properly managing joins and relations, which are a core part of using SQL, plus its a light wrapper over SQL itself.
- All the db calls for a module will lie in the module's own `<module>.db.js` file.
  - Even if there are common db queries between modules, it will be duplicated in both modules to keep the modules as independent as possible.
- It does not support swagger or any such API documentation tools, as i feel that is not something the code should be worried about.
  - If you need to document your API, use postman or such other tools instead of polluting the codebase with such documentation.
- The route handler only handles the request response cycle. It does not do any kind of business logic.
  - It will get the data from the request. send them to controller. get response from controller. make and send the response.
  - Sending the response can include anything to prepare the data to be sent. doesnt simply have to be send the response from controller.
  - It can setup the headers, or it can turn the reponse into a stream of data to be able to stream the response.
  - This can cause an issue with having to set up headers or such like based on business logic.
    - in such cases, return some extra metadata from the controller, along with the actual response data to setup the headers or such, which are needed to send the response.
  - but do not break the concern where route handler handles the request and controller does business logic.
- There is no request body, query or params data validation happening in the route handlers, as that is handled inside the controllers themselves.
  - This is so that controllers may call each other, or even between modules, thus validation should happen on controller level and not route level.
    - I would advise against calling directly between modules as that could increase coupling, instead create an interface function or even more preferably, use message queues(already implemented and available) to interact between modules.
- It does not use any validation library, like joi or zod, instead it is left upto the user to decide what they want.
  - All the validation should lie within `<module>.validate.js` so we have an abstraction for it from the business logic
  - It does not use a library since i have encountered situations where there could be complex validation requirement or data transformation needed based on other parameters.
    - As such it is a "validation, sanitization and transformation" layer.
    - After validation, it should return the final data that is usable by the controller.
  - I do not like the fact that we have to call the validation function for each controller manually, and would like to abstract it away.
- It does not have test suites built in to it, as i believe the test suites should not be part of the codebase.
  - The test suites for a codebase should be an independent codebase maintained separately.
  - intermingling test files with code files simply pollutes the codebase.
  - Deployment which has a test runner could be challenging to implement.
    - but that is a challenge i like to ignore.
  - **This does not under any circumstance say that the code should be untestable. It should still be written in a way that makes it testable.**
- It uses pino as a logger. It does not write to a file or do any log management functionality, as i believe it not the job of the code to manage its logs.
  - It simply prints to the console, in an parseable object structure.
  - An external log handler like fluentd, ELK or so should be handling and managing the log data.
- It uses BullMQ for message queue, jobs and workers. It does not use Kafka or any such mainstream solutions.
  - This is because this template is not meant to be used as microservices architecture.
  - It is more of modular monolith. thus this is used to facilitate communication between modules or to move out long running jobs.
- Since it is a modular monolith, do not write the code to scale as if it is a microservice.

  - Although i say that, it is still possible to scale the app in different pieces or modules.
    - The workers can be run separately and are thus scalable.
    - Each module is also able to run independently from other modules and can thus be scaled.
    - The other units of code like config, database, utils, middleware(which are needed) etc will be the common code for each of these deployments. so those units should be present for all the deployments(if they are a dependency).

- This template uses job queues via BullMQ(can be removed if not needed), BullMQ uses redis, which means redis should be available in the code, so redis should be used as cache, **but it is not**, It uses memory cache.
  - It can be changed to use redis if needed.
  - The apps I and many others build are not used on the scale of 100,000 users or even 10,000. therefore i do not really scale to multiple instances most of the time(you can though if you need).
  - Even a lot of SME's do not build apps of this scale and have no requirement to scale it to even have a second instance.
  - So memory cache is more than enough for most needs.
  - If it is needed to be scale-proof, when the need arises, just change the implementation in `<module>.cache.js` to use redis, memcached or anything else.

# The Boilerplate in depth

The features and structure will be explained below in sections building upon each other

## File Loader

- The file loader feature enables the user to dump a bunch of static files that needs to be loaded at the start of the server application.
- It is located in the `loadFile` folder with a default export named `files`.
- This is a small feature that helps in organizing and loading all the files, to be accessed from anywhere.
- The files can be for example AWS SES or SNS conf file, GCP IAM file, or a private/public key pair etc.

## Config

- The `config` folder contains the logic to combine all the configuration variables from the `config.json`, CLI args and `.env` files preset in the `config` folder.
- This allows all the config variables to be accessed from a single `config` object throughout the project.
- The env file to be loaded can also be configured with a key in `config.json`.
- If the `NODE_ENV` is `development`, then it dynamically loads `dotenv` to load the env from the specified env file.
- A `.sample.env` file is given on how the env keys can be defined.
- Multiple db connections can be defined the in `.env` file, and it will automatically create the necessary connections for them. (More on multi-tenancy later)
- The config file is also used while working with `Knex` CLI, to find the db that it is connected to.

## Uniform success and error response

- `lib/responseHelpers.js` defines 2 classes `Success` and `Failure`, which are the objects which will be sent as response in case of success or error from a request.
- Having such a structure would allow a uniform interface for the response.
- Creating the response objects is also very easy, with just 3 parameters, and 2 of them being optional.
- Normally only the Failure object will need to created manually when, as the success object is created automatically when a return value is specified. (Explained below)

## Global throw and automatic success response

- During the initialization, `lib/routerExceptionHandler.js` executes a function which wraps every middleware and endpoint controller function in an exception handler.
- This allows us to `throw` an error or `Failure` object from anywhere in the code and immediately end the request with an error response.
- Along the same vein, `lib/routerInjectSuccessHandler.js` wraps the final handler function in the middleware stack of a request in a success handler.
- This allows us to simply return a value and the wrapper will wrap the value in a `Success` object for us.
- Thus there is no need for the developer to actually use the `res` object to send the response; and will also get a uniform interface.

## Centralized response handling

- Once a value has been returned from a controller, or a `Failure` object has been `throw'n`, it will be automatically processed in the `lib/responseHandlers.js`, where the it will send the response for the request appropriately.
- Thus there is no need to ever worry about manually sending a response.
- In case you forget to return a response, there is a built in mechanism to detect it too.
- There are 3 total error handlers
  - `normalErrorHandler` is used to handle `Error` object thrown by imported modules and built in nodejs errors. it will convert those errors into `Failure` object and sent to the next error handler.
  - `standardErrorHandler` will process all the `Failure` object errors and send the appropriate error.
  - `finalErrorHandler` will handler any and all errors that were not previously handled or those that are `fatal` error and which cannot be shown to the user. ex. failed db connections details
- If needed you may modify these error handling to your needs,
- If the `type` field in error is marked as `INTERNAL`, it will be logged internally, and will not be sent to the user, only a generic message will be sent to user.
- If the `NODE_ENV` is marked as `development`, then the errors marked as `INTERNAL` will also still be sent to the developer to help ease the development and debugging process.

## Logger

- `pino` is used as logger, which is run in a separate process implicitly.
- This frees up node from having to process logs.
- During `development`, the logs are printed to the console with pretty-printing on.
- During `production`, the logs should be passed to a log collection and managing service like fluentd, ELK stack etc.
- Each request is automatically tagged with a uuid so it may be traced and monitored.
- It is available as a default export `log` from `lib/logger.js`

## Modules

- The main request handling is managed in the `modules` folder.
- Each module is separated into it's own folder and routes for each are defined within it.
- This is probably most of the code is going to reside.
- Inside the folder contain a single `_route.js` file, which routes to each of the different modules.
- An existing template module (`_template`) is already created, so you may simply copy paste it to create a new module.

- Inside each module you will find files for each action, such as:

  - `*._controller.js` - controller handling
  - `*._route.js` - route handling
  - `*.db.js` - db queries and calls
  - `*.validate.js` - controller parameter validation methods

- You may also create other files for your own purposes.

> ###### A working `auth` module has been defined as an example to learn the usage

## Message queues

- `BullMQ` is used to handle message queues
- This allows us to offload work to different worker processes and free up the main thread for other request.
- The queues and workers are defined in the `jobs` folder, within their respective directories.
- The workers are all started on separate processes.
- You can easily scale up the number of workers as needed, in the same machine or even a different machine.
- The `MailQueue` is already in usage in the `auth` module. refer to it to gain an understanding of its usage.

## Database and Models

- The `database` folder contains the details regarding all database connection and models.
- The `database/models` folder contain all the models that will be required in the application and used throughout the project.
- The `database/conn` folder contains the details of the connections to databases.
- `database/conn/BaseModel.js` file defined the base structure which will be inherited by all the models.
- It also checks if there is only 1 db connection defined in the config and set that as the default connection.
- It also defines the query function which will check if there is multi-tenancy defined and try to automatically obtain the tenant connection without manually having to specify it will making a query. (More on this later)
- `database/conn/dbinit.js` file is where all the initial connection for the dbs are made as defined in the `.env` file.
- It also exports 2 functions `getKnexDBInstance` and `getKnexTenantInstance`.
- `getKnexDBInstance` function will get the db connection based on the number key defined in the `.env` file for it.
- `getKnexTenantInstance` function will obtain a dynamic connection for a tenant; you will not need to access this function directly as this is automatically called in `BaseModel.js` to determine the tenant. (refer to next section on multi-tenancy).
- usually the function `getKnexDBInstance` will be the only one needed for use, and that too when there is more that 1 db defined for initial startup of the server.

## Migrations and Seeds

- `Knex` allows us to create and manage migration straight from its CLI
- When `Knex` CLI is run for these commands, it will also pull in the `config` object.
- The `config` object will parse the arguments passed and assigns the migrations and seeds in the correct directory defined by the db id.
- If multiple db are defined in the `.env` file then, it will throw an error if the db to run the migrations or seeds against has not been specified.
- It can be specified by the CLI option `-d` followed by the db id.
- Thus we can manage migrations and seed for multiple dbs.

## Multi-Tenancy

- This is a completely optional feature for those who need it.
- Multi tenancy support is available, and can have both dynamic connections for each request and also multi db connection at startup.
- `AsyncLocalStorage` from nodejs is used to store the tenancy details of a user during the `authorize` function in `middleware/authorize.js`.
- Setting up the method to store the details will allow the boilerplate to automatically create, cache and use the tenant configuration.
- So an initial setup will be needed and will have to be added to `middleware/authorize.js` if needed.
- Please read the comment in `middleware/authorize.js` about setting it up
- As for multi database connection, the `getKnexDBInstance` function mentioned above can be used to get the connection details for the db that is needed and it will need to be passed during the knex query.
- for example `User.query(getKnexDBInstance(1))` to use the db defined by `id` 1 in the `.env` file.

**NB: For usage on multi-tenancy with dynamic connections, please read the comment in `middleware/authorize.js` about setting it up.**

## Docker

- A Dockerfile and .dockerignore file have been defined which will allow to containorize the application.
- This will be helpful when multiple instances are needed for scaling or for redundancy.

## Utils and Lib

- These folders contain utilities and lib files written to support the boilerplate.
- `lib` contains files you wouldnt normally need to import, except for few objects like `Failure` object or `lib/logger.js`.
- It also has files to get current dir and load a file in `lib/getFileDir.js` and `lib/fileLoader.js`, although it will not usually be needed.
- The `utils` folder contains helpers that are more usually needed for developers, like making axios instances, creating caches, or get a random token.

> Most of the work will only be focused on `middleware`, and `modules` folder, and will not have to worry about all the details mentioned above on its working.
> Work in `config`, `database/models`, `jobs`, `utils` folders will be quite less and usually will be a one time setup work.

> Please do go through the boilerplate and the pre-made `auth` module to see it all in working.
>
> ###### [Postman collection link](https://documenter.getpostman.com/view/5939662/2s8Yt1r96h)

***:hammer_and_wrench: with :heart: :computer: :pizza: by bitDaft***

# TODO

- [x] update all packages to latest version
- [x] Fix Knex cli command execution issues
- [x] Add docker support
- [x] Allow dynamic rate limit based on whether request is API key or session API call
- [x] Fixed working of multi tenancy and multi database
- [x] Auto detection of tenant (with little initial setup work)
- [x] Complete proper documentation
- [x] Consolidate closing exit scripts in www.js
- [ ] abstracting away the manual call for validation function, if possible
- [ ] Add Multi tenancy connection example 
- [ ] socket integration?
- [ ] use redis cache instead of memory cache?
