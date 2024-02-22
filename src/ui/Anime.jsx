import styled from "styled-components";
import { StyledSectionHeader } from "./SectionHeader";
import RecommendedCard from "../components/RecommendedAnimeCard";
import { useGetRecommendedAnime } from "../api/anime/useGetRecommendedAnime";
import Loading from "../ui/Loading";
import { useState } from "react";
import Popular from "./PopularAnime";
import ShowMoreLessButtons from "../components/ShowMoreLessButtons";

const StyledSection = styled.section`
  width: 100vw;
  display: flex;
  align-items: start;
  flex-direction: column;
`;

const StyledMainRecs = styled.div`
  gap: 12px;
  width: 100%;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const StyledButtons = styled.div`
  gap: 10px;
  padding: 10px;
  display: flex;
  margin-top: auto;
  justify-content: center;
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

  return (
    <StyledSection>
      <Popular />
      <StyledSectionHeader>
        Recommended Anime (don&apos;t ask me by whom)
      </StyledSectionHeader>
      <StyledMainRecs>
        {isGettingAnimeRecs && <Loading label="Loading Recommended Anime..." />}
        {error && <p>Error: {error.message}</p>}
        {recommendedAnime &&
          recommendedAnime.length > 0 &&
          recommendedAnime
            .slice(0, visibleRecommendations)
            .map((recommendation, index) => (
              <RecommendedCard
                key={index}
                id={recommendation.entries[0].mal_id}
                url={recommendation.entries[0].url}
                webp={recommendation.entries[0].webp}
                title={recommendation.entries[0].title}
                content={recommendation.content}
              />
            ))}
      </StyledMainRecs>
      {visibleRecommendations < (recommendedAnime?.length || 0) && (
        <StyledButtons>
          <ShowMoreLessButtons handleClick={handleLoadMore} text="Show More" />
          {visibleRecommendations > 10 && (
            <ShowMoreLessButtons
              handleClick={handleShowLess}
              text="Show Less"
            />
          )}
        </StyledButtons>
      )}
    </StyledSection>
  );
};

export default Anime;
