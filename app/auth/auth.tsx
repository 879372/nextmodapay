import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Auth(){
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/auth/login");
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);
  
    if (!isAuthenticated) {
      return null; // ou você pode retornar um loader
    }
}