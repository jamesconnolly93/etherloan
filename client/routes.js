const routes = require('next-routes')();

routes
	.add('loans/new')
	.add('/loans/:address', '/loans/show')
	.add('/loans/:address/withdrawals', 'loans/withdrawals/index')
	.add('/loans/:address/withdrawals/new', 'loans/withdrawals/new');

module.exports = routes;