import express from 'express';

import connection from './database/database.js';

import Answer from './database/Answer.js';

import Question from './database/Question.js';

const app = express();
const port = 3002;

// database
connection
  .authenticate()
  .then(() => {
    console.log('authentication successful');
  })
  .catch((err) => {
    console.log(err);
  });

// Falando para o express usar o Ejs como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Pegando dados do form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  Question.findAll({
    raw: true,
    order: [['id', 'DESC']] /* ASC = crescente || DESC = decrescente */,
  }).then((questions) => {
    res.render('index', { questions });
  });
  // findAll = SELECT * FROM questions
});

app.get('/ask/', (req, res) => {
  res.render('ask');
});

// post se usa para receber dados de formulário
app.post('/saveQuestion', (req, res) => {
  const { title, description } = req.body;
  Question.create({ title, description }).then(() => res.redirect('/'));
});

app.listen(port, () =>
  console.log(`Server Started at port: http://localhost:${port}! 🚀`)
);

app.get('/ask/:id', (req, res) => {
  const { id } = req.params;
  /*  tudo que ocorrer relacionado a tabela do banco será chamado através do 
      model Question
  */
  Question.findOne({
    where: {
      id,
    },
  }).then((question) => {
    // eslint-disable-next-line eqeqeq
    if (question != undefined) {
      // faz a checagem pra ver se a pergunta existe

      Answer.findAll({
        where: { questionId: question.id },
        order: [['id', 'DESC']],
      }).then((answers) => {
        res.render('question', { question, answers });
      });
    } else {
      res.redirect('/');
    }
  });
});

app.post('/answer', (req, res) => {
  const { body } = req.body;
  const questionId = req.body.question;
  Answer.create({
    body,
    questionId,
  }).then(() => {
    res.redirect(`/ask/${questionId}`);
  });
});

/*
Para salvar os dados dentro de uma table, preciso receber o model da tabela e
chamar o método create que é equivalente a INSERT INTO.
*/
