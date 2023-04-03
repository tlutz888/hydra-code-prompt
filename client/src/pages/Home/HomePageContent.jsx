import { useEffect, useState } from "react";
import { DEFAULT_PAGE_SIZE, SERVER_PORT } from "../../utils/constants";
import styled from "styled-components";

const PaginationButton = styled.button`
  margin: 0.5rem;
  border-radius: 0.25rem;
  line-height: 1.5rem;
  height: 2rem;
  font-size: 1rem;
  width: 5rem;
`;

export const HomePageContent = ({ user }) => {
  const [userData, setUserData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasError, setHasError] = useState(false);

  const calculateTotalPages = ({
    pageSize = DEFAULT_PAGE_SIZE,
    totalCount,
  }) => {
    return Math.ceil(totalCount / pageSize);
  };

  useEffect(() => {
    let ignore = false;

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(
          `${SERVER_PORT}/users?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("data", data, "response", response);

        if (!response.ok || data.error) {
          const errorMessage = data.error || "unknown error in fetch objects";
          throw new Error(errorMessage);
        }

        if (!ignore) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching objects:", error.message);
        setHasError(true);
      }
    };

    fetchUsers();
    return () => {
      ignore = true;
    };
  }, [currentPage]);

  if (hasError) {
    return <section>Error loading users.</section>;
  }

  if (!userData) {
    return <section>Loading...</section>;
  }

  const totalPages = calculateTotalPages({
    totalCount: userData.total_count,
  });

  const onFirstPage = currentPage === 1;
  const onLastPage = currentPage === totalPages;

  const handlePreviousClick = () => {
    if (!onFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!onLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section>
      <h2>Users:</h2>
      {`Displaying results ${userData.page_start} through ${userData.page_end} of ${userData.total_count}.`}
      <div>
        <PaginationButton
          type="button"
          onClick={handlePreviousClick}
          disabled={onFirstPage}
        >
          previous
        </PaginationButton>
        <PaginationButton
          type="button"
          onClick={handleNextClick}
          disabled={onLastPage}
        >
          next
        </PaginationButton>
      </div>
      <ul>
        {userData.page.map((user) => {
          console.log("user", user);
          return (
            // TODO - make this it's own component
            <li>
              {user.username} - {user.tagline}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
