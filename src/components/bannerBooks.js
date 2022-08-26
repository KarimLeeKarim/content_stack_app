import React from 'react';
import styled from '@emotion/styled';
import { unit, widths } from '../styles.js';
import { useSelector } from 'react-redux';

export const BannerBooks = () => {
    const { data: bannerBooks } = useSelector((state) => state.allBooks)

    return (
        <PageContainer>
            <h1 style={{ marginBottom: "50px" }}>{bannerBooks?.all_books_banner?.items[0]?.title}</h1>
            <BannerContainer>
                <div style={{ display: "flex", width: "80%" }}>
                    {bannerBooks?.all_books_banner?.items[0]?.group?.map((el, index) => (
                        <BookOnSaleContainer key={index}>
                            <h4 style={{ marginBottom: "20px" }}>{el?.title_of_book}</h4>
                            <p style={{ margin: "0px" }}>{el?.description_of_book?.json[0]?.children[0]?.children[0]?.text}</p>
                            <b style={{ height: "50px" }}>{el?.description_of_book?.json[0]?.children[1]?.children[0]?.text}</b>
                            <div>
                                <img style={{ marginTop: "50px" }} src={`${el?.picture_of_bookConnection?.edges[0]?.node?.url}?width=100&height=150`} alt={el?.picture_of_bookConnection?.edges[0]?.node?.title} />
                            </div>
                        </BookOnSaleContainer>
                    ))}
                </div>
            </BannerContainer>
        </PageContainer>
    );
};


// /** Layout styled components */
const PageContainer = styled.div((props) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: props.grid ? 'center' : 'top',
    flexDirection: props.grid ? 'row' : 'column',
    flexWrap: 'wrap',
    alignSelf: 'center',
    flexGrow: 1,
    width: '100%',
    padding: props.fullWidth ? 0 : unit * 2,
    paddingBottom: unit * 5,
    textAlign: "center",
    backgroundColor: "gray"
}));

const BannerContainer = styled.div({
    display: 'flex',
    justifyContent: "center",
});

const BookOnSaleContainer = styled.div({
    display: 'flex',
    flexDirection: "column",
    width: "50%"
});
