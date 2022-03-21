import React from "react";
import styled from "styled-components"
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const Workshop = () => {
    const data = useStaticQuery(graphql`
        query WorkshopQuery {
            allWorkshopJson {
                edges {
                    node {
                        alt
                        button
                        name
                        img {
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid    
                                }
                            }
                        }
                    }
                }
            }
        }
    `)

    function getWorkshop(data) {
        const workshopArray = []
        data.allWorkshopJson.edges.forEach((item, index) => {
            workshopArray.push(
                <div key = { index }>
                    <Img 
                        src={ item.node.childImageSharp.fluid.src }
                        fluid = { item.node.img.childImageSharp.fluid } 
                    />
                </div>
            )
        })
        return workshopArray;
    }

    return (
        <ProductsContainer>
            <ProductsHeading>Heading</ProductsHeading>
            <ProductsWrapper>{ getWorkshop(data) }</ProductsWrapper>
        </ProductsContainer>
    )
}

export default Workshop

const ProductsContainer = styled.div`
    min-height: 100vh;
    padding: 5rem calc((100vw - 1300px)/2);
    backgroundz: #fff;
    color:#fff;
`
const ProductsHeading = styled.div`
    font-size: clamp(1.2rem, 5vw, 3rem);
    text-align: center;
    margin-bottom: 5rem;
    color: #000;
`
const ProductsWrapper = styled.div``
