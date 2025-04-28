
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "Por favor completa todos los campos",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-wfc-purple/10 to-white dark:from-wfc-purple/20 dark:to-gray-900 p-4">
      <div className="w-full max-w-md rounded-lg border shadow-sm bg-background p-8">
        <div className="flex flex-col items-center space-y-2 mb-8">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-md bg-wfc-purple flex items-center justify-center">
              <span className="text-white font-bold">WFC</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
          <p className="text-center text-muted-foreground text-sm">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link to="#" className="text-xs text-wfc-purple hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-wfc-purple hover:bg-wfc-purple-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-wfc-purple hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
