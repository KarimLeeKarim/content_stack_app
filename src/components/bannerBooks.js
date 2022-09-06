import React from 'react';
import styled from '@emotion/styled';
import { unit } from '../styles.js';
import { useSelector } from 'react-redux';

export const BannerBooks = () => {
    const { data: bannerBooks } = useSelector((state) => state.allBooks)

    return (
        <PageContainer>
            <h2 style={{ marginBottom: "50px" }}>{bannerBooks?.all_books_banner?.items[0]?.content_block[0].books_banner?.main_title}</h2>
            <BannerContainer>
                <div style={{ display: "flex", width: "80%" }}>
                    {bannerBooks?.all_books_banner?.items[0]?.content_block[0].books_banner.group?.map((el, index) => (
                        <BookOnSaleContainer key={index}>
                            <h4 style={{ marginBottom: "20px" }}>{el?.title_of_book}</h4>
                            <p style={{ margin: "0px" }}>{el?.description_of_book?.json.children[0]?.children[0]?.text}</p>
                            <b style={{ height: "50px" }}>{el?.description_of_book?.json.children[1]?.children[0]?.text}</b>
                            <div>
                                <img style={{ marginTop: "50px" }} src={`${el?.picture_of_bookConnection?.edges[0]?.node?.url}?width=100&height=150`} alt={el?.picture_of_bookConnection?.edges[0]?.node?.title} />
                            </div>
                        </BookOnSaleContainer>
                    ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: " lightgray", marginTop: "20px" }}>
                    <h2 style={{ marginTop: "20px" }}>{bannerBooks?.all_books_banner?.items[0]?.content_block[1].media.for_the_media}</h2>
                    {bannerBooks?.all_books_banner?.items[0]?.content_block[1].media.information.json.children?.map((el, index) => (
                        <BookOnSaleContainer key={index}>
                            <p style={{ marginBottom: "20px" }}>{el?.children[0].text}</p>
                        </BookOnSaleContainer>
                    ))}
                    {bannerBooks?.all_books_banner?.items[0]?.content_block[2].media.information.json.children?.map((el, index) => (
                        <BookOnSaleContainer key={index}>
                            <p style={{ marginBottom: "20px" }}>{el?.children[0].text}</p>
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
    alignItems: "center",
    flexDirection: "column"
});

const BookOnSaleContainer = styled.div({
    display: 'flex',
    flexDirection: "column",
    width: "50%"
});
