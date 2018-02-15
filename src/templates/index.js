import React, { Component } from "react"
import Link from "gatsby-link"

const IndexPage = ({ data, pathContext }) => {
    const { group, index, pageCount } = pathContext

    const pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <h3>{pageCount * group.length - 1} Jobs</h3>
            <ul>
                {
                    group.map(({ node: { id, title } }) => (
                        <li key={id}>
                            <Link to={`/job/${id}`}>{title}</Link>
                        </li>
                    ))
                }
            </ul>
            {
                pages.map(num => (
                    <Link to={num === 1 ? `/` : `/${num}`}>{num}</Link>
                ))
            }
        </div>
    )
}

export default IndexPage