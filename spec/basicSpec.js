var tester = require('../www/lib/testing-framework.js');
var snippet = 'var answer = 42; if (answer <10) { console.log("oh noes"); }';
//
// var parser = require('esprima');
// console.log(JSON.stringify(parser.parse(whileSnippet), null, 4));

var whileSnippetWithVar = 'var answer = 42; while(true) { if (answer <10) { console.log("oh noes"); } var x = 2; }';
var whileSnippet = 'var answer = 42; while(true) { if (answer <10) { console.log("oh noes"); }}';
var continueSnippet = "\
for (var i = 2; i < n; i++) {\
  if (stuff) {\
   continue;\
  }\
}";


describe('Whitelist tests', function() {
  it('should contain all statements', function() {
    expect(tester.whitelist(snippet, ['IfStatement', 'VariableDeclaration']))
      .toEqual(true);
  });
  it('should be missing a non-existant statement type', function() {
    expect(tester.whitelist(snippet, ['IfStatement', 'fakeThing']))
      .toEqual(false);
  });
  it('should be missing While', function() {
    expect(tester.whitelist(snippet,
      ['WhileStatement', 'IfStatement', 'VariableDeclaration']))
      .toEqual(false);
  });
  it('should have it all', function() {
    expect(tester.whitelist(whileSnippet,
      ['WhileStatement', 'IfStatement', 'VariableDeclaration']))
      .toEqual(true);
  });
  it('should be vacuously true', function() {
    expect(tester.whitelist(snippet, []))
      .toEqual(true);
  });
  it('should find the continue', function() {
    expect(tester.whitelist(continueSnippet, ['ContinueStatement'])).toEqual(true);
  });
});


describe('Blacklist tests', function() {
  it('should have offending statements', function() {
    expect(tester.blacklist(snippet, ['IfStatement', 'VariableDeclaration']))
      .toEqual(false);
  });
  it('should be annoyed about the if', function() {
    expect(tester.blacklist(snippet, ['IfStatement', 'fakeThing']))
      .toEqual(false);
  });
  it('should be happy there is no While', function() {
    expect(tester.blacklist(snippet, ['WhileStatement'])).toEqual(true);
  });
  it('should be vacuously true', function() {
    expect(tester.blacklist(snippet, [])).toEqual(true);
  });
  it('should find the continue', function() {
    expect(tester.blacklist(continueSnippet, ['ContinueStatement'])).toEqual(false);
  });
});


var whileStructure = [{
  'type' : 'WhileStatement',
  'body' : [{'type' : 'IfStatement'}, {'type': 'VariableDeclarator'}]
}];
var doubleWhileStructure = [{
  'type' : 'WhileStatement',
  'body' : [{'type' : 'WhileStatement'}]
}];

var fib = "function fib(n) {\
  prev = 1;\
  current = 1;\
  for (var i = 2; i < n; i++) {\
    next = prev + current;\
    prev = current;\
    current = next;\
  }\
  return current;\
}";
var fibStructure =  [{
  'type' : 'FunctionDeclaration',
  'body' : [{ 'type' : 'ForStatement' }]
}];

describe('Structure tests', function() {
  it('fib should have the right structure', function() {
    expect(tester.hasStructure(fib, fibStructure)).toEqual(true);
  });
  it('should have the right structure with var', function() {
    expect(tester.hasStructure(whileSnippetWithVar, whileStructure)).toEqual(true);
  });
  it('should have the wrong structure without var', function() {
    expect(tester.hasStructure(whileSnippet, whileStructure)).toEqual(false);
  });
  it('should not have the structure', function() {
    expect(tester.hasStructure(snippet, whileStructure)).toEqual(false);
  });
  it('should not have double while', function() {
    expect(tester.hasStructure(whileSnippet, doubleWhileStructure))
      .toEqual(false);
  })
  it('should be vacuously true', function() {
    expect(tester.hasStructure(snippet, {})).toEqual(true);
  });
});
