import styled from "styled-components";
import RecommendedCard from "../components/RecommendedAnimeCard";
import { useGetRecommendedAnime } from "../api/anime/useGetRecommendedAnime";
import Loading from "../ui/Loading";
import { useState } from "react";
import Popular from "./PopularAnime";
import ShowMoreLessButtons from "../components/ShowMoreLessButtons";
import { StyledSectionHeader } from "./SectionHeader";

const StyledSection = styled.section`
  width: 100vw;
  display: flex;
  align-items: start;
  flex-direction: column;
`;

const StyledAnimeRecommendations = styled.div`
  gap: 12px;
  width: 100%;
  padding: 8px;
  display: flex;
  overflow: scroll;
  align-items: center;
  justify-content: start;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const StyledButtons = styled.div`
  gap: 10px;
  padding: 10px;
  display: flex;
  margin-top: auto;
  justify-content: center;
`;

const StyledLoading = styled.div`
  display: flex;
  align-self: center;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
`;

const Anime = () => {
  const {
    isLoading: isGettingAnimeRecs,
    error,
    data: recommendedAnime,
  } = useGetRecommendedAnime();
  const [visibleRecommendations, setVisibleRecommendations] = useState(10);

  const handleLoadMore = () => {
    setVisibleRecommendations((prev) => prev + 10);
  };

  const handleShowLess = () => {
    setVisibleRecommendations((prev) => prev - 10);
  };

  if (isGettingAnimeRecs) {
    return (
      <>
        <StyledSectionHeader>Recommended Anime</StyledSectionHeader>
        <StyledLoading>
          <Loading label="" />
        </StyledLoading>
      </>
    );
  }

  if (error) {
    return <p>Error:{error}</p>;
  }

  return (
    <StyledSection>
      <Popular />
      <StyledSectionHeader>Recommended Anime</StyledSectionHeader>
      <StyledAnimeRecommendations>
        {recommendedAnime &&
          recommendedAnime.length > 0 &&
          recommendedAnime
            .slice(0, visibleRecommendations)
            .map((recommendation, index) => (
              <RecommendedCard
                key={index}
                id={recommendation.id}
                type={recommendation.type}
                webp={recommendation.webp}
                title={recommendation.title}
                content={recommendation.synopsis}
              />
            ))}
        {visibleRecommendations < (recommendedAnime?.length || 0) && (
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
      </StyledAnimeRecommendations>
    </StyledSection>
  );
};

export default Anime;
