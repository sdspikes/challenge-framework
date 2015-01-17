var tester = require('../testing-framework.js');
var snippet = 'var answer = 42; if (answer <10) { console.log("oh noes"); }';

// var parser = require('esprima');
// console.log(JSON.stringify(parser.parse(snippet), null, 4));

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
    expect(tester.whitelist(snippet, ['IfStatement', 'fakeThing']))
      .toEqual(false);
  });
  it('should be happy there is no While', function() {
    expect(tester.whitelist(snippet, ['WhileStatement'])).toEqual(false);
  });
  it('should be vacuously true', function() {
    expect(tester.whitelist(snippet, []))
      .toEqual(true);
  });
});
