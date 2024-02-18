import styled, { keyframes } from "styled-components";
import { useGetPopularAnime } from "../api/useGetPopularAnime";
import Spinner from "../ui/Spinner";
import PopularTitles from "../ui/PopularTitles";

const StyledDashboard = styled.div`
  width: 100dvw;
  height: 100dvh;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledPopular = styled.div`
  height: 38%;
  width: 100vw;
  display: flex;
  margin-top: 2rem;
  align-items: center;
  overflow: scroll;
  justify-content: space-around;
`;

const Dashoard = () => {
  const { isLoading: isGettingPopular, error, data } = useGetPopularAnime();

  if (isGettingPopular) return <Spinner />;

  if (error) console.error(error.message);

  return (
    <StyledDashboard>
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
    </StyledDashboard>
  );
};

export default Dashoard;
