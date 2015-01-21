This repository contains two things:

* a node module for determining whether a snippet of JS code has certain properties, and
* a basic webpage using that module with a textarea for student code, which will have the tests written using that framework run against it to check for validity

## Optimizing web app

To optimize the web app, run
```
node tools/r.js -o tools/build.js
```

## Viewing web app

The entry point for the web app is `www/index.html`, or `www-built/index.html` if you you've run the optimzer.

## Testing
The tests for the framework are written in jasmine-node.  To run the tests, first install NodeJS, then, in the top level directory of the repo, run
```
npm install
jasmine-node spec
```


