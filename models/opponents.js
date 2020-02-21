module.exports = function(sequelize, DataTypes) {
    return sequelize.define('opponents', {
      opp_id: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      opp_name: {
        type: DataTypes.STRING(16),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'opponents'
    });
  };