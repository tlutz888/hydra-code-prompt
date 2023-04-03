import { useEffect, useState } from "react";
import { SERVER_PORT } from "../../utils/constants";

export const HomePageContent = ({ user }) => {
  const [userList, setUserList] = useState([]);
  // const [currentPage, setcurrentPage] = useState(1);
  // const [previousPage, setPreviousPage] = useState(null);
  // const [nextPage, setNextPage] = useState(null);
  // const [totalPages, setTotalPages] = useState(null);

  // const calculateTotalPages = ({ pageLength, totalCount }) => {
  //   return Math.ceil(totalCount / pageLength);
  // };

  useEffect(() => {
    let ignore = false;

    const fetchObjects = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(`${SERVER_PORT}/users?page=1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("data", data, "response", response);

        if (!response.ok || data.error) {
          const errorMessage = data.error || "unknown error in fetch objects";
          throw new Error(errorMessage);
        }

        if (!ignore) {
          setUserList(data.page);
          // setTotalPages();
        }
      } catch (error) {
        console.error("Error fetching objects:", error.message);
      }
    };

    fetchObjects();
    return () => {
      ignore = true;
    };
  }, []);

  if (!user) {
    return <section>Loading...</section>;
  }

  return (
    <section>
      hello, here is a list of users:
      <ul>
        {userList.map((user, i) => {
          return (
            <li>
              {user.username} - {user.tagline} {i}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
