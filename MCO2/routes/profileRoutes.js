const express = require("express");
const profileInfoController = require("../controllers/profileInfoController");
const profileEditController = require("../controllers/profileEditController");
const router = express.Router();

router.get("/profileInfo", profileInfoController.getPersonalInfo);
/*To get the id of a different user in hbs
 	{{#each profile}}  
  		<a href=/profileInfo/{{this._id}}>

    {{/each}}
	
*/
router.get("/profileInfo/:id", profileInfoController.getOtherProfile);
router.get("/profileInfo/edit", profileEditController.getProfileEdit);
router.patch("/profileInfo/edit", profileEditController.updateProfile);
router.delete("/editTrack/delete", profileEditController.deleteUser);
module.exports = router;
