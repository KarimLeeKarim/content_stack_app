import React from 'react';
import styled from '@emotion/styled';
import { colors, mq } from '../styles';
import { useNavigate } from 'react-router';

const TrackCard = ({ cards }) => {
    const navigate = useNavigate();

    const getUid = (card) => {
        navigate(`${card?.reference_of_landing_pageConnection?.edges[0]?.node?.system?.uid}`)
    };

    return (
        <CardContainer
            onClick={() => getUid(cards)}
        >
            <CardContent>
                <CardImageContainer>
                    <CardImage
                        src={`${cards?.smaller_cover_image_of_bookConnection?.edges[0]?.node?.url}?width=350&height=320`}
                    />
                </CardImageContainer>
                <CardBody>
                    <CardTitle>{cards?.title}</CardTitle>
                </CardBody>
            </CardContent>
        </CardContainer>
    );
};

export default TrackCard;

/** Track Card styled components */
const CardContainer = styled.div({
    borderRadius: 6,
    color: colors.text,
    backgroundSize: '200px 100px',
    backgroundColor: 'white',
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [mq[0]]: {
        width: '90%',
    },
    [mq[1]]: {
        width: '47%',
    },
    [mq[2]]: {
        width: '31%',
    },
    height: 320,
    margin: 10,
    overflow: 'hidden',
    position: 'relative',
    ':hover': {
        backgroundColor: 'rgba(0,0,150,0.20)',
    },
    cursor: 'pointer',
});

const CardContent = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
});

const CardTitle = styled.h3({
    textAlign: 'center',
    fontSize: '1.4em',
    lineHeight: '1em',
    fontWeight: 700,
    color: colors.text,
    flex: 1,
});

const CardImageContainer = styled.div({
    height: 250,
    position: 'relative',
    '::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

const CardImage = styled.img({
    objectFit: 'cover',
    width: '100%',
    height: '100%',
});

const CardBody = styled.div({
    padding: 18,
    flex: 1,
    display: 'flex',
    color: colors.textSecondary,
    flexDirection: 'column',
    justifyContent: 'space-around',
});
