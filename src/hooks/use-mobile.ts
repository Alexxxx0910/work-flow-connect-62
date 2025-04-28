
import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para comprobar si la pantalla es de tamaño móvil
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px es el breakpoint de Tailwind para md
    };

    // Comprobar al cargar
    checkIsMobile();

    // Agregar listener para redimensiones de ventana
    window.addEventListener('resize', checkIsMobile);

    // Limpiar listener
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}
