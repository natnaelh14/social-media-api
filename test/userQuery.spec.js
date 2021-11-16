const { describe, it, before } = require('mocha');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const EasyGraphQLTester = require('easygraphql-tester');
const { typeDefs, resolvers } = require('../schemas');
const { User } = require('../models');
const { expect } = require('chai');

// describe('User Resolvers', () => {
//   describe('Users', () => {
//     let tester;
//     before(() => {
//       tester = new EasyGraphQLTester(typeDefs, resolvers);
//     });
//     it('should return all the Users in the database', async () => {
//       const query = `
//         {
//             users
//         }`;
//       const args = {};
//       const result = await tester.graphql(query, {}, args);
//       expect(result.data.users.length).to.be.equal(
//         await User.findAll({}).then((res) => res.length)
//       );
//     });
//   });
// });
