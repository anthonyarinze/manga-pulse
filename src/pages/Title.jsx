import styled from "styled-components";
import { useTitleDetails } from "../api/useTitleDetails";
import Spinner from "../ui/Spinner";
import { useParams } from "react-router-dom";

const StyledTitle = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
`;

const Title = () => {
  const { titleId, type } = useParams();
  const { isLoading, error, title } = useTitleDetails(type, titleId);

  if (isLoading) return <Spinner />;

  // display error
  // if(title)return

  console.log(title);

  return <StyledTitle>Title</StyledTitle>;
};

export default Title;
