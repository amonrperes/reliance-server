
exports.up = function(knex) {
    return knex.schema.createTable('rl_users', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('organization').notNullable();
        table.string('calling').notNullable();
        table.string('permission').notNullable();
        table.string('activation_token').notNullable();
        table.integer('is_activated').notNullable();
        table.string('updated').notNullable();
    })  
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('rl_users');
  };
  