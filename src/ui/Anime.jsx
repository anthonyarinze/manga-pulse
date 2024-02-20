import styled from "styled-components";
import { StyledSectionHeader } from "./SectionHeader";
import RecommendedCard from "../components/RecommendedCard";
import { useGetRecommendedAnime } from "../api/useGetRecommendedAnime";
import Loading from "../ui/Loading";

const StyledSection = styled.section`
  width: 100vw;
  height: 350px;
  display: flex;
  margin-top: 8rem;
  align-items: start;
  flex-direction: column;
`;

const StyledMainRecs = styled.div`
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Anime = () => {
  const { isLoading, error, data: recommendedAnime } = useGetRecommendedAnime();

  return (
    <StyledSection>
      <StyledSectionHeader>
        Recommended Anime (don't ask me by whom)
      </StyledSectionHeader>
      <StyledMainRecs>
        {isLoading && <Loading label="Loading Recommended Anime..." />}
        {error && <p>Error: {error.message}</p>}
        {recommendedAnime && recommendedAnime.length > 0 && (
          <>
            {recommendedAnime.map((recommendation, index) => (
              <RecommendedCard
                key={index}
                id={recommendation.entries[0].mal_id}
                url={recommendation.entries[0].url}
                webp={recommendation.entries[0].webp}
                title={recommendation.entries[0].title}
                content={recommendation.content}
              />
            ))}
          </>
        )}
      </StyledMainRecs>
    </StyledSection>
  );
};

export default Anime;
