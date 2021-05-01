const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const database = {
  connect: function () {
    const dbURI =
      "mongodb+srv://Miguel:vnWk192ZTTYilRx5@cluster0.hwmuc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority ";
    mongoose
      .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((result) => console.log("Connected to db"))
      .catch((err) => console.log(err));
  },
};

module.exports = database;
