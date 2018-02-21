import React, { Component } from 'react'
// import { Client, query } from 'micro-graphql-react'
import { createApolloFetch } from 'apollo-fetch'




// const client = new Client({
//     endpoint: process.env.GRAPHQL_ENDPOINT
// })

class Search extends Component {
    constructor(props) {
        super(props)
        const uri = "http://localhost:3000/graphql"
        this.client = createApolloFetch({ uri })
        this.search = this.search.bind(this)
        this.state = {
            queryResults: []
        }
    }
    search = () => {
        this.client({
            query: `
                query {
                    jobs {
                    title
                    }
                }
            `
        })
            .then(result => {
                this.setState({ queryResults: result.data.jobs })
                const match = result.data.jobs.filter(
                    job => job.title
                        .toLowerCase()
                        .includes(this.input.value.toLowerCase())
                )
                console.log(match)
            })
            .catch(error => console.error(error))
        // client.runQuery(`
        //     query {
        //         jobs {
        //           title
        //         }
        //       }
        // `)
    }
    render() {
        return (
            <div>
                <input type='text' ref={input => this.input = input} />
                <button onClick={this.search}>Search</button>
            </div>
        )
    }
}

export default Search