import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

export default function Template({ data, history: { goBack } }) {
    const { mongodbGatsbymeteorpocJobs: { id, title, description, locations } } = data
    return (
        <div>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
            {locations && (
                <ul>
                    {locations.map(location => (
                        <li key={`${id}-${location}`}>{location}</li>
                    ))}
                </ul>
            )}
            <button onClick={goBack}>Go Back</button>
        </div>
    )
}

export const postQuery = graphql`
    query jobQuery($id: String!) {
        mongodbGatsbymeteorpocJobs(id: { eq: $id}) {
        title
        description
        locations
        id
        }
    }
`