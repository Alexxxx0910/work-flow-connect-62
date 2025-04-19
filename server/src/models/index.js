
const { sequelize } = require('../config/database');
const User = require('./user.model');
const Job = require('./job.model');
const Comment = require('./comment.model');
const Reply = require('./reply.model');
const Chat = require('./chat.model');
const Message = require('./message.model');

// Definir las relaciones entre los modelos
// Users - Jobs (Un usuario puede tener muchos trabajos)
User.hasMany(Job, { foreignKey: 'userId', as: 'jobs' });
Job.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Jobs - Comments (Un trabajo puede tener muchos comentarios)
Job.hasMany(Comment, { foreignKey: 'jobId', as: 'comments' });
Comment.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

// Comments - Replies (Un comentario puede tener muchas respuestas)
Comment.hasMany(Reply, { foreignKey: 'commentId', as: 'replies' });
Reply.belongsTo(Comment, { foreignKey: 'commentId', as: 'comment' });

// Users - Comments (Un usuario puede hacer muchos comentarios)
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Users - Replies (Un usuario puede hacer muchas respuestas)
User.hasMany(Reply, { foreignKey: 'userId', as: 'replies' });
Reply.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Users - Jobs (Likes) (Muchos usuarios pueden dar like a muchos trabajos)
User.belongsToMany(Job, { through: 'JobLikes', as: 'likedJobs', foreignKey: 'userId' });
Job.belongsToMany(User, { through: 'JobLikes', as: 'likedBy', foreignKey: 'jobId' });

// Users - Jobs (Saved) (Muchos usuarios pueden guardar muchos trabajos)
User.belongsToMany(Job, { through: 'SavedJobs', as: 'savedJobs', foreignKey: 'userId' });
Job.belongsToMany(User, { through: 'SavedJobs', as: 'savedBy', foreignKey: 'jobId' });

// Exportar los modelos
module.exports = {
  sequelize,
  User,
  Job,
  Comment,
  Reply,
  Chat,
  Message
};
