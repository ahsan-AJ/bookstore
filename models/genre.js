/**
 * Created by HP_PC on 12/26/2016.
 */
var mongoose = require('mongoose');

// Create Schema
var genreSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        default:Date.now
    }
});

var Genre = module.exports = mongoose.model('Genre',genreSchema);

// Get genres
module.exports.getGenres = function(callback,limit){
    Genre.find(callback).limit(limit);
};

//Add Genre
module.exports.addGenre = function(genre,callback){
    Genre.create(genre,callback);
};

//Update Genre
module.exports.updateGenre = function(id,genre,options,callback){
    var query = {_id:id};
    var update = {
        name:genre.name
    };
    Genre.findOneAndUpdate(query,update,options,callback);
};

//Delete Genre
module.exports.removeGenre = function(id,callback){
    var query = {_id:id};
    Genre.remove(query,callback);
};