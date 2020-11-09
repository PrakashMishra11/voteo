const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'voteo'
  }
});

// db.select('*').from('voter_details').then(data => {console.log});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> {
  res.send(db.users);
})

app.post('/signin', (req, res) => {
  db.select('voter_id', 'password').from('login')
    .where('voter_id', '=', req.body.vi)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].password);
      if (isValid) {
        return db.select('*').from('voter_details')
          .where('voter_id', '=', req.body.vi)
          .then(user => {
            res.json(user[0])
          })
            .catch(err => res.status(400).json('error getting user'))
      }
      else {
        res.status(400).json('Invalid Username or Password')
      }
    })
      .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
  const {fn, ln, phone, email, city, state, vi, an, password} = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      password: hash,
      voter_id: vi
    })
      .into('login')
      .returning('voter_id')
      .then(vid => {
           return trx('voter_details')
            .insert({
              name: fn + " " + ln,
              aadhaar_no: an,
              voter_id: vid[0],
              mobile: phone,
              email: email,
              vote_status: false,
              state: state,
              city: city
          })
      })
        .then(trx.commit)
        .catch(trx.rollback)
  })
    .catch(err => res.status(400).json('Some Unknown error occurred while trying to register'))
  res.json('success');
})

// app.get('/profile/:id', (req, res) => {
//   const {id} = req.params;
//   let found = false;
//   db.users.forEach(user => {
//     if (user.id === id) {
//       found = true;
//       return res.json(user);
//     }
//   })
//   if (!found) {
//     res.status(404).json('user not found');
//   }
// })

app.get('/getPartyInfo', (req, res) => {
  db.select('party_name', 'candidate').from('vote_result').then(data => res.json(data)).catch(error => res.status(400).json('There are no political parties available!'));
})

app.put('/vote', (req, res) => {
  const { vi, party } = req.body;
  // const initCount = db.select('total_votes').from('vote_result').where('party_name', '=', party);

  db.transaction(trx => {
    trx.increment('total_votes', 1)
      .into('vote_result').where('party_name', '=', party)
      .returning('total_votes')
      .then(total => {
        return trx('voter_details').where('voter_id', '=', vi)
        .update({
          vote_status: true
        })
          .returning('vote_status')
          .then(status => res.json(status[0]))
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
})

app.listen(3001, () => {
  console.log('app is running on port 3001');
})




/*

--> get = this is working
/signin --> post = success/ fail
/register --> post = user
/profile/:id --> get = user
/vote --> put = user has voted, party-vote-count-update

*/
