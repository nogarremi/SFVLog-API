module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ranks', {
      rank_id: {
        type: DataTypes.TINYINT(2).ZEROFILL.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      rank_name: {
        type: DataTypes.STRING(21),
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
      tableName: 'ranks'
    });
  };