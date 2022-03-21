import * as React from "react"
import Hero from "../components/Hero"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Workshop from "../components/Workshop"

// Ivory#FFBF00, green #A8AAA1, gold #BBA55D
//floral store to sell single, seasonal bouquet, or floral subsciption plan/ page for workshop/ contact page for custom order/ link facebook to site/ philanthropy
//"Arrange a Mystical Fairy Garden"
//need page for: privacy, termsofservice, userdatadelete

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Hero/>
    <Workshop heading="Workshop"/>
  </Layout>
)

export default IndexPage
