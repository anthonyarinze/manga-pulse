import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  from {
    background-position: -200px 0;
  }
  to {
    background-position: calc(100%) 0;
  }
`;

const StyledSkeletonItem = styled.div`
  padding: 8px;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  font-size: 1.4rem;
  margin-bottom: 5px;
  border-radius: 8px;
  align-items: center;
  justify-content: start;
  text-overflow: ellipsis;
  animation: ${shimmer} 1.5s ease-in-out infinite alternate;
  background: #eee;
  background-image: linear-gradient(-90deg, #ddd 0%, #fff 50%, #ddd 100%);
  background-repeat: no-repeat;
  background-size: 200px 100%;
`;

const SkeletonItem = () => {
  return <StyledSkeletonItem />;
};

export default SkeletonItem;
