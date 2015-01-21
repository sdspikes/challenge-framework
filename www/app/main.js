$("#student-code").keyup(function(eventObject) {
  var studentCode = $("#student-code").val();
  require(['esprima', 'testing-framework'], function (parser, tester) {
      var message;
      try {
        var parsed = parser.parse(studentCode);
        thing = JSON.stringify(parsed, null, 4);
        console.log(thing);
        if (tester.whitelist(studentCode, ['VariableDeclaration'])) {
          message = "Great, you declared a variable!";
        } else {
          message = "Looks like no variable was declared, try again!";
        }
      } catch (err) {
        message = "Your code couldn't be parsed.  Once your code snippet "
          + "looks like valid JavaScript again, we'll check it.  If "
          + "you're stuck, here's the error we got when parsing your "
          + "code: \n\n" + err.message;
      }
      $("#test-output").text(message);
  });
});
