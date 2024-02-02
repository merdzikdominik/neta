// Komponent ProtectedRoute
import React from 'react';
import { RouteProps as ReactRouteProps, Navigate } from 'react-router-dom';

interface ProtectedRouteProps extends Omit<ReactRouteProps, 'element'> {
  element: React.ReactElement;
  authenticated: boolean | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  authenticated,
  ...rest
}) => {
  if (authenticated === null) return null

  return authenticated ? (
    React.cloneElement(element, rest)
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default ProtectedRoute;
