var tester = require('../testing-framework.js');
var snippet = 'var answer = 42; if (answer <10) { console.log("oh noes"); }';
//
// var parser = require('esprima');
// console.log(JSON.stringify(parser.parse(whileSnippet), null, 4));

var whileSnippet = 'var answer = 42; while(true) { if (answer <10) { console.log("oh noes"); }}';

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
  it('should be have it all', function() {
    expect(tester.whitelist(whileSnippet,
      ['WhileStatement', 'IfStatement', 'VariableDeclaration']))
      .toEqual(false);
  });
  it('should be vacuously true', function() {
    expect(tester.whitelist(snippet, []))
      .toEqual(true);
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
});


var whileStructure = [{
  'type' : 'WhileStatement',
  'body' : [{'type' : 'IfStatement'}]
}];
var doubleWhileStructure = [{
  'type' : 'WhileStatement',
  'body' : [{'type' : 'WhileStatement'}]
}];

describe('Structure tests', function() {
  it('should have the right structure', function() {
    expect(tester.hasStructure(whileSnippet, whileStructure)).toEqual(true);
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
