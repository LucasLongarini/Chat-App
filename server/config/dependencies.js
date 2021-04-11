const DBService = require('../services/DBService');

module.exports.DBService = new DBService();
//  = (() => {
//     return {
//         UserRepository: null,
//         DBService: new DBService(),
//     }
// });