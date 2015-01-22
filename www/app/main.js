// whenever the student finishes typing any character, grab their code, parse
// it, and run the tests.
$("#student-code").keyup(function(eventObject) {
  var studentCode = $("#student-code").val();
  require(['testing-framework'], function (tester) {
    function structureOption (innerStatement) {
      return [{
        'type' : 'FunctionDeclaration',
        'body' : [{ 'type' : innerStatement }]
      }];
    };
    var message;
    // I considered adding the error handling to the API but it seems like you
    // might want to be able to provide custom messages in the tests, so I
    // left it to the the client to deal with thrown errors.
    try {
      if (tester.whitelist(studentCode, ['FunctionDeclaration'])) {
        message = "Great, you declared a function!";
        if (!tester.blacklist(studentCode, ['ContinueStatement'])) {
          message = "Looks like you used a continue statement. This is not "
            + "necessary for the given problem.";
        } else if (tester.hasStructure(
          studentCode, structureOption('WhileStatement')) ||
          tester.hasStructure(studentCode, structureOption('ForStatement'))) {
            message = "Yay, you have a loop in your function!";
        } else {
          message = "Your function should contain some kind of loop.";
        }
      } else {
        message = "Looks like no function was declared, make sure to read "
          + "the instructions!";
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
