export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Contact.associate = (models) => {
    Contact.belongsToMany(models.Message, {
      through: 'Followings',
      as: 'Follower',
      foreignKey: 'followingId',
    });
  };
  return Contact;
};
