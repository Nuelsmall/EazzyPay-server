const router =require('express').Router();


router.get('/', (req, res) => {
    res.send('Heeello World')
})

module.exports = router