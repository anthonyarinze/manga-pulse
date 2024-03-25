import styled from "styled-components";
import StyledCardLink from "../components/StyledCardLink";

const CardContainer = styled.div`
  width: 180px;
  height: 95%;
  cursor: pointer;
  overflow: hidden;
  min-width: 180px;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
    &::before {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: "";
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: flex-end;
  color: var(--color-grey-800);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
`;

const Title = styled.p`
  font-weight: 600;
  margin-bottom: 10px;
`;

const PopularTitles = ({ id, image, type, title }) => {
  return (
    <StyledCardLink to={`/title/${type}/${id}`}>
      <CardContainer style={{ backgroundImage: `url(${image})` }}>
        <CardContent>
          <Title>{title}</Title>
        </CardContent>
      </CardContainer>
    </StyledCardLink>
  );
};

export default PopularTitles;
