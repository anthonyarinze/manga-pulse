import styled from "styled-components";
import { useGetPopularAnime } from "../api/useGetPopularAnime";
import Spinner from "../ui/Spinner";
import PopularTitles from "../ui/PopularTitles";
import Loading from "./Loading";

const StyledPopular = styled.div`
  height: 42%;
  width: 100%;
  display: flex;
  overflow: scroll;
  margin-top: 2rem;
  align-items: center;
`;

const StyledHeading = styled.h3`
  display: flex;
  margin-top: 2rem;
  font-size: 2.5rem;
  margin-left: 1.5rem;
  justify-content: center;
`;

const Popular = () => {
  const { isLoading: isGettingPopular, error, data } = useGetPopularAnime();

  if (isGettingPopular) return <Spinner />;

  if (error) console.error(error.message);

  return (
    <>
      <StyledHeading>Popular Titles</StyledHeading>

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
