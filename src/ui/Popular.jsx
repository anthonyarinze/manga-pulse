import styled from "styled-components";
import { useGetPopularAnime } from "../api/anime/useGetPopularAnime";
import Spinner from "../ui/Spinner";
import PopularTitles from "../ui/PopularTitles";
import Loading from "./Loading";
import { StyledSectionHeader } from "./SectionHeader";

const StyledPopular = styled.div`
  width: 100%;
  display: flex;
  overflow: scroll;
  min-height: 280px;
  gap: 12px;
  align-items: center;
`;

const Popular = () => {
  const { isLoading: isGettingPopular, error, data } = useGetPopularAnime();

  if (isGettingPopular) return <Spinner />;

  if (error) console.error(error.message);

  return (
    <>
      <StyledSectionHeader>Popular Titles</StyledSectionHeader>

      {isGettingPopular && <Loading label="Loading Popular Titles..." />}
      {error && <p>Error: {error.message}</p>}
      <StyledPopular>
        {data &&
          data.map((anime) => (
            <PopularTitles
              image={anime.webp}
              link={anime.url}
              title={anime.title}
              key={anime.mal_id}
            />
          ))}
      </StyledPopular>
    </>
  );
};

export default Popular;
