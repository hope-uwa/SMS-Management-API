export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    message: {
      allowNull: false,
      required: true,
      type: DataTypes.STRING
    },
    senderId: {
      required: true,
      allowNull: true,
      type: DataTypes.INTEGER
    },
    receiverId: {
      allowNull: true,
      required: true,
      type: DataTypes.INTEGER
    },
    read: {
      allowNull: false,
      required: true,
      type: DataTypes.BOOLEAN
    },

  });
  Message.associate = (models) => {
    Message.belongsTo(models.Contact, {
      foreignKey: 'senderId',
      targetKey: 'id',
      as: 'sender'
    });
    Message.belongsTo(models.Contact, {
      foreignKey: 'receiverId',
      targetKey: 'id',
      as: 'receiver'
    });
  };
  return Message;
};
