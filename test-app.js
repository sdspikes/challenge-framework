var tester = require('./testing-framework.js');

var snippet = 'var answer = 42; if (answer <10) { console.log("oh noes"); }';

// console.log(JSON.stringify(esprima.parse(snippet), null, 4));
console.log(tester.whitelist(snippet, ['IfStatement']));
