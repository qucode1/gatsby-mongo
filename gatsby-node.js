/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators
    const jobTempalte = path.resolve("src/templates/jobDetails.js")

    return graphql(`{
            allMongodbGatsbymeteorpocJobs {
                edges {
                  node {
                    id
                  }
                }
              }
         }`).then(({ errors, data: { allMongodbGatsbymeteorpocJobs: { edges: jobs } } }) => {
            if (errors) {
                console.error(errors)
                Promise.reject(errors)
            }
            jobs.forEach(({ node: { id } }) => {
                createPage({
                    path: `/job/${id}`,
                    component: jobTempalte,
                    context: {
                        id
                    }
                })
            })

            Promise.resolve()
        })

}