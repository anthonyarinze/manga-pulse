import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      display: flex;
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      max-lines: 1;
      font-size: 1.7rem;
      font-weight: 500;
      text-overflow: ellipsis;
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

    ${(props) =>
    props.as === "h5" &&
    css`
      gap: 4px;
      display: flex;
      font-size: 1.5rem;
      font-weight: 400;
      margin-top: 10px;
      align-items: center;
    `}
  line-height:1.4;
`;

export default Heading;
