import styled from "styled-components";
import Loading from "../ui/Loading";
import PopularTitles from "../ui/PopularTitles";
import { useState } from "react";
import ShowMoreLessButtons from "./ShowMoreLessButtons";
import useRecommendedManga from "../api/manga/useGetRecommendationsById";
import { useParams } from "react-router-dom";

const StyledRecommendations = styled.div`
  gap: 10px;
  width: 100%;
  display: flex;
  overflow: scroll;
  min-height: 250px;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledLoading = styled.div`
  display: flex;
  align-self: center;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
`;

const StyledHeader = styled.h3`
  margin-top: 5rem;
  margin-bottom: 1.5rem;
`;

const StyledButtons = styled.div`
  gap: 10px;
  padding: 10px;
  display: flex;
  margin-top: auto;
  justify-content: center;
`;

const MangaRecommendationsById = ({ id }) => {
  const { isLoading, error, data } = useRecommendedManga(id);

  const { type } = useParams();

  const [visibleRecommendations, setVisibleRecommendations] = useState(10);

  const handleLoadMore = () => {
    setVisibleRecommendations((prev) => prev + 10);
  };

  const handleShowLess = () => {
    setVisibleRecommendations((prev) => prev - 10);
  };

  return (
    <>
      <StyledHeader>You may also like</StyledHeader>
      <StyledRecommendations>
        {isLoading && (
          <StyledLoading>
            <Loading label="Loading recommendations..." />
          </StyledLoading>
        )}
        {error && <p>Error: {error.message}</p>}
        {data &&
          data
            .slice(0, visibleRecommendations)
            .map((manga, index) => (
              <PopularTitles
                key={index}
                id={manga.id}
                image={manga.image_url}
                type={type}
                title={manga.title}
              />
            ))}
        {visibleRecommendations < (data?.length || 0) && (
          <StyledButtons>
            <ShowMoreLessButtons
              handleClick={handleLoadMore}
              text="Show More"
            />
            {visibleRecommendations > 10 && (
              <ShowMoreLessButtons
                handleClick={handleShowLess}
                text="Show Less"
              />
            )}
          </StyledButtons>
        )}
      </StyledRecommendations>
    </>
  );
};

export default MangaRecommendationsById;
