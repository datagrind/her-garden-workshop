import React, { useState }from "react";
import styled from "styled-components"
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Button } from './Button'
import { ImLocation } from "react-icons/im"
import { onExpandCard } from "./scripts/ExpandCards";

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
    
    const [photos, setPhotos] = useState( data );

    const mapPhotos = photos.allWorkshopJson.edges.map((photo)=>(
        photo
    ));

    function getWorkshop() {
        return mapPhotos.map((item, index) => (
            <ProductsCard 
                key = { index } 
                className={ (index==0)?"panel active":"panel" }  
                onClick={ onExpandCard }
            >
                <ProductsImg 
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
                            bottom: 20px; 
                            left: 20px;
                            font-size: 14px;
                        `}
                    >
                        { item.node.button }
                    </Button>
                </ProductsInfo>
            </ProductsCard>
        ));
    }

    return (
        <ProductsContainer>
            <ProductsHeading>{ heading }</ProductsHeading>
            <ProductsWrapper>{ getWorkshop() }</ProductsWrapper>
        </ProductsContainer>
    )
}

export default Workshop

const ProductsContainer = styled.div`
    min-height: 100vh;
    padding: 5rem calc((100vw - 1300px)/2);
    color:#fff;

    .panel {
        background-size: auto 100%;
        background-position: center;
        background-repeat: no-repeat;
        height: 100vh;
        width: 100%;
        // color: white;
        cursor: pointer;
        border-radius: 50px;
        flex: 1;
        margin: 10px;
        transition: flex 0.7s ease-in;
    }
      
    .panel.active {
        flex: 3;
    }

`
const ProductsHeading = styled.div`
    font-size: clamp(1.2rem, 5vw, 3rem);
    text-align: center;
    margin-bottom: 5rem;
    color: #000;
`
const ProductsWrapper = styled.div`
    display: flex;
    justify-items: center;
    padding: 0 2rem;

    // @mobile screen {
    //     display: block;
    // }
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
    // display: block;  
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

    @media screen and (max-width: 375px){
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

