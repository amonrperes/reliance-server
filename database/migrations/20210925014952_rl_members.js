
exports.up = function(knex) {
  return knex.schema.createTable('rl_members', function(table){
      table.string('id').primary();
      table.string('name').notNullable();
      table.integer('age').notNullable();
      table.string('monthly_income').notNullable();
      table.integer('family_members').notNullable();
      table.string('marital_status').notNullable();
      table.integer('is_activated').notNullable();
      table.string('updated').notNullable();
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('rl_members');
};
