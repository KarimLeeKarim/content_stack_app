import React, { useState } from 'react';
import { colors, widths } from '../styles';
import styled from '@emotion/styled';
import logo from '../assets/book.jpeg';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { BOOKS } from '../utils/grapQueries';
import { useDispatch, useSelector } from 'react-redux';
import { setNewListOfBooks } from '../store/slices/listOfBookSlice';
import { changerLanguage } from '../store/slices/currentPage';

const Header = ({ children }) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.currentPage.page)
  const languageDefinder = useSelector((state) => state.currentPage.language)
  const { fetchMore } = useQuery(BOOKS);

  const language = [
    {
      lang: "english",
      key: "en-us"
    },
    {
      lang: "русский",
      key: "ru"
    },
  ];

  const [option, setOption] = useState(languageDefinder === "ru" ? language[1].key : language[0].key);

  const changeLanguage = (e) => {
    setOption(e.target.value);
    dispatch(changerLanguage(e.target.value))
    fetchMore({
      variables: {
        locale: e.target.value,
        offset: count
      },
    }).then((fetchMoreResult) => {
      dispatch(setNewListOfBooks(fetchMoreResult?.data))
    })
  };

  return (
    <HeaderBar>
      <Container>
        <HomeButtonContainer>
          <HomeLink to={"/books"}>
            <HomeButton>
              <LogoContainer>
                <Logo src={logo} />
              </LogoContainer>
              <Title>
                <h3>Book Store</h3>
                <div>Book space academy</div>
              </Title>
            </HomeButton>
          </HomeLink>
          <LanguageChangerContainer>
            <label htmlFor="languages">{languageDefinder === "ru" ? "Выберите язык" : "Choose a language"}:</label>
            <select value={option} name="languages" onChange={changeLanguage}>
              {language.map((el, index) => (
                <option key={index} value={el.key}>{el.lang}</option>
              ))}
            </select>
          </LanguageChangerContainer>
        </HomeButtonContainer>
        {children}
      </Container>
    </HeaderBar>
  );
};

export default Header;

/** Header styled components */
const HeaderBar = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `solid 1px ${colors.pink.light}`,
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
  padding: '5px 30px',
  minHeight: 80,
  backgroundColor: 'white',
});

const Container = styled.div({
  width: `${widths.regularPageWidth}px`,
});

const HomeLink = styled(Link)({
  textDecoration: 'none',
});

const HomeButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  flex: 1,
});

const LanguageChangerContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const HomeButton = styled.div({
  display: 'flex',
  flexDirection: 'row',
  color: colors.text,
  alignItems: 'center',
  ':hover': {
    color: colors.primary,
  },
});

const LogoContainer = styled.div({ display: 'flex', alignSelf: 'center' });

const Logo = styled.img({
  height: 100,
  width: 100,
  marginRight: 8,
});

const Title = styled.div({
  display: 'flex',
  flexDirection: 'column',
  h3: {
    lineHeight: '1em',
    marginBottom: 0,
  },
  div: {
    fontSize: '0.9em',
    lineHeight: '0.8em',
    paddingLeft: 2,
  },
});
