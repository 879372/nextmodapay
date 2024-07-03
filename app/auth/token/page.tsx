'use client'
import { useEffect, useState } from 'react';

const SomeComponent = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Recupera o token do localStorage
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <div>
      {token ? (
        <p>{token}</p>
      ) : (
        <p>No token found</p>
      )}
    </div>
  );
};

export default SomeComponent;
