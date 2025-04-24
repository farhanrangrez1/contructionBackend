const express=require('express');
const { createSiteReview } = require('../Controller/siteReviewController');

const router = express.Router()

router.post('/',createSiteReview)

// router.get('/',getAllSiteEntries)

// router.get('/:id',getSiteEntryById)

// router.patch('/:id',updateSiteEntry)

// router.delete('/:id',deleteSiteEntry)



 module.exports = router 
