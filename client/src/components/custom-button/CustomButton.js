import React from 'react';
// import './CustomButton.scss';
import {CustomButtonContainer} from './CustomButtonStyled';

const CustomButton = ({children, ...props}) => (
    <CustomButtonContainer {...props}>
        {children}
    </CustomButtonContainer>
);

export default CustomButton;