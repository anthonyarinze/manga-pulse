import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";

const FullPage = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
