const {
  STATUS_SUCCESS,
  STATUS_FAIL,
  STATUS_WAITING,
  STATUS_DELIVERY,
  STATUS_CANCEL,
  STATUS_PENDING,
  STATUS_PREPARING,
  STATUS_COMPLETE,
} = require("../config/constant");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      paymentStatus: {
        type: DataTypes.ENUM(STATUS_SUCCESS, STATUS_FAIL, STATUS_WAITING),
        defaultValue: "waiting",
        allowNull: false,
      },
      orderStatus: {
        type: DataTypes.ENUM(
          STATUS_WAITING,
          STATUS_PENDING, // **
          STATUS_PREPARING, // **
          STATUS_DELIVERY, // **
          STATUS_COMPLETE, // **
          STATUS_CANCEL, //
        ),
        defaultValue: "waiting",
        allowNull: false,
      },
      orderPrice: {
        type: DataTypes.INTEGER(),
        allowNull: false
      }
    },
    {
      underscored: true,
    }
  );

  Order.associate = (db) => {
    Order.belongsTo(db.UserPayment, {
      foreignKey: {
        name: "userPaymentId",
        allowNull: false,
      },
      onDelete: "restrict",
    });
      Order.belongsTo(db.User, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
        onDelete: "restrict",
      });
      Order.hasMany(db.OrderItem, {
        foreignKey: {
          name: "orderId",
          allowNull: false,
        },
        onDelete: "restrict",
      });
      Order.belongsTo(db.Address, {
        foreignKey: {
          name: 'addressId',
          allowNull: false
        },
      })
  };

  return Order;
};
