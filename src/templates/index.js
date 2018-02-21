import React, { Component } from "react"
import Link from "gatsby-link"
// import ApolloClient from 'apollo-boost'
// import { ApolloProvider } from 'react-apollo'

import Job from "../components/Job"
import Search from "../components/Search/JobSearch"

// const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' })

class IndexPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeSearch: false
        }
        this.handleSearchState = this.handleSearchState.bind(this)
    }

    handleSearchState(activeSerach) {
        this.setState({
            activeSearch
        })
    }

    render() {
        const { data, history, pathContext, location: { pathname: path } } = this.props
        const { group, index, pageCount } = pathContext

        const pages = []
        for (let i = 1; i <= this.props.pathContext.pageCount; i++) {
            pages.push(i)
        }

        return (
            // <ApolloProvider client={client}>
            <div className="indexRoot">
                <h3>Jobs</h3>
                <Search handleSearchState={this.handleSearchState} history={history} />
                <div>
                    {
                        group.map(({ node }) => (
                            <Job key={node.id} {...node} />
                        ))
                    }
                </div>
                <div>
                    {
                        pages.map(num => (
                            <Link
                                key={num}
                                exact
                                activeClassName='activeLink'
                                className={`link ${scoped.className}`}
                                to={num === 1 ? `/` : `/${num}`}
                            >
                                {num}
                            </Link>
                        ))
                    }
                </div>
                {scoped.styles}
                <style jsx>{`
                .indexRoot {
                    display: flex;
                    flex-direction: column; 
                    align-items: center;
                }
                h3 {
                    color: rebeccapurple
                }
                
            `}</style>
            </div>
            // </ ApolloProvider>
        )
    }
}

function resolveScopedStyles(scope) {
    return {
        className: scope.props.className,
        styles: scope.props.children
    }
}

const scoped = resolveScopedStyles(
    <scope>
        <style jsx>{`
            .link { 
                text-decoration: none;
                font-family: sans-serif;
                color: rebeccapurple;
                padding: 5px 10px;
                margin: 3px;
                cursor: pointer 
            }
            .activeLink {
                border: 1px solid rebeccapurple;
            }
        `}</style>
    </scope>
)

export default IndexPage