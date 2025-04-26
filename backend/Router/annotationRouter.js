const express=require('express');
const { createAnnotation } = require('../Controller/annotationController');

const router = express.Router()

router.post('/',createAnnotation)

// router.get('/',getAllAnnouncements)

// router.get('/:id',getAnnouncementById)

// router.patch('/:id',updateAnnouncement)

// router.delete('/:id',deleteAnnouncement)



 module.exports = router 
