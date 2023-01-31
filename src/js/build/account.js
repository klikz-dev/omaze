/**
* Account
*
* namespace
* config
* run
* login
* fire functions
*/

require('jquery-validation');

/**
* Account namespace
* @type {Object}
*/
SDG.Account = SDG.Account || {};

/**
* config
* @type {Object}
*/
SDG.Account.config = {

	// elements
	el: {
		login: document.getElementById('acLogin'),
		account_section: document.getElementById('acLogin'),
	},

	// ids
	id: {
		hideRecoverPassword: 'hideRecoverPasswordBtn',
		recoverPassword: 'recoverPassword',
		sectionLogin: 'acLoginForm',
		sectionRecoverPassword: 'acRecoverPasswordForm',
		accountRegister: 'accountRegister',
		customer_login: 'customer_login',
		create_customer: 'create_customer',
		recover_password_form: 'recoverPasswordForm',
		reset_password_form: 'resetPasswordForm',
		login_section: 'accountSection',
		address_new_form: 'addressNewForm'
	},

	dom: {
		field_container: 'oz-field__container'
	},

	// urls (hashes)
	url: {
		recover: '#recover'
	}
};

/**
* run
* @type {Function}
*/
SDG.Account.run = function() {
	const c = SDG.Account.config;

	// login
	if (c.el.login) {
		SDG.Account.login();

		// Input placeholders
		const placeholder = SDG.placeholder({
			id: c.id.login_section,
			sel: c.dom.field_container
		});
		placeholder.init();
	}


};

/**
* login
* @return {SDG.Account.login~init}
*/
SDG.Account.login = function() {
	const c = SDG.Account.config;

	// globals
	const hideRecoverPassword = document.getElementById(c.id.hideRecoverPassword);
	const recoverPassword = document.getElementById(c.id.recoverPassword);
	const sectionLogin = document.getElementById(c.id.sectionLogin);
	const sectionRecoverPassword = document.getElementById(c.id.sectionRecoverPassword);
	const accountRegister = document.getElementById(c.id.accountRegister);

	/**
	* init
	*/
	function init() {
		detectRecover();
		validateForms();
		addEvents();
	}

	/**
	* add events
	*/
	function addEvents() {

		if (recoverPassword) {
			// forgot password click
			_.addEvent({
				id: c.id.recoverPassword,
				event: 'click',
				fn: showRecoverPasswordForm
			});

			// go back click
			_.addEvent({
				id: c.id.hideRecoverPassword,
				event: 'click',
				fn: hideRecoverPasswordForm
			});
		}
	}

	/**
	* validate form fields
	*/
	function validateForms() {
		jQuery.validator.setDefaults({
			errorPlacement: (error, element) => {
				error.insertAfter(element.parent());
				element.parent().addClass('error');
			}
		});

		jQuery(`#${c.id.customer_login}, #${c.id.create_customer}`).validate({
			rules: {
				'customer[email]': {
					required: true,
					email: true
				},
				'customer[password]': {
					required: true,
					minlength: 5
				}
			},
			messages: {
				'customer[email]': `Oops, that doesn't seem to be a valid email format!`,
				'customer[password]': `Password must have at least 5 characters`
			},
		});

		jQuery(`#${c.id.recover_password_form}`).validate({
			rules: {
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				email: `Oops, that doesn't seem to be a valid email format!`
			}
		});

		jQuery(`#${c.id.reset_password_form}`).validate({
			rules: {
				'customer[password_confirmation]': {
					equalTo: '#resetPassword'
				}
			},
			messages: {
				'customer[password_confirmation]': 'Passwords must match.'
			}
		});
	}

	const notificationBoxSelector = 'login-notification';
	const animate = 'animate';
	const notificationBox = document.getElementsByClassName(notificationBoxSelector)[0];

	/**
	* show recover password form
	*/
	function showRecoverPasswordForm() {
		recoverPassword.style.display = 'none';
		hideRecoverPassword.style.display = 'block';

		sectionLogin.style.display = 'none';
		sectionRecoverPassword.style.display = 'block';

		accountRegister.style.display = 'none';

		if (notificationBox) {
			notificationBox.classList.remove(animate);
		}
	}

	/**
	* hide recover password form
	*/
	function hideRecoverPasswordForm() {
		recoverPassword.style.display = 'block';
		hideRecoverPassword.style.display = 'none';

		sectionRecoverPassword.style.display = 'none';
		sectionLogin.style.display = 'block';

		accountRegister.style.display = 'block';

		if (notificationBox) {
			notificationBox.classList.add(animate);
		}
	}

	/**
	* detect recover
	*/
	function detectRecover() {
		if (window.location.hash === c.url.recover) {
			showRecoverPasswordForm();
		}
	}

	/**
	* return
	* @type {Object}
	*/
	return {
		init: init()
	};
};

window.addPasswordVisibilityListeners = function(id) {
	const togglePasswordVisibility = 'togglePasswordVisibility';
	const passwordInputField = document.getElementById(id);
	const pwVisEle = document.getElementById(togglePasswordVisibility);

	if (passwordInputField) {
		pwVisEle.addEventListener('click', () => {
			if (passwordInputField.type === 'text') {
				passwordInputField.type = 'password';
				pwVisEle.innerHTML = 'show';
			} else {
				passwordInputField.type = 'text';
				pwVisEle.innerHTML = 'hide';
			}
		});
	}
};

/**
* fire functions
*/
SDG.Account.run();
