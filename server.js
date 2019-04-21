const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const helmet = require('helmet');
const csp = require('helmet-csp');
const permittedCrossDomainPolicies = require('helmet-crossdomain');
const bodyParser = require('body-parser');

let config = require('./config/webpack.config.dev');
const path = require('path');
const port = 3000;

const compiler = webpack(config);

//middlewares
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath, stats: 'errors-only' }));
app.use(webpackHotMiddleware(compiler));

app.use('/src', express.static('src'));

app.use(helmet());
app.use(permittedCrossDomainPolicies());

// You need a JSON parser first.
app.use(bodyParser.json({
  type: ['json', 'application/csp-report']
}));

app.post('/report-violation', (req, res) => {
  if (req.body) {
    console.log('CSP Violation: ', req.body)
  } else {
    console.log('CSP Violation: No data received!')
  }

  res.status(204).end()
});

//default route
app.get('/', (req, res) => res.render('index'));

app.use('*', function (req, res, next) {
  var filename = path.join(compiler.outputPath,'index.html');
  compiler.outputFileSystem.readFile(filename, function(err, result){
    if (err) {
      console.error(err);
      return next('Webpack is probably still bundling your file. Check your console and refresh in a few seconds.');
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
