import React, { useState, useEffect, useMemo } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { FaRegLightbulb } from "react-icons/fa"
import { graphql, useStaticQuery } from "gatsby"


const Testimonials = () => {

    const data = useStaticQuery(graphql`
        query MyQuery {
            allFile(
                filter: {ext: {regex: "/(jpg)|(png)|(jpeg)/"}, name: {in: ["106422376_10222822879458730_2788815466418489451_n","122524429_1971417439661955_1777708477511030956_n"]}}
            ) {
                edges {
                    node {
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    `)
    const [photos] = useState(data);

    const [comments, setComments] = useState([]);
    
   
    const memoComment = useMemo(() => 
        [
            {
                "name": "Ntxoo Lee"
                ,"comment": 
                    <p>
                        "My sister's and I had a wonderful experience at Her's Garden Workshop. 
                        Melanie is an amazing host and organizer. She knows her succulent species, 
                        she'll educate how to care for your succulents before leaving her workshop. 
                        I highly recommend Her's Garden Workshop to everyone, whether it's a get together 
                        or things to do in town with families and friends.
                        <br/>
                        <br/>
                        Thank you Melanie 😊 💓"
                    </p>
            }
            ,{
                "name": "Ka Xiong"
                ,"comment": 
                    <p>
                        "The workshop was so much fun and so relaxing! 
                        Melanie does a great at teaching you everything that there is to know 
                        about your plants. Her workshops are a must do with your family and friends! 
                        Will definitely be going back and doing another workshop soon!"
                    </p>
            }
        ]
    , []);

    const mapPhotos = photos.allFile.edges.map((image,key) => (
        <Images 
            key={ key } 
            fluid={ image.node.childImageSharp.fluid } 
        />
    )); 

    const mapComments = comments.map((com, key) =>(
        <>
            <h3 key={ "h3"+key }>{ com.name }</h3>
            <p key={ "p"+key }>{ com.comment }</p>
        </>
    ));

    useEffect(() => {
        setComments( memoComment );
    }, [memoComment,data])

    
    if (photos){
        return (
            <TestimonialsContainer>
                <TopLine>
                    Testimonials
                </TopLine>
                <Description>
                    What People Are Saying
                </Description>
                <ContentWrapper>
                    <ColumnOne>
                        <Testimonial>
                            <IoMdCheckmarkCircleOutline 
                                css={`
                                    color: #3fffa8;
                                    font-size: 2rem;
                                    margin-bottom: 1rem;
                                `}
                            />
                            { mapComments[0] }
                            { console.log(mapComments.length + "from mapComments") }
                        </Testimonial>
                        <Testimonial>
                            <FaRegLightbulb 
                                css={`
                                    color: #f9b19b;
                                    font-size: 2rem;
                                    margin-bottom: 1rem;
                                `}
                            />
                            { mapComments[1] }
                        </Testimonial>
                    </ColumnOne>
                    <ColumnTwo>
                        { mapPhotos }
                    </ColumnTwo>
                </ContentWrapper>
            </TestimonialsContainer>
        )
    }
    return (
        <div>Testimonials</div>
    )
}
    

export default Testimonials;

const TestimonialsContainer = styled.div`
    width: 100%;
    background: #fcfcfc;
    color: #000;
    padding: 5rem calc((100vw - 1300px)/2);
    height: 100%;
`

const TopLine = styled.p`
    color: #077bf1;
    font-size: 1rem;
    padding-left: 2rem;
    margin-bottom: 0.75rem;
`

const Description = styled.p`
    text-align: start;
    padding-left: 2rem;
    margin-bottom: 4rem;
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: bold;
`

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 0 2rem;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

const ColumnOne = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;

`

const Testimonial = styled.div`
    padding-top: 1rem;
    padding-right: 2rem;

    h3{
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-style: italic;
    }

    p {
        color: #3b3b3b;
    }
`

const ColumnTwo = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-top: 2rem;
    grid-gap: 10px;     

    @media screen and (max-width: 768px){
        grid-template-columns: 1fr;
    }
`

const Images = styled(Img)`
    border-radius: 10px;
    // height: 100%;
    width: 100%;
`
