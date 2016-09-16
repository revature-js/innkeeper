/**
*	user.js - User service.
*/

app.service('userService', function() {

	return {

		setUsername: function(username) {
			sessionStorage.setItem('username', username);
		},

		setFirstName: function(firstname) {
			return sessionStorage.setItem('firstname',firstname);
		},

		setLastName: function(lastname) {
			return sessionStorage.setItem('lastname',lastname);
		},

		setApartmentId: function(apartment) {
			return sessionStorage.setItem('apartment',apartment);
		},

		setUserId: function(userid) {
			return sessionStorage.setItem('userid',userid);
		},

		setAdmin: function(role) {
			return sessionStorage.setItem('isadmin',role);
		},

		getUsername: function() {
			return sessionStorage.getItem('username');
		},

		getFirstName: function() {
			return sessionStorage.getItem('firstname');
		},

		getLastName: function() {
			return sessionStorage.getItem('lastname');
		},

		getApartmentId: function() {
			return sessionStorage.getItem('apartment');
		},

		getUserId: function() {
			return sessionStorage.getItem('userid');
		},

		isAdmin: function() {
			var role = sessionStorage.getItem('isadmin');
			if (role == "undefined")
				return false;
			return role == "true" ? true : false;
		}	
	};
});
