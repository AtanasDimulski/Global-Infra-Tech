const KoaRouter = require('koa-router');
const router = new KoaRouter({ prefix: "/news/api" })

const {
    createNews,
    updateNews,
    deleteNewsById,
    getAllNews,
    getSortedNews,
    getFilteredNews
} = require('../controllers/news')

router.post("/add", createNews);
router.patch("/:id", updateNews);
router.delete("/:id", deleteNewsById);
router.get("/", getAllNews);
router.get("/sorted", getSortedNews);
router.get("/filtered", getFilteredNews);

module.exports = router