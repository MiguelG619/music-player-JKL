$(document).ready(function () {
  function isFilled() {
    const title = validator.trim($("#title").val());
    const desc = validator.trim($("#desc").val());
    const url = validator.trim($("#url").val());

    const titleEmpty = validator.isEmpty(title);
    const descEmpty = validator.isEmpty(desc);
    const urlEmpty = validator.isEmpty(url);

    return !titleEmpty && !descEmpty && !urlEmpty;
  }

   function isValidTitle(field, callback) {
    var title = validator.trim($("#title").val());
   
      $.get("/getCheckTitle", { title: title }, function (result) {
        if (result.title != title) {
          if (field.is($("#title"))) $("#titleError").text("");

          return callback(true);
        } else {
          if (field.is($("#title")))
            $("#titleError").text("Title already exists.");

          return callback(false);
        }
      });
    
  }

  function isValidUrl(field, callback) {
    var url = validator.trim($("#url").val());

      $.get("/getCheckUrl", { url: url }, function (result) {
        if (result.url != url) {
          if (field.is($("#url"))) $("#urlError").text("");

          return callback(true);
        } else {
          if (field.is($("#url")))
            $("#urlError").text("Track already exists.");

          return callback(false);
        }
      });
  }

  function validateField(field, fieldName, error) {
    var value = validator.trim(field.val());
    var empty = validator.isEmpty(value);

    if (empty) {
      field.prop("value", "");

      error.text(fieldName + " should not be empty.");
    } else error.text("");

    var filled = isFilled();

    var validUrl = isValidUrl(field);

    isValidTitle(field, function (validTitle) {
      if (filled && validUrl && validTitle)
        $("#submit").prop("disabled", false);
      else $("#submit").prop("disabled", true);
    });
  }

  $("#title").keyup(function () {
    validateField($("#title"), "Title", $("#titleError"));
  });

  $("#realName").keyup(function () {
    validateField($("#desc"), "Description", $("#descriptionError"));
  });

  $("#password").keyup(function () {
    validateField($("#url"), "Url", $("#urlError"));
  });
});
