import styled from "styled-components";
import { useGetLibrary } from "../hooks/useGetLibrary";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import Heading from "../ui/Heading";

const StyledLibrary = styled.section`
  gap: 15px;
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 16px;
  flex-direction: column;

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledTitle = styled.div`
  //width: 100%; /* Full width on larger screens */
  display: flex;
  padding: 10px;
  cursor: pointer;
  min-height: 260px;
  border-radius: 4px;
  align-items: center;
  background-color: var(--color-grey-100);

  &:hover {
    background-color: #293238;
  }

  @media (min-width: 768px) {
    width: calc(50% - 7.5px); /* 50% width with 15px gap in between */
  }
`;

const StyledImage = styled.img`
  width: 40%;
  height: 100%;
  object-fit: fill;
  border-radius: 4px;
`;

const StyledData = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 1rem;
`;

const StyledSpan = styled.span`
  gap: 8px;
  max-lines: 1;
  display: flex;
  text-overflow: ellipsis;
`;

const Library = () => {
  const { isLoading, titles } = useGetLibrary();

  if (isLoading) return <Spinner />;
  if (!titles?.length) return <Empty resource="titles" />;
  const { episodes, id, media_type, rating, status, title_name, webp } = titles;

  return (
    <StyledLibrary>
      {titles.map((title, index) => (
        <StyledTitle key={index}>
          <StyledImage src={title.webp} alt="image" />
          <StyledData>
            <Heading as="h3">{title.title_name}</Heading>
            <StyledSpan>
              <p>{title.episodes}</p>
              <p>{title.rating}</p>
            </StyledSpan>
          </StyledData>
        </StyledTitle>
      ))}
    </StyledLibrary>
  );
};

export default Library;
