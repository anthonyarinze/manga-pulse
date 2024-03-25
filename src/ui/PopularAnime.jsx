import styled from "styled-components";
import { useGetPopularAnime } from "../api/anime/useGetPopularAnime";
import PopularTitles from "./PopularTitles";
import Loading from "./Loading";
import { StyledSectionHeader } from "./SectionHeader";

const StyledPopular = styled.section`
  gap: 12px;
  width: 100%;
  display: flex;
  overflow: scroll;
  min-height: 280px;
  align-items: center;
`;

const StyledLoading = styled.div`
  display: flex;
  align-self: center;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
`;

const Popular = () => {
  const { isLoading: isGettingPopular, error, data } = useGetPopularAnime();
  const type = "TV";

  if (isGettingPopular) {
    return (
      <>
        <StyledSectionHeader>Popular Titles</StyledSectionHeader>
        <StyledLoading>
          <Loading label="Loading Popular Titles..." />
        </StyledLoading>
      </>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <StyledSectionHeader>Popular Titles</StyledSectionHeader>
      <StyledPopular>
        {data &&
          data.map((anime, index) => (
            <PopularTitles
              key={index}
              link={anime.url}
              id={anime.mal_id}
              image={anime.webp}
              type={type}
              title={anime.title}
            />
          ))}
      </StyledPopular>
    </>
  );
};

export default Popular;
