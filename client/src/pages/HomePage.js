import './HomePage.scss';
import React from 'react';
import Directory from '../components/directory/Directory';
import {HomePageContainer} from './HomePageStyled';


const HomePage = () => {
    // throw Error;
    return (
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
    );
};

export default HomePage;