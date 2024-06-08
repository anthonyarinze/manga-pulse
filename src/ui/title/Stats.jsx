import { FaBookmark, FaStar } from "react-icons/fa";
import Heading from "../Heading";
import { formatFavorites } from "../../utils/helpers";

const Stats = ({ episodes, status, score, favorites, rating, chapters }) => (
  <span>
    <Heading as="h5">
      <FaStar style={{ color: "gold" }} /> {score} <FaBookmark />
      {formatFavorites(favorites)}
    </Heading>
    <Heading as="h5">
      {episodes &&
        `${episodes} ${
          episodes > 1 ? "episodes" : "episode"
        } ● ${status}, ${rating}`}
      {chapters &&
        `${chapters} ${
          chapters > 1 ? "chapters" : "chapter"
        } | Status: ${status}`}
    </Heading>
  </span>
);

export default Stats;
