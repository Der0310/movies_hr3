const Movie = require('./Movie')
const Actor = require('./Actor')
const Director = require('./Director')
const Genre = require('./Genre')

Actor.belongsTo(Movie)
Movie.hasMany(Actor);

Director.belongsToMany(Genre, {through:'genreDirector'})
Genre.belongsToMany(Director, {through:'genreDirector'});

Movie.belongsToMany(Genre,{through:'genreMovie'})
Genre.belongsToMany(Movie,{through:'genreMovie'});

Movie.belongsToMany(Actor,{through:'actorMovie'})
Actor.belongsToMany(Movie,{through:'actorMovie'});

Movie.belongsToMany(Director,{through:'directorMovie'})
Director.belongsToMany(Movie,{through:'directorMovie'});