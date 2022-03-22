import React from "react";
import styled from "styled-components"
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Button } from './Button'
import { ImLocation } from "react-icons/im"

const Workshop = ({ heading }) => {
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
                <ProductsCard key = { index }>
                    <ProductsImg 
                        src={ item.node.img.childImageSharp.fluid.src }
                        alt ={ item.node.alt}
                        fluid = { item.node.img.childImageSharp.fluid } 
                    />
                    <ProductsInfo>
                        <TextWrap>
                            <ImLocation/>
                            <ProductsTitle>{ item.node.name }</ProductsTitle>
                        </TextWrap>
                        <Button 
                            to="/workshop" 
                            primary="true" 
                            round="true" 
                            css={ `
                                position: absolute; 
                                top: 420px; 
                                font-size: 14px;
                            `}
                        >
                            { item.node.button }
                        </Button>
                    </ProductsInfo>
                </ProductsCard>
            )
        })
        return workshopArray;
    }

    return (
        <ProductsContainer>
            <ProductsHeading>{ heading }</ProductsHeading>
            <ProductsWrapper>{ getWorkshop(data) }</ProductsWrapper>
        </ProductsContainer>
    )
}

export default Workshop

const ProductsContainer = styled.div`
    min-height: 100vh;
    padding: 5rem calc((100vw - 1300px)/2);
    color:#fff;
`
const ProductsHeading = styled.div`
    font-size: clamp(1.2rem, 5vw, 3rem);
    text-align: center;
    margin-bottom: 5rem;
    color: #000;
`
const ProductsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 10px;
    justify-items: center;
    padding: 0 2rem;

    @media screen and (max-width: 1200px) {
        grid-tempalte-columns: 1fr 1fr;
    }

    @media screen and (max-width: 868px) {
        grid-template-columns: 1fr;
    }
`

const ProductsCard = styled.div`
    line-height: 2;
    width: 100%;
    height: 500px;
    position: relative;
    border-radius: 10px;
    transition: 0.2s ease;
`

const ProductsImg = styled(Img)`
    height: 100%;
    max-width: 100%;
    position: relative;
    border-radius: 10px;
    filter: brightness(70%);
    transition: 0.4s cubic-bezier(0.75, 0.82, 0.165, 1);

    &:hover {
        filter: brightness(100%);
    }
`

const ProductsInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 2rems;

    @media screen and (max-width: 280px){
        padding: 0 1rem;
    }
`

const TextWrap = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 375px;
`

const ProductsTitle = styled.div`
    font-weight: 400;
    font-size: 1rem;
    margin-left: 0.5rem;
`

