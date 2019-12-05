module.exports = function(sequelize, DataTypes) {
    return sequelize.define('characters', {
      char_id: {
        type: DataTypes.TINYINT(2).ZEROFILL.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      char_name: {
        type: DataTypes.STRING(8),
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
      tableName: 'characters'
    });
  };