const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    userid: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  });

  return User; // 함수 내에서 모델을 반환합니다.
};
