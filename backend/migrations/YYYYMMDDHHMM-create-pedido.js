'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      quantidade: { type: Sequelize.INTEGER, allowNull: false },
      status: { type: Sequelize.ENUM("pendente", "produzido", "entregue"), defaultValue: "pendente" },
      comandaId: {
        type: Sequelize.INTEGER,
        references: { model: "Comandas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      itemId: {
        type: Sequelize.INTEGER,
        references: { model: "Items", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Pedidos');
  },
};
