module.exports = {
  pathPrefix: "/portfolio",
  siteMetadata: {
    title: "Chris Frewin - Print Portfolio",
    author: "Chris Frewin",
    description: "Chris Frewin's Print Portfolio"
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Chris Frewin - Print Portfolio',
        short_name: 'Prints',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        display: 'minimal-ui',
        icon: 'src/assets/images/website-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // The unique name for each instance
        name: `images`,
        // Path to the directory
        path: `${__dirname}/src/assets/images/`,
      },
    },
    'gatsby-plugin-offline',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`
  ],
}
