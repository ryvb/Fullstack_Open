const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
    Query: {
      authorCount: async () => Author.collection.countDocuments(),
      bookCount: async () => Book.collection.countDocuments(),
      allAuthors: async (root, args) => {
        return Author.find({})
      },
      allBooks: async (root, args) => {
          if (!args.author && !args.genres) {
              return Book.find({}).populate('author')
          } else if (args.author && !args.genres) {
              return Book.find({ author: args.author }).populate('author')
          } else if (!args.author && args.genres) {
              return Book.find({ genres: { $in: args.genres } }).populate('author')
          } else {
              return Book.find({ author: args.author}, {genres: { $in: args.genres } }).populate('author')
          }   
      },
      allGenres: async (root, args) => {
        const books = await Book.find({})
        const genres = [...new Set(books.map((book) => book.genres).flat(1))]
        return genres
      },
      reccBooks: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
        return Book.find({genres: { $in: currentUser.favoriteGenre}}).populate('author')
  
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
          const currentUser = context.currentUser
  
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
                error
              }
            })
          }
          const author = await Author.find({ name: args.author })
          
          if (author.length === 0) {
            const newAuthor = new Author({ name: args.author, id: uuid() })
            try {
              await newAuthor.save()
            } catch (error) {
              throw new GraphQLError('Saving author failed', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
              })
            }
  
            const book = new Book({ ...args, author: newAuthor, id: uuid()})
            try {
              await book.save()
            } catch (error) {
              throw new GraphQLError('Saving book failed', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
              })
            }
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
  
            return book
          } else {
            const book = new Book({ ...args, author: author[0], id: uuid()})
            try {
              await book.save()
            } catch (error) {
              throw new GraphQLError('Saving book failed', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
              })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book.pupulate('author') })
  
            return book.populate('author')
          }
      },
      addAuthor: async (root, args) => {
          const author = new Author({ ...args, id: uuid() })
          try {
            await author.save()
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
          return author
      },
      editAuthor: async (root, args, context) => {
          const currentUser = context.currentUser
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT'
              }
            })
          }
          const author = await Author.findOne({ name: args.name })
          author.born = args.born
          return author.save()
      },
      createUser: async (root, args) => {
        const user = new User({ ...args, id: uuid() })
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if ( !user || args.password !== 'secret') {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
        
        const userForToken = {
          username: user.username,
          id: user._id
        }
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
      }
    },
    Author: {
      bookCount: async (obj) => {
          return Book.collection.countDocuments({ author: obj._id})
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      }
    }
}

module.exports = resolvers