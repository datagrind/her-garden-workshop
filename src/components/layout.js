import * as React from "react"
import Header from "./Header"
import { GlobalStyle } from "./styles/GlobalStyles"

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Header css={`position:sticky; top:0;`}/>
      <main>{children}</main>
    </>
  )
}


export default Layout
