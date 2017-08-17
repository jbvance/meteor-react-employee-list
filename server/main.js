// Only executed on the server
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import _ from 'lodash';
import { image, helpers } from 'faker';

Meteor.startup(() => {
	// Great place to generate some data

	// Check to see if data exists in the employees collections
	// See if the collection has any records
	const numberRecords = Employees.find({}).count();
	if (!numberRecords) {
		// Generate some data
		_.times(5000, () => {
			const { name, email, phone } = helpers.createCard();

			Employees.insert({
				name,
				email,
				phone,
				avatar: image.avatar()
			});
		});
	}

	// Create the publication that will be subscribed to by EmployeeList
	Meteor.publish('employees', per_page => {
		return Employees.find({}, { limit: per_page });
	});
});
