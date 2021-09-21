
exports.up = function(knex) {
  return knex.schema.createTable('leaders', function(table){
      table.increments().primary();
      table.string('organization').notNullable();
      table.string('name').notNullable();
      table.string('calling').notNullable();
      table.string('email').notNullable();
      table.string('permissions').notNullable();
      table.string('activation_token').notNullable();
      table.integer('is_activated').notNullable();
      table.string('date').notNullable();
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('leaders');
};
