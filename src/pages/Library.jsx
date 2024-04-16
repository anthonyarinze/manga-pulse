import styled from "styled-components";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import Heading from "../ui/Heading";
import { FaStar, FaTags } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetLibrary } from "../api/useGetLibrary";
import { useState } from "react";
import Pagination from "../ui/Pagination";
import StatusFilter from "../ui/StatusFilter";

const StyledLibrary = styled.section`
  gap: 15px;
  width: 100vw;
  height: 100%;
  display: flex;
  margin-bottom: 10px;
  padding: 1rem 2rem;
  flex-direction: column;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledTitle = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;
  min-height: 240px;
  border-radius: 4px;
  align-items: center;
  background-color: var(--color-grey-100);

  &:hover {
    background-color: #293238;
  }

  @media (min-width: 768px) {
  }
`;

const StyledImage = styled.img`
  width: 35%;
  height: 100%;
  object-fit: fill;
  border-radius: 4px;
`;

const StyledData = styled.div`
  gap: 4px;
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 1rem;
  align-items: start;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledSpan = styled.span`
  gap: 4px;
  font-size: 15px;
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
`;

const StyledStatus = styled.div`
  gap: 7px;
  display: flex;
  padding: 2px 5px;
  font-weight: 600;
  font-size: smaller;
  align-items: center;
  border-radius: 2.5px;
  justify-content: center;
  background-color: var(--color-grey-300);
`;

const StyledSynopsis = styled.p`
  max-width: 95%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const StyledSpace = styled.div`
  height: 1rem;
`;

const StyledTitleName = styled.p`
  max-width: 95%;
  overflow: hidden;
  font-weight: 500;
  font-size: 1.7rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const StyledHeaderSpan = styled.span`
  display: flex;
  padding: 0px 2rem;
  align-items: center;
  justify-content: space-between;
`;

const ITEMS_PER_PAGE = 10;

const Library = () => {
  const navigate = useNavigate();
  const { isLoading, titles } = useGetLibrary();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedSatus] = useState("All");

  if (isLoading) return <Spinner />;
  if (!titles?.length) return <Empty resource="titles" />;

  let filteredTitles = titles;
  if (selectedStatus !== "All") {
    filteredTitles = titles.filter((title) => title.status === selectedStatus);
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTitles = filteredTitles.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredTitles.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (status) => {
    setSelectedSatus(status);
    setCurrentPage(1); //Reset current page when status changes;
  };

  return (
    <>
      <StyledHeaderSpan>
        <Heading as="h4" style={{ margin: "1rem 0rem" }}>
          Library
        </Heading>
        <StatusFilter
          selectedStatus={selectedStatus}
          onSelectStatus={handleStatusChange}
        />
      </StyledHeaderSpan>

      <StyledLibrary>
        {currentTitles.map((title, index) => (
          <StyledTitle
            key={index}
            onClick={() =>
              navigate(`/title/${title.media_type.toLowerCase()}/${title.id}`)
            }
          >
            <StyledImage src={title.webp} alt="image" />
            <StyledData>
              <StyledTitleName>{title.title_name}</StyledTitleName>
              <StyledSpan>
                <p>{title.media_type === "Manga" ? "Manga" : "Anime"} | </p>
                <FaStar style={{ color: "gold" }} />
                <p>{title.score}</p>
              </StyledSpan>
              <StyledSpan>
                {title.episodes && `${title.episodes} episodes`}
                {title.chapters && `${title.chapters} chapters`}
                <StyledStatus>
                  <FaTags /> {title.status}
                </StyledStatus>
              </StyledSpan>
              <StyledSynopsis>{title.synopsis}</StyledSynopsis>
            </StyledData>
          </StyledTitle>
        ))}

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <StyledSpace />
      </StyledLibrary>
    </>
  );
};

export default Library;
