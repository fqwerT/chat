 const insertItems = ({ database, arg, arg2, arg3 }) => {
  return `INSERT INTO ${database} ( ${arg}, ${arg2}, ${arg3} ) VALUES ($1, $2, $3) RETURNING *`;
};

module.exports = insertItems