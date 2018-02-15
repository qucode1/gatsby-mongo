import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data: { allMongodbGatsbymeteorpocJobs: { edges: jobs } } }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {
        jobs.map(({ node: { id, title } }) => (
          <li key={id} >
            <Link to={`/job/${id}`} >{title}</Link>
          </li>
        ))
      }
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage

export const jobQuery = graphql`
  query jobsQuery {
    allMongodbGatsbymeteorpocJobs {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`