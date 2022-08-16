import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles';

const Footer = () => {
    return (
        <FooterContainer>
            2022 ©{' Books'}
        </FooterContainer>
    );
};

export default Footer;

/** Footer styled components */
const FooterContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.text,
    marginTop: 30,
    height: 200,
    padding: 20,
    backgroundColor: 'white',
    borderTop: `solid 1px ${colors.pink.light}`,
});
