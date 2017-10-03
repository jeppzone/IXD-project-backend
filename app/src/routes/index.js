

module.exports = function(express) {
  const Router = express.Router();

  Router.route('/board')
  .get((req, res) => {
    res.status(200).send('GET on /board');
  })
  .post((req, res) => {

  })
  .put((req, res) => {

  })

  return Router;
}
