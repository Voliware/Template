/*!
 * bootstrapFormGroupManager
 * https://github.com/Voliware/Template
 * Licensed under the MIT license.
 */

/**
 * Bootstrap form group manager
 * @extends FormGroupManager
 */
class BootstrapFormGroupManager extends FormGroupManager {

	/**
	 * Constructor
	 * @param {object} [options]
	 * @returns {BootstrapFormGroupManager}
	 */
	constructor(options){
		var defaults = {
			template : BootstrapFormGroup
		};
		super($Util.opts(defaults, options));
		return this;
	}


}