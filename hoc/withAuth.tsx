import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/auth/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
