const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book')
const Author =require('../models/author')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

// var books =[
//     {name: 'abc', genre: 'Fantasy', id: '1', authorId: "1"},
//     {name: 'def', genre: 'Fantasy', id: '2', authorId: "2"},
//     {name: 'ghi', genre: 'Sci-Fi', id: '3', authorId: "3"},
//     {name: 'jkl', genre: 'Fantasy', id: '4', authorId: "1"},
//     {name: 'mno', genre: 'Fantasy', id: '5', authorId: "3"},
//     {name: 'pqr', genre: 'Sci-Fi', id: '6', authorId: "2"},
//     {name: 'stu', genre: 'Fantasy', id: '7', authorId: "2"},
// ]

// var authors =[
//     {name:"leo1", age: 30, id: '1'},
//     {name:"leo2", age: 35, id: '2'},
//     {name:"leo3", age: 40, id: '3'}
// ]


const BookType= new GraphQLObjectType({
    name:'Book',
    fields: ()=>({
       id: {type: GraphQLID},
       name: {type: GraphQLString},
       genre: {type: GraphQLString},
       author: {
           type: AuthorType,
           resolve(parent, args){
            //    return _.find(authors, {id: parent.authorId})
            return Author.findById(parent.authorId)
           }
       } 
    })
})

const AuthorType= new GraphQLObjectType({
    name:'Author',
    fields: ()=>({
       id: {type: GraphQLID},
       name: {type: GraphQLString},
       age: {type: GraphQLInt},
       books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return _.filter(books, {authorId: parent.id})
                return 
            }
       } 
    })
})

const RootQuery= new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db/ other source
                // return _.find(books, {id: args.id});
            }     
        },
        author: {
            type: AuthorType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                // return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author= new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args){
                let book= new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})