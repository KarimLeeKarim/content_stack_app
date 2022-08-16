import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from '@emotion/styled';
import Stack from "../sdk/entry.js"
import {
    colors,
    IconBook,
    IconArrowLeft,
    IconView
} from '../styles';
import ContentSection from './contentSection';
import Layout from './layout.js';
import MarkDown from './markDownContent';


export const DetailedCardPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const idOfBook = location.pathname.split('/')[2];
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await Stack.getSpecificEntry("landing_page_of_book", idOfBook, "en-us")
            setData(result);
        };
        fetchData();
    }, [setData]);

    const getBackMaingPage = () => {
        navigate("/books")
    };

    return <Layout grid>{
        data.map((el) => (
            <ContentSection>
                <Wrapper>
                    <IconArrowLeft onClick={getBackMaingPage} style={{ position: "absolute", left: '0', cursor: 'pointer' }} />
                    <CoverImage src={el?.file?.url} alt={el?.file?.filename} />
                </Wrapper>
                <TrackDetails>
                    <DetailRow>
                        <h1>{el?.title}</h1>
                    </DetailRow>
                    <DetailRow>
                        <DetailItem>
                            <h4>Book details</h4>
                            <IconAndLabel>
                                <IconBook width="16px" />
                                <div>{el?.number_of_pages} number of pages</div>
                            </IconAndLabel>
                            <IconAndLabel>
                                <IconView width="16px" />
                                <div>Buy now -
                                    <a style={{ textDecoration: 'none' }} href={`${el?.link_to_book_on_amazon?.href}`}>  Amazon</a>
                                </div>
                            </IconAndLabel>
                        </DetailItem>
                        <DetailItem>
                            <h4>Author</h4>
                            <AuthorName>{el?.author}</AuthorName>
                        </DetailItem>
                    </DetailRow>
                </TrackDetails>
                <MarkDown content={el?.description?.children[0]?.children[0]?.text} />
            </ContentSection>
        ))} </Layout >;
};

/** Track detail styled components */
const CoverImage = styled.img({
    objectFit: 'cover',
    maxHeight: 400,
    borderRadius: 4,
    marginBottom: 30,
});

const Wrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    position: "relative"
});

const TrackDetails = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    borderRadius: 4,
    marginBottom: 30,
    border: `solid 1px ${colors.silver.dark}`,
    backgroundColor: colors.silver.lighter,
    h1: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 5,
    },
    h4: {
        fontSize: '1.2em',
        marginBottom: 5,
        color: colors.text,
    },
});

const DetailRow = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
    marginBottom: 20,
    borderBottom: `solid 1px ${colors.silver.dark}`,
});

const DetailItem = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: colors.textSecondary,
    alignSelf: 'center',
});
const AuthorName = styled.div({
    lineHeight: '1em',
    fontSize: '1em',
});

const IconAndLabel = styled.div({
    display: 'flex',
    flex: 'row',
    alignItems: 'center',
    maxHeight: 20,
    width: '100%',
    div: {
        marginLeft: 8,
    },
    svg: {
        maxHeight: 16,
    },
    '#viewCount': {
        color: colors.pink.base,
    },
});