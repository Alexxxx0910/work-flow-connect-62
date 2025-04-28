
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-wfc-purple/10 to-white dark:from-wfc-purple/20 dark:to-gray-900 p-4">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-extrabold text-wfc-purple">404</h1>
        <h2 className="text-3xl font-bold mt-4">Página no encontrada</h2>
        <p className="mt-6 text-lg">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button className="mt-8 bg-wfc-purple hover:bg-wfc-purple-medium">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
