$(document).ready(function () {
  function isFilled() {
    const username = validator.trim($("#username").val());
    const realName = validator.trim($("#realName").val());
    const password = validator.trim($("#password").val());

    const usernameEmpty = validator.isEmpty(username);
    const realNameEmpty = validator.isEmpty(realName);
    const passwordEmpty = validator.isEmpty(password);

    return !usernameEmpty && !realNameEmpty && !passwordEmpty;
  }

  function isValidUsername(field, callback) {
    var username = validator.trim($("#username").val());
    var isValidLength = validator.isLength(username, { min: 3, max: 8 });

    if (isValidLength) {
      $.get("/getCheckUsername", { username: username }, function (result) {
        if (result.username != username) {
          if (field.is($("#username"))) $("#usernameError").text("");

          return callback(true);
        } else {
          if (field.is($("#username")))
            $("#usernameError").text("Username number already exists.");

          return callback(false);
        }
      });
    } else {
      if (field.is($("#username")))
        $("#usernameError").text(
          "Username should contain at least three (3) characters."
        );

      return callback(false);
    }
  }

  function isValidPassword(field) {
    var validPassword = false;

    const password = validator.trim($("#password").val());
    const isValidLength = validator.isLength(password, { min: 5 });

    if (isValidLength) {
      if (field.is($("#password"))) $("#passwordError").text("");

      validPassword = true;
    } else {
      if (field.is($("#password")))
        $("#passwordError").text(`Passwords should contain at least 5
                    characters.`);
    }

    return validPassword;
  }

  function validateField(field, fieldName, error) {
    var value = validator.trim(field.val());
    var empty = validator.isEmpty(value);

    if (empty) {
      field.prop("value", "");

      error.text(fieldName + " should not be empty.");
    } else error.text("");

    var filled = isFilled();

    var validPassword = isValidPassword(field);

    isValidUsername(field, function (validUsername) {
      if (filled && validPassword && validUsername)
        $("#submit").prop("disabled", false);
      else $("#submit").prop("disabled", true);
    });
  }

  $("#username").keyup(function () {
    validateField($("#username"), "Username", $("#usernameError"));
  });

  $("#realName").keyup(function () {
    validateField($("#realName"), "realName", $("#realNameError"));
  });

  $("#password").keyup(function () {
    validateField($("#password"), "Password", $("#passwordError"));
  });
});
