import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from '@emotion/styled';
import Stack from "../sdk/entry.js"
import {
    colors,
    IconBook,
    IconArrowLeft,
    IconView,
    IconStar
} from '../styles';
import ContentSection from './contentSection';
import Layout from './layout.js';
import MarkDown from './markDownContent';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { BOOKS } from '../utils/grapQueries.js';
import { setNewListOfBooks } from '../store/slices/listOfBookSlice.js';
import { languageActivator } from '../store/slices/currentPage.js';



export const DetailedCardPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const languageDefinder = useSelector((state) => state.currentPage.language);
    const currentPage = useSelector((state) => state.currentPage.page)
    const [data, setData] = useState([]);
    const idOfBook = location.pathname.split('/')[2];
    const { fetchMore } = useQuery(BOOKS);

    useEffect(() => {
        async function fetchData() {
            const result = await Stack.getSpecificEntry("landing_page_of_book", idOfBook, languageDefinder)
            console.log(`result`, result);
            setData(result);
        };
        fetchData();
    }, [setData]);

    const getBackMaingPage = () => {
        navigate(-1);
        fetchMore({
            variables: {
                locale: languageDefinder,
                offset: currentPage
            },
        }).then((fetchMoreResult) => {
            dispatch(setNewListOfBooks(fetchMoreResult?.data))
        })
        dispatch(languageActivator(true))
    };

    return <Layout grid>{
        data.map((el) => (
            console.log(`el`, el?.star_rating),
            <ContentSection key={el?.uid}>
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
                            <h4>{el?.page_details?.book_details}</h4>
                            <IconAndLabel>
                                <IconBook width="16px" />
                                <div>{el?.number_of_pages}</div>
                            </IconAndLabel>
                            <IconAndLabel>
                                <IconView width="16px" />
                                <div>
                                    <a style={{ textDecoration: 'none' }} href={`${el?.link_to_book_on_amazon?.href}`}>  Amazon</a>
                                </div>
                            </IconAndLabel>
                            <IconAndLabel>
                                <IconStar width="16px" />
                                <p style={{ margin: "2px 0 0 10px" }}>{el?.star_rating}</p>
                            </IconAndLabel>
                        </DetailItem>
                        <DetailItem>
                            <h4>{el?.page_details?.author}</h4>
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
    '#viewcurrentPage': {
        color: colors.pink.base,
    },
});