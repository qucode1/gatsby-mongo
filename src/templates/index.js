import React, { Component } from "react"
import Link from "gatsby-link"

import Job from "../components/Job"

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

const IndexPage = ({ data, pathContext, location: { pathname: path } }) => {
    const { group, index, pageCount } = pathContext

    const pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <div className="indexRoot">
            <h3>Jobs</h3>
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
    )
}

export default IndexPage