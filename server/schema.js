const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean, GraphQLFloat } = require('graphql')
const Movies = require('./models/movie')
const Directors = require('./models/director')

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType),
      async resolve({ id }, args) {
        const movies = await Movies.find({ directorId: id})
        return movies
      }
    }
  })
});

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    director: {
      type: DirectorType,
      async resolve({ directorId }, args) {
        const director = await Directors.findById(directorId)
        return director
      }
    },
    rate: { type: GraphQLFloat },
    watched: { type: new GraphQLNonNull(GraphQLBoolean) }
  })
});



const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, { id }) {
        const movie = Movies.findById(id)
        return movie
      }
    },

    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, { id }) {
        const director = Directors.findById(id)
        return director
      }
    },

    movies: {
      type: new GraphQLList(MovieType),
      args: { name: { type: GraphQLString } },
      async resolve(parent, { name }) {
        const movies = await Movies.find({ name: { $regex: name, $options: 'i' } })
        return movies
      }
    },

    directors: {
      type: new GraphQLList(DirectorType),
      args: { name: { type: GraphQLString } },
      async resolve(parent, { name }) {
        const directors = await Directors.find({ name: { $regex: name, $options: 'i' } })
        return directors
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString},
        age: { type: GraphQLInt },
      },
      async resolve(parent, { name, age }) {
        const director = new Directors({
          name,
          age,
        })
        return await director.save()
      }
    },

    markMovieViewing: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      async resolve(parent, { id, watched }) {
        return await Movies.findByIdAndUpdate(id, { watched })
      }
    },

    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID } ,
        rate: { type: GraphQLFloat },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      async resolve(parent, { name, genre, directorId, rate, watched }) {

        const movie = new Movies({
          name,
          genre,
          directorId,
          rate,
          watched,
        })
        return await movie.save()
      }
    },

    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        return await Movies.findByIdAndDelete(id)
      }
    },

    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        return await Directors.findByIdAndDelete(id)
      }
    },

    updateMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID},
        rate: { type: GraphQLFloat },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      async resolve(parent, { id, name, genre, directorId, rate, watched }) {
        return await Movies.findByIdAndUpdate(
          id,
          {
            name,
            genre,
            directorId,
            rate,
            watched,
          }
        )
      }
    },

    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, { id, name, age }) {
        return await Directors.findByIdAndUpdate(
          id,
          {
            name: name,
            age: age,
          }
        )
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
