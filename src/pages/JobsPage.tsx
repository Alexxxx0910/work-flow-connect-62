
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { JobCard } from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobType } from '@/contexts/JobContext';

const JobsPage = () => {
  const { jobs: dataJobs, loading, jobCategories } = useData();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);

  useEffect(() => {
    // Convert DataContext jobs to JobContext compatible format
    const formattedJobs = dataJobs.map(job => ({
      ...job,
      likes: job.likes || [],
      comments: job.comments || [],
      status: job.status || 'open'
    })) as JobType[];
    
    let results = formattedJobs;
    
    if (searchQuery) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (categoryFilter !== 'all') {
      results = results.filter(job => job.category === categoryFilter);
    }
    
    setFilteredJobs(results);
  }, [dataJobs, searchQuery, categoryFilter]);

  if (loading) {
    return <MainLayout>Cargando...</MainLayout>;
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold dark:text-white">Explorar Trabajos</h1>
          {currentUser?.role === 'client' && (
            <Link to="/jobs/create">
              <Button>Publicar un Trabajo</Button>
            </Link>
          )}
        </div>

        <div className="mb-4 flex space-x-2">
          <Input 
            type="text" 
            placeholder="Buscar trabajos..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <Select onValueChange={setCategoryFilter} defaultValue={categoryFilter}>
            <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="all" className="dark:text-white dark:focus:text-white dark:focus:bg-gray-700">
                Todas las categorías
              </SelectItem>
              {jobCategories.map(category => (
                <SelectItem 
                  key={category} 
                  value={category} 
                  className="dark:text-white dark:focus:text-white dark:focus:bg-gray-700"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          {categoryFilter !== 'all' && (
            <Badge variant="secondary" className="mr-2 mb-2 dark:bg-gray-700 dark:text-white">
              {categoryFilter}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setCategoryFilter('all')} />
            </Badge>
          )}
        </div>
          
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No se encontraron propuestas con los criterios seleccionados</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default JobsPage;
