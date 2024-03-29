import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export default function ProtectedRoute({ children }) {
    const auth = useAuth();
    if (!auth.user) return <Navigate to='/' replace />

    return (
        <>{children}</>
    )
}
