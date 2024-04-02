import styled from "styled-components";
import { StyledSectionHeader } from "./SectionHeader";
import { useGetPopularManga } from "../api/manga/useGetPopularManga";
import { useState } from "react";
import Loading from "./Loading";
import RecommendedMangaCard from "../components/RecommendedMangaCard";
import ShowMoreLessButtons from "../components/ShowMoreLessButtons";

const StyledSection = styled.section`
  width: 100vw;
  display: flex;
  align-items: start;
  flex-direction: column;
`;

const StyledMangaRecommendations = styled.div`
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

const Manga = () => {
  const {
    isLoading: isGettingManga,
    error,
    data: recommendedManga,
  } = useGetPopularManga();

  const [visibleRecommendations, setVisibleRecommendations] = useState(10);

  const handleLoadMore = () => {
    setVisibleRecommendations((prev) => prev + 10);
  };

  const handleShowLess = () => {
    setVisibleRecommendations((prev) => prev - 10);
  };

  if (isGettingManga) {
    return (
      <>
        <StyledSectionHeader>Recommended Manga</StyledSectionHeader>
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
      <StyledSectionHeader>Recommended Manga</StyledSectionHeader>
      <StyledMangaRecommendations>
        {recommendedManga &&
          recommendedManga.length > 0 &&
          recommendedManga
            .slice(0, visibleRecommendations)
            .map((recommendation, index) => (
              <RecommendedMangaCard
                key={index}
                id={recommendation.id}
                type={recommendation.type.toLowerCase()}
                webp={recommendation.webp}
                title={recommendation.title}
                content={recommendation.synopsis}
              />
            ))}
        {visibleRecommendations < (recommendedManga?.length || 0) && (
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
      </StyledMangaRecommendations>
    </StyledSection>
  );
};

export default Manga;
