/**
 * Servicio de Gestión de Trabajos
 * 
 * Este servicio proporciona funcionalidades temporales para gestionar trabajos
 * mientras se implementa un backend personalizado.
 */

import { apiRequest } from './api';
import { UserType } from '@/contexts/DataContext';
import { JobType, CommentType, ReplyType } from '@/contexts/JobContext';

// Estado local para almacenar trabajos (simulando una base de datos)
let JOBS: JobType[] = [
  {
    id: "job1",
    title: "Desarrollo de sitio web responsive",
    description: "Necesitamos desarrollar un sitio web responsive para nuestra empresa. El sitio debe ser moderno, rápido y fácil de usar.",
    budget: 1500,
    category: "Desarrollo Web",
    skills: ["JavaScript", "React", "HTML/CSS"],
    userId: "user3",
    userName: "Empresa ABC",
    userPhoto: "https://logo.clearbit.com/acme.com",
    status: "open",
    timestamp: Date.now() - 86400000 * 5, // 5 días atrás
    comments: [],
    likes: [],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "job2",
    title: "Diseño de interfaz para aplicación móvil",
    description: "Buscamos un diseñador UX/UI para crear la interfaz de nuestra nueva aplicación móvil de fitness.",
    budget: 1200,
    category: "Diseño UX/UI",
    skills: ["UI Design", "UX Research", "Figma"],
    userId: "user3",
    userName: "Empresa ABC",
    userPhoto: "https://logo.clearbit.com/acme.com",
    status: "open",
    timestamp: Date.now() - 86400000 * 3, // 3 días atrás
    comments: [],
    likes: [],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

// Mapa para almacenar trabajos guardados por usuario
const SAVED_JOBS: Record<string, string[]> = {
  "user1": ["job2"],
  "user2": ["job1"]
};

/**
 * Obtener todos los trabajos
 */
export const getAllJobs = async (): Promise<JobType[]> => {
  try {
    // Try to get jobs from API first
    const response = await apiRequest('/jobs');
    if (response && response.jobs && Array.isArray(response.jobs)) {
      console.log('Jobs from API:', response.jobs);
      
      // Convert API response to JobType format
      return response.jobs.map((job: any) => ({
        id: job.id,
        title: job.title,
        description: job.description,
        budget: job.budget,
        category: job.category,
        skills: job.skills || [],
        status: job.status,
        userId: job.userId,
        userName: job.user?.name || "Usuario",
        userPhoto: job.user?.photoURL,
        timestamp: new Date(job.createdAt).getTime(),
        comments: job.comments || [],
        likes: job.likes || [],
        createdAt: job.createdAt,
        updatedAt: job.updatedAt
      }));
    }
  } catch (error) {
    console.error("Error al obtener trabajos desde la API:", error);
    console.log("Usando datos locales como respaldo");
  }
  
  // Fallback to local data
  return [...JOBS];
};

/**
 * Obtener un trabajo por su ID
 */
export const getJobById = async (jobId: string): Promise<JobType | null> => {
  try {
    // Try to get job from API first
    const response = await apiRequest(`/jobs/${jobId}`);
    if (response && response.job) {
      const job = response.job;
      return {
        id: job.id,
        title: job.title,
        description: job.description,
        budget: job.budget,
        category: job.category,
        skills: job.skills || [],
        status: job.status,
        userId: job.userId,
        userName: job.user?.name || "Usuario",
        userPhoto: job.user?.photoURL,
        timestamp: new Date(job.createdAt).getTime(),
        comments: job.comments || [],
        likes: job.likes || [],
        createdAt: job.createdAt,
        updatedAt: job.updatedAt
      };
    }
  } catch (error) {
    console.error("Error al obtener trabajo desde la API:", error);
    console.log("Usando datos locales como respaldo");
  }
  
  // Fallback to local data
  const job = JOBS.find(job => job.id === jobId);
  return job ? { ...job } : null;
};

/**
 * Crear un nuevo trabajo
 */
export const createJob = async (jobData: Omit<JobType, "id" | "timestamp" | "comments" | "likes">): Promise<JobType> => {
  try {
    // Try to create job via API first
    const response = await apiRequest('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData)
    });
    
    if (response && response.job) {
      const job = response.job;
      const newJob: JobType = {
        id: job.id,
        title: job.title,
        description: job.description,
        budget: job.budget,
        category: job.category,
        skills: job.skills || [],
        status: job.status,
        userId: job.userId,
        userName: job.user?.name || jobData.userName,
        userPhoto: job.user?.photoURL || jobData.userPhoto,
        timestamp: new Date(job.createdAt).getTime(),
        comments: [],
        likes: [],
        createdAt: job.createdAt,
        updatedAt: job.updatedAt
      };
      
      // Update local cache
      JOBS = [...JOBS, newJob];
      return newJob;
    }
  } catch (error) {
    console.error("Error al crear trabajo en la API:", error);
    console.log("Usando almacenamiento local como respaldo");
  }
  
  // Fallback to local data creation
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const newJob: JobType = {
    ...jobData,
    id: `job${Date.now()}`,
    timestamp: Date.now(),
    comments: [],
    likes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  JOBS = [...JOBS, newJob];
  return { ...newJob };
};

/**
 * Actualizar un trabajo existente
 */
export const updateJob = async (jobId: string, jobData: Partial<JobType>): Promise<JobType> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = JOBS.findIndex(job => job.id === jobId);
  if (index === -1) {
    throw new Error('Trabajo no encontrado');
  }
  
  JOBS[index] = { ...JOBS[index], ...jobData };
  return { ...JOBS[index] };
};

/**
 * Eliminar un trabajo
 */
export const deleteJob = async (jobId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const initialLength = JOBS.length;
  JOBS = JOBS.filter(job => job.id !== jobId);
  
  return JOBS.length < initialLength;
};

/**
 * Añadir un comentario a un trabajo
 */
export const addCommentToJob = async (jobId: string, content: string, user: UserType): Promise<CommentType> => {
  try {
    // Try to add comment via API first
    const response = await apiRequest(`/jobs/${jobId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content })
    });
    
    if (response && response.comment) {
      const comment = response.comment;
      return {
        id: comment.id,
        jobId,
        userId: user.id,
        userName: user.name,
        userPhoto: user.photoURL,
        content,
        timestamp: new Date(comment.createdAt).getTime(),
        replies: []
      };
    }
  } catch (error) {
    console.error("Error al añadir comentario en la API:", error);
    console.log("Usando almacenamiento local como respaldo");
  }
  
  // Fallback to local data
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const jobIndex = JOBS.findIndex(job => job.id === jobId);
  if (jobIndex === -1) {
    throw new Error('Trabajo no encontrado');
  }
  
  const commentId = `comment_${Date.now()}`;
  const newComment: CommentType = {
    id: commentId,
    jobId,
    userId: user.id,
    userName: user.name,
    userPhoto: user.photoURL,
    content,
    timestamp: Date.now(),
    replies: []
  };
  
  JOBS[jobIndex].comments.push(newComment);
  return { ...newComment };
};

/**
 * Añadir una respuesta a un comentario
 */
export const addReplyToComment = async (
  jobId: string, 
  commentId: string, 
  content: string, 
  user: UserType
): Promise<ReplyType | undefined> => {
  try {
    // Try to add reply via API first
    const response = await apiRequest(`/jobs/${jobId}/comments/${commentId}/replies`, {
      method: 'POST',
      body: JSON.stringify({ content })
    });
    
    if (response && response.reply) {
      const reply = response.reply;
      return {
        id: reply.id,
        commentId,
        userId: user.id,
        userName: user.name,
        userPhoto: user.photoURL,
        content,
        timestamp: new Date(reply.createdAt).getTime()
      };
    }
  } catch (error) {
    console.error("Error al añadir respuesta en la API:", error);
    console.log("Usando almacenamiento local como respaldo");
  }
  
  // Fallback to local data
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const jobIndex = JOBS.findIndex(job => job.id === jobId);
  if (jobIndex === -1) {
    throw new Error('Trabajo no encontrado');
  }
  
  const commentIndex = JOBS[jobIndex].comments.findIndex(comment => comment.id === commentId);
  if (commentIndex === -1) {
    throw new Error('Comentario no encontrado');
  }
  
  const newReply: ReplyType = {
    id: `reply_${Date.now()}`,
    commentId,
    userId: user.id,
    userName: user.name,
    userPhoto: user.photoURL,
    content,
    timestamp: Date.now()
  };
  
  JOBS[jobIndex].comments[commentIndex].replies.push(newReply);
  return { ...newReply };
};

/**
 * Toggle like para un trabajo
 */
export const toggleJobLike = async (jobId: string, userId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const jobIndex = JOBS.findIndex(job => job.id === jobId);
  if (jobIndex === -1) {
    throw new Error('Trabajo no encontrado');
  }
  
  const userLiked = JOBS[jobIndex].likes.includes(userId);
  
  if (userLiked) {
    JOBS[jobIndex].likes = JOBS[jobIndex].likes.filter(id => id !== userId);
  } else {
    JOBS[jobIndex].likes = [...JOBS[jobIndex].likes, userId];
  }
  
  return !userLiked;
};

/**
 * Toggle guardar un trabajo para un usuario
 */
export const toggleSavedJob = async (userId: string, jobId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (!SAVED_JOBS[userId]) {
    SAVED_JOBS[userId] = [];
  }
  
  const isJobSaved = SAVED_JOBS[userId].includes(jobId);
  
  if (isJobSaved) {
    SAVED_JOBS[userId] = SAVED_JOBS[userId].filter(id => id !== jobId);
  } else {
    SAVED_JOBS[userId] = [...SAVED_JOBS[userId], jobId];
  }
  
  return !isJobSaved;
};

/**
 * Obtener trabajos guardados por un usuario
 */
export const getSavedJobs = async (userId: string): Promise<JobType[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const savedJobIds = SAVED_JOBS[userId] || [];
  const jobs = JOBS.filter(job => savedJobIds.includes(job.id));
  
  return jobs.map(job => ({ ...job }));
};
