require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: `gatsbymeteorpoc`,
        collection: [`jobs`, `users`],
        server: {
          address: process.env.DB_ADDRESS,
          port: process.env.DB_PORT
        },
        auth: {
          user: process.env.DB_USER,
          password: process.env.DB_PW
        }
      }
    },
  ],
};
