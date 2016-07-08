var express    = require('express');
var superagent = require('superagent');
var cheerio    = require('cheerio');
var bodyParser = require('body-parser');
var router     = express.Router();
router.use(bodyParser.json()); // for parsing application/json
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  // console.log(req);
  console.log(req.body);
  superagent.get('http://baike.baidu.com/item/' + req.body.key)
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      $('div').each(function (idx, element) {
        // var $a = $(element).find("h2 a");
        var $a = $(element);
        // items.push({
        //   title: $a[0].innerHTML,
        //   href: $a[0].href
        // });
        items.push("one");
      });
      var data = items;
      // res.render("index");
      res.send(sres.text);
      // res.send(data);
      // res.render('index', {data: data});
    });
});

module.exports = router;
