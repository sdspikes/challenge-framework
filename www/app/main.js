$("#student-code").keyup(function(eventObject) {
  var studentCode = $("#student-code").val();
  require(['testing-framework'], function (tester) {
      var message;
      // I considered adding the error handling to the API but it seems like you
      // might want to be able to provide custom messages in the tests, so I
      // left it to the the client to deal with thrown errors.
      try {
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
