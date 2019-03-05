import styled from "styled-components";

const Button = styled.div`
    display: inline-block;
    padding: 0.5rem 0.75rem;
    background-color: white;
    border-radius: 3px;
    font-family: ${props => props.theme.fontFamily};
    font-weight: bold;
    transition: 150ms all;
    ${props => props.theme.dropShadow.subtle}

    &:hover {
        cursor: pointer;
        color: white;
        background-color: ${props => props.theme.primary};
        ${props => props.theme.dropShadow.regular}
    }
`;

export default Button;