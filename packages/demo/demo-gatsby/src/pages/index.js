import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { useCMSForm } from "@forestryio/cms-react"

function BlogIndex(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const [styles] = useCMSForm({
    name: "blog-index-styles",
    initialValues: {
      backgroundColor: "",
    },
    fields: [
      {
        name: "backgroundColor",
        label: "Heading Color",
        component: "color",
        colorFormat: "HeX",
      },
      { name: "hideBio", label: "Hide Bio", component: "toggle" },
    ],
    onSubmit() {
      alert("Saving doesn't do anything.")
    },
  })

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="All posts" />
      {!styles.hideBio && <Bio />}
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
                ...styles,
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
          }
        }
      }
    }
  }
`