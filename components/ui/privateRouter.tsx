// components/PrivateRoute.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PrivateRoute: React.FC<any> = ({ children }) => { // Ajustado para aceitar qualquer tipo de props
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redireciona para a página de login se não houver token
    }
  }, []);

  return <>{children}</>; // Aqui, estamos usando <>{children}</> para renderizar o conteúdo do componente
};

export default PrivateRoute;
