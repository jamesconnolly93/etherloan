import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';
 
export default () => {
	return (
		<Menu inverted color={'blue'} style={{ marginTop: '10px' }}>
			<Link route='/'>
				<a className="item">
					Ether Loan
				</a>
			</Link>

			<Menu.Menu position="right">
				<Link route='/'>
					<a className="item">
						View Loans
					</a>
				</Link>
				<Link route='/campaigns/new'>
					<a className="item">
						+
					</a>
				</Link>

			</Menu.Menu>
		</Menu>
	)
};