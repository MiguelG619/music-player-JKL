// import module mongoose
const mongoose = require('mongoose');

// TODO insert other models
const User = require('./UserModel.js');

// TODO Check if this works
// ccapdev-mongoose is the name of the database
const url = 'mongodb://localhost:27017/jklDB';

// additional connection options
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {
    
    // connect
    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error) throw error;
            console.log('Connected to: ' + url);
        });
    },

    // insertTrack
    // insertPlaylist
    // insertUser
    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    // findTrack - to see if there are duplicate url's
    // findUser - to see if there are duplicate users, unique username
    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    // findTracks - Home Search, callback return array of track objects
    // findUsers - Home Search, callback return array of user objects
    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    // updateTrack
    // updatePlaylist
    // updateUser
    updateOne: function(model, filter, update) {
        model.updateOne(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    // deleteTrack
    // deletePlaylist
    // deleteUser
    deleteOne: function(model, conditions) {
        model.deleteOne(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    // deleteUserTracksPlaylist - delete all tracks and playlists with deleted username
    deleteMany: function(model, conditions) {
        model.deleteMany(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }
}
/*
    exports the object database (defined above)
    when another script exports from this file
*/
module.exports = database;