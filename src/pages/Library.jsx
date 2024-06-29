import styled from "styled-components";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import { useGetLibrary } from "../api/useGetLibrary";
import { useState } from "react";
import Pagination from "../ui/Pagination";
import LibrarySynopsis from "../ui/library/LibrarySynopsis";
import LibraryStats from "../ui/library/LibraryStats";
import LibraryName from "../ui/library/LibraryName";
import LibraryImage from "../ui/library/LibraryImage";
import LibraryHeader from "../ui/library/LibraryHeader";
import StyledTitleCard from "../ui/components/StyledTitleCard";

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

const ITEMS_PER_PAGE = 10;

const Library = () => {
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
      <LibraryHeader
        heading="Library"
        selectedStatus={selectedStatus}
        handleStatusChange={handleStatusChange}
      />

      <StyledLibrary>
        {currentTitles.map((title) => (
          <StyledTitleCard
            key={title.id}
            to={`/title/${title.media_type.toLowerCase()}/${title.id}`}
          >
            <LibraryImage webp={title.webp} />
            <StyledData>
              {/* name */}
              <LibraryName name={title.title_name} />

              {/* stats */}
              <LibraryStats
                episodes={title.episodes}
                chapters={title.chapters}
                status={title.status}
                score={title.score}
              />

              {/* synopsis */}
              <LibrarySynopsis synopsis={title.synopsis} />
            </StyledData>
          </StyledTitleCard>
        ))}

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </StyledLibrary>
    </>
  );
};

export default Library;
