import React, { Fragment } from "react"
import Link from "gatsby-link"

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
                padding: 5px;
                cursor: pointer 
            }
        `}</style>
    </scope>
)

const Job = ({ id, title, locations }) => (
    <div className="root">
        <h3>{title}</h3>
        <ul>
            {locations && locations.length > 0
                ? (locations.map(
                    loc => (
                        <li key={`${id}-${loc}`}>{loc}</li>
                    )
                )) : <li>No location specified</li>
            }
        </ul>
        <Link className={`link ${scoped.className}`} to={`/job/${id}`}>
            More Infos
        </Link>
        {scoped.styles}
        <style jsx>{`
            .root {
                display: flex;
                min-width: 300px;
                width: 70vW;
                flex-direction: column;
                align-items: center;
                margin: 10px;
                border: 5px solid rebeccapurple;
                border-radius: 5px;
                box-shadow: 1px 1px 5px rgba(0,0,0,0.35)
            }
            h3 {
                background-color: rebeccapurple;
                color: #fff;
                padding: 5px;
                width: 100%
            }
            ul {
                margin: 0
            }
        `}</style>
    </div>
)

export default Job