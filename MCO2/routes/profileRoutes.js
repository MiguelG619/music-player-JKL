const express = require("express");
const profileInfoController = require("../controllers/profileInfoController");
const profileEditController = require("../controllers/profileEditController");
const router = express.Router();

router.get("/profileInfo", profileInfoController.getPersonalInfo);
/*To get the id in hbs
 	{{#with profile}}  
  		<a href=`/profileInfo/{{_id}}`>

    {{/with}}
	
*/
router.get("/profileInfo/:id", profileInfoController.getOtherProfile);
router.put("/profileInfo/edit", profileEditController.updateProfile);
router.delete("/editTrack/delete", profileEditController.deleteUser);
module.exports = router;
