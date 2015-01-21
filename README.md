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


## Choice of parser

I found myself wavering between [acorn](http://marijnhaverbeke.nl/acorn/) and [esprima](http://esprima.org/).  Acorn is a bit smaller and faster, but not significantly so.  I saw on the esprima page that it could be used with RequireJS and decided to give that a go for the web app since I hadn't played with RequireJS before and thought that it might be good to see how it works.  Acorn seems not to support this, so I'm stuck with esprima (or at least is not interchangable with esprima in this aspect -- I chose not to spend too much time seeing if I could massage acorn into working with RequireJS).

It looks like acorn has some interesting stuff with fault-tolerant parsing that would be fun to play with, but I didn't think to look into it until after I coded myself into a corner with esprima.  
