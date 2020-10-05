import * as express from 'express';
import * as sassMiddleware from 'node-sass-middleware';
import * as path from 'path';
import * as db from 'quick.db';
import * as bodyParser from 'body-parser';
const app = express();

const config = require('./config.json');

app.set('views', __dirname + '/views');
app.set('view engine', 'tsx');
app.engine('tsx', require('express-react-views').createEngine());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  sassMiddleware({
    src: __dirname,
    dest: path.join(__dirname, 'public'),
    debug: true,
  })
);

if (!db.has('notice')) db.set('notice', '테스트 공지');

app.get('/', (req, res) =>
  res.render('index', { title: 'Blow.', notice: db.get('notice') })
);

app.get('/admin', (req, res) => {
  if (req.query.id === config.id && req.query.ps === config.ps) {
    res.render('Admin', {
      title: 'Blow.',
      db: db.all(),
      notice: db.get('notice'),
    });
  } else {
    res.render('block');
  }
});

app.get('/:id', (req, res) => {
  if (typeof db.get(`url.${req.params.id}`) === 'undefined') {
    res.redirect('https://blow.ga');
  } else {
    res.redirect(db.get(`url.${req.params.id}`));
  }
});

app.get('/api/editNotice', (req, res) => {
  db.set('notice', req.query.content);
  res.send();
});

app.post('/api/shorten', (req, res) => {
  if (typeof req.body.custom !== 'undefined')
    if (req.body.custom.length > 12 || req.body.custom.length < 4)
      res.status(400).send('커스텀 링크는 4자 이상 12자 이하여야 합니다!');
  const shorten = () => {
    let id =
      typeof req.body.custom === 'undefined'
        ? Math.random().toString(36).substr(2, 6)
        : req.body.custom;
    if (!db.has(`url.${id}`)) {
      db.set(`url.${id}`, req.body.url);
      res.status(200).send(id);
      return;
    } else {
      if (typeof req.body.custom === 'undefined') {
        shorten();
        return;
      } else {
        res.status(400).send('이미 존재하는 커스텀 링크입니다!');
        return;
      }
    }
  };
  shorten();
});

app.post('/api/delete', (req, res) => {
  console.log(req.body.id);
  db.delete(`url.${req.body.id}`);
  res.send();
});

app.listen(3000, () => console.log(`http://localhost:3000`));
