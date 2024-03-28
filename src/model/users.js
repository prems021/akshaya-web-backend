

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email : {
        type: DataTypes.STRING,
      },
      password : {
        type: DataTypes.STRING,
      },
      pin : {
        type: DataTypes.STRING(50),
      },
      operating_status: {
        type: DataTypes.STRING(5), //  A - Active , D - Deleted , S - Suspended
      },
    });
    Users.associate = function (models) {
      // associations can be defined here
    };
    return Users;
  };
  