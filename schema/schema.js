const graphql=require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

var books =[
    {name: 'abc', genre: 'Fantasy', id: '1'},
    {name: 'def', genre: 'Fantasy', id: '2'},
    {name: 'ghi', genre: 'Fantasy', id: '3'}
]

const BookType= new GraphQLObjectType({
    name:'book',
    fields: ()=>({
       id: {type: GraphQLString},
       name: {type: GraphQLString},
       genre: {type: GraphQLString} 
    })
})

const RootQuery= new GraphQLObjectType({
    name: 'RootQueryType',
    field: {
        book:{
            type: BookType,
            args: {id:{type: GraphQLString}},
            resolve(parent, arg)
                //code to get data from db/ other source
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})