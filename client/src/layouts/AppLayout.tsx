
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api';
import { LoadingSpinner, NodeLink } from '../components';
import { Navigate } from 'react-router';

export const AppLayout = () =>  {

    const { data, isError, isLoading } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false,
    });


    if (isLoading) return <LoadingSpinner />;

    if (isError) {
        return <Navigate to={`/auth/login`} />
    }

    if (data) return (
        <>
            <NodeLink data={data} />
        </>
    )
}