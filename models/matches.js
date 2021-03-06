module.exports = function(sequelize, DataTypes) {
    return sequelize.define('matches', {
      match_id: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      season: {
        type: DataTypes.INTEGER(4).UNSIGNED,
        allowNull: false
      },
      match_type: {
        type: DataTypes.TINYINT(1).UNSIGNED,
        allowNull: false
      },
      my_char_id: {
        type: DataTypes.TINYINT(2).ZEROFILL.UNSIGNED,
        allowNull: false,
        references: {
          model: 'characters',
          key: 'char_id'
        }
      },
      opp_id: {
        type: DataTypes.INTEGER(8).ZEROFILL.UNSIGNED,
        allowNull: false,
        references: {
          model: 'opponents',
          key: 'opp_id'
        }
      },
      opp_char_id: {
        type: DataTypes.TINYINT(2).ZEROFILL.UNSIGNED,
        allowNull: false,
        references: {
          model: 'characters',
          key: 'char_id'
        }
      },
      opp_rank_id: {
          type: DataTypes.TINYINT(2).ZEROFILL.UNSIGNED,
          allowNull: false,
          references: {
            model: 'ranks',
            key: 'rank_id'
          }
      },
      result: {
        type: DataTypes.TINYINT(1).UNSIGNED,
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
      tableName: 'matches'
    });
  };