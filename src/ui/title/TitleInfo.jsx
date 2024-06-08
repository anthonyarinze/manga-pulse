import { FaExternalLinkAlt } from "react-icons/fa";
import Heading from "../Heading";

const TitleInfo = ({ titleName, titleJapanese, handleTitleClick }) => (
  <>
    <Heading as="h2">
      {titleName}{" "}
      <FaExternalLinkAlt
        style={{ marginLeft: "6px", fontSize: "1.7rem", cursor: "pointer" }}
        onClick={handleTitleClick}
      />
    </Heading>
    <Heading as="h5">{titleJapanese}</Heading>
  </>
);

export default TitleInfo;
