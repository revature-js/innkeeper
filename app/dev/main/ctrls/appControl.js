/*
 *	appControl.js
 *		- Main app controller for navigation.
 */

 /**
 *	Enters administration mode.
 *		state - TRUE enables the mode. FALSE disables it.
 */
function enter_admin_mode (state) {			

	var projections_menu_element = document.getElementById("projections_view");
	if (state == false)
		projections_menu_element.style.display = "none";
	else
		projections_menu_element.style.display = "inline";			
}

/**
*	Navbar controller.
*		$scope - Application scope.
*/
app.controller("navbar_control", function($scope, userService) {

		$scope.user = {
			username: userService.getUsername(),
			fname: userService.getFirstName(),
			lname: userService.getLastName(),
			admin: userService.isAdmin()
		};

		if ($scope.user.admin == true)
			enter_admin_mode(true);
	}
);


