import styled from "styled-components";
import { StyledSectionHeader } from "./SectionHeader";
import RecommendedCard from "../components/RecommendedCard";
import { useGetRecommendedAnime } from "../api/useGetRecommendedAnime";
import Loading from "../ui/Loading";
import { useState } from "react";

const StyledSection = styled.section`
  width: 100vw;
  height: 350px;
  display: flex;
  margin-top: 8rem;
  align-items: start;
  flex-direction: column;
`;

const StyledMainRecs = styled.div`
  gap: 14px;
  width: 100%;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const StyledButtons = styled.div`
  gap: 10px;
  padding: 10px;
  display: flex;
  margin-top: auto;
  margin-left: 15px;
  justify-content: center;
`;

const ControlShowButton = styled.button`
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  color: var(--color-grey-800);
  background-color: var(--color-grey-100);
`;

const Anime = () => {
  const {
    isLoading: isGettingAnimeRecs,
    error,
    data: recommendedAnime,
  } = useGetRecommendedAnime();
  const [visibleRecommendations, setVisibleRecommendations] = useState(12);

  const handleLoadMore = () => {
    setVisibleRecommendations((prev) => prev + 12);
  };

  const handleShowLess = () => {
    setVisibleRecommendations((prev) => prev - 12);
  };

  return (
    <StyledSection>
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
          <ControlShowButton onClick={handleLoadMore}>
            Show More
          </ControlShowButton>
          {visibleRecommendations > 12 && (
            <ControlShowButton onClick={handleShowLess}>
              Show Less
            </ControlShowButton>
          )}
        </StyledButtons>
      )}
    </StyledSection>
  );
};

export default Anime;
