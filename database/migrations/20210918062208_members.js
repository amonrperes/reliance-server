exports.up = function(knex) {
  return knex.schema.createTable('members', function(table){
      table.increments().primary();
      table.string('name').notNullable();
      table.string('age').notNullable();
      table.string('income').notNullable();
      table.string('family_number').notNullable();
      table.string('marital_status').notNullable();
      table.string('date').notNullable();
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('members');
};
