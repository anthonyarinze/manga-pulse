import styled from "styled-components";
import { useGetPopularAnime } from "../api/useGetPopularAnime";
import Spinner from "../ui/Spinner";
import PopularTitles from "../ui/PopularTitles";

const StyledPopular = styled.div`
  height: 38%;
  width: 100%;
  display: flex;
  overflow: scroll;
  margin-top: 2rem;
  align-items: center;
  justify-content: space-around;
`;

const StyledHeading = styled.h3`
  font-size: 2.5rem;
  margin-top: 2rem;
  margin-left: 1.5rem;
`;

const Popular = () => {
  const { isLoading: isGettingPopular, error, data } = useGetPopularAnime();

  if (isGettingPopular) return <Spinner />;

  if (error) console.error(error.message);

  return (
    <>
      <StyledHeading>Popular Titles</StyledHeading>
      <StyledPopular>
        {data.map((anime) => (
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
