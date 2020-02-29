'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model {}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'can not be null'
        },
        notEmpty: {
          args: true,
          msg: 'can not be empty string'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'can not be null'
        },
        notEmpty: {
          args: true,
          msg: 'can not be empty string'
        }
      }      
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'can not be null'
        },
        notEmpty: {
          args: true,
          msg: 'can not be empty string'
        }
      }      
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'can not be null'
        },
        notEmpty: {
          args: true,
          msg: 'can not be empty string'
        },
        isDate: {
          args: true,
          msg: 'only allow date format'
        },
        notToday(value) {
          const dateUser = new Date(value)
          if (dateUser < new Date()) {
            throw new Error ('only allow future date')
          }
        }
      }      
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
  });
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};