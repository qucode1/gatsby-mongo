import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import { createApolloFetch } from 'apollo-fetch'
import Downshift from 'downshift'

// const gqlEndpoint = process.env.GRAPHQL_ENDPOINT

const uri = "https://yannick-lernt.de/graphql"
const client = createApolloFetch({ uri })

function is_server() {
    return !(typeof window != 'undefined' && window.document);
}

export default class ApolloAutoComplete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queryResult: (!is_server() && JSON.parse(sessionStorage.getItem("jobTitles"))) || undefined
        }
        this.runQuery = this.runQuery.bind(this)
    }
    runQuery = () => {
        if (!this.state.queryResult) {
            client({
                query: `
                    query {
                        jobs {
                            _id
                            title
                        }
                    }
                `
            })
                .then(result => {
                    this.setState({ queryResult: result.data.jobs })
                    !is_server() && sessionStorage.setItem("jobTitles", JSON.stringify(result.data.jobs))
                })
                .catch(error => {
                    this.setState({ queryResult: error })
                    console.error(error)
                })
        }
    }
    render() {
        return (
            <Fragment>
                <Downshift
                    onChange={(selectedJob) => {
                        this.props.history.push(`/job/${selectedJob._id}`)
                        console.log(selectedJob)
                    }}
                    itemToString={i => (i ? i.title : '')}
                    queryResult={this.state.queryResult}
                >
                    {({
                        getInputProps,
                        getItemProps,
                        isOpen,
                        inputValue,
                        selectedItem,
                        highlightedIndex,
                        itemToString
                    }) => (
                            <div>
                                <input {...getInputProps({ placeholder: 'Job Title ?' })} onFocus={this.runQuery} />
                                {this.state.queryResult && !(this.state.queryResult instanceof Error) && isOpen ? (
                                    <div style={{ border: '1px solid #ccc' }}>
                                        {this.state.queryResult
                                            .filter(i =>
                                                !inputValue ||
                                                i.title.toLowerCase()
                                                    .replace(/[^a-z0-9]/g, "")
                                                    .includes(
                                                        inputValue.toLowerCase()
                                                            .replace(/[^a-z0-9]/g, "")
                                                    )
                                            )
                                            .slice(0, 6)
                                            .map((item, index) => (
                                                <div
                                                    {...getItemProps({ item })}
                                                    key={item._id}
                                                    style={{
                                                        backgroundColor: highlightedIndex === index ? 'gray' : 'white',
                                                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                    }}
                                                >
                                                    {item.title}
                                                </div>
                                            ))}
                                    </div>
                                ) : null}
                            </div>
                        )}
                </Downshift>
            </ Fragment>
        )
    }
}