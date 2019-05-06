/*
 * @package    Com_Tjfields
 * @author     Techjoomla <extensions@techjoomla.com>
 * @copyright  Copyright (c) 2009-2019 TechJoomla. All rights reserved
 * @license    GNU General Public License version 2, or later
 */

var ownership = {
	/* This function to get all users in tjucm via ajax */
	getUsers: function (element) {
		jQuery('.user-ownership, .chzn-results').empty();
		jQuery.ajax({
			url: Joomla.getOptions('system.paths').base + "/index.php?option=com_cluster&task=clusterusers.getUsersByClientId&format=json",
			type: 'POST',
			data: element,
			dataType:"json",
			success: function (data) {
				for(index = 0; index < data.length; ++index)
				{
					var op="<option value='"+data[index].value+"' > " + data[index]['text'] + "</option>" ;
					jQuery('.user-ownership').append(op);
				}

				/* IMP : to update to chz-done selects*/
				jQuery(".user-ownership").trigger("liszt:updated");
			}
		});
	},
	/* This function to populate all users in ownership field of tjucm form */
	setUsers: function (element) {
		if (jQuery(".cluster-ownership")[0])
		{
			let clientId = jQuery(".cluster-ownership").val();

			element.client = clientId;
			element.iscluster = 1;

			if (jQuery.trim(clientId) != '' && clientId != 'undefined' )
			{
				this.getUsers(element);
			}
		}
		else
		{
			this.getUsers(element);
		}
	}
}

jQuery(document).ready(function() {

	if (jQuery(".user-ownership")[0])
	{
		let dataFields = {client: 0, iscluster: 0};

		//Get All users for user field
		ownership.setUsers(dataFields);
	}

	/* This function to get users based on cluster value in tjucm via ajax */
	jQuery('.cluster-ownership').change(function(){

		// Check class exists or not
		if (!jQuery(".user-ownership")[0]){
			return false;
		}

		let clientId = jQuery(this).val();
		let dataFields = {client: clientId,iscluster: 1};

		//Get All associated users
		ownership.getUsers(dataFields);
	});
});
