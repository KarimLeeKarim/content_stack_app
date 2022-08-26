import React from 'react';
import styled from '@emotion/styled';
import { unit, widths } from '../styles.js';
import Header from './header.js';
import Footer from './footer.js';
import { BannerBooks } from './bannerBooks.js';

const Layout = ({ fullWidth, grid, children }) => {
  return (
    <>
      <Header />
      <BannerBooks fullWidth={fullWidth} grid={grid} />
      <PageContainer fullWidth={fullWidth} grid={grid}>
        {children}
      </PageContainer>
      <Footer />
    </>
  );
};

export default Layout;

/** Layout styled components */
const PageContainer = styled.div((props) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: props.grid ? 'center' : 'top',
  flexDirection: props.grid ? 'row' : 'column',
  flexWrap: 'wrap',
  alignSelf: 'center',
  flexGrow: 1,
  maxWidth: props.fullWidth ? null : `${widths.regularPageWidth}px`,
  width: '100%',
  padding: props.fullWidth ? 0 : unit * 2,
  paddingBottom: unit * 5,
}));
