import styled from "styled-components";

const StyledRecommendedCard = styled.div`
  position: relative;
  width: 200px;
  height: 240px;
  cursor: pointer;
  max-height: 250px;
  border-radius: 8px;
  background-color: red;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5); /* Adjust the opacity as needed */
    }
  }
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  color: white;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: flex-end;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
`;

const StyledTitle = styled.p`
  opacity: 1;
  font-weight: 600;
  overflow: hidden;
  margin-bottom: 10px;
  transition: opacity 0.2s ease;
`;

const StyledContent = styled.p`
  margin: 0;
  opacity: 0;
  display: none;
  font-size: 13px;
  max-height: 85%;
  overflow: scroll;
  text-overflow: ellipsis;
  transition: opacity 0.2s ease;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  &:hover ${StyledTitle} {
    display: block;
  }

  &:hover ${StyledContent} {
    opacity: 1;
    display: block;
  }
`;

const RecommendedCard = ({ id, url, webp, title, content }) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <StyledRecommendedCard
      style={{
        backgroundImage: `url(${webp})`,
      }}
      onClick={handleClick}
    >
      <Wrapper>
        <CardContent>
          <StyledTitle>{title}</StyledTitle>
          <StyledContent>{content}</StyledContent>
        </CardContent>
      </Wrapper>
    </StyledRecommendedCard>
  );
};

export default RecommendedCard;
