import styled from "styled-components";

// const infiniteScroll = keyframes`
//   from {
//     transform: "translateX(0)"
//   },
//   to {
//     transform: "translateX(-100%)"
//   }
// `;

const CardContainer = styled.div`
  width: 180px;
  height: 100%;
  cursor: pointer;
  min-width: 180px;
  overflow: hidden;
  margin-left: 10px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  color: white;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: flex-end;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
`;

const Title = styled.p`
  font-weight: 600;
  margin-bottom: 10px;
`;

const PopularTitles = ({ image, link, title }) => {
  const handleClick = () => {
    window.open(link, "_blank");
  };

  return (
    <CardContainer
      style={{ backgroundImage: `url(${image})` }}
      onClick={handleClick}
    >
      <CardContent>
        <Title>{title}</Title>
      </CardContent>
    </CardContainer>
  );
};

export default PopularTitles;
