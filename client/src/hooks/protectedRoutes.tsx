import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './auth';

export function ProtectedRoutes() {
  const { cookies } = useAuth();
  return cookies.token ? <Outlet /> : <Navigate to="/login" />;
}
