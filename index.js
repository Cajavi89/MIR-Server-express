const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3001;

const persons = [
  {
    id:1,
    name:"Arto Hellas",
    number: "040-123456"
  },
  {
    id:2,
    name:"Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id:3,
    name:"Dan Abramov",
    number: "12-43-234345"
  },
  {
    id:4,
    name:"Mary Poppendick",
    number: "39-23-6423122"
  },
];

app.use(express.json());
app.use(morgan())

morgan('tiny')

app.get('/', (req,res)=>{
  res.send('Bienvenido a mi API Persons')
});

app.get('/info',(req,res)=>{
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date}</p>`)
  })

app.get('/api/persons',(req,res)=>{
  return res.json(persons)
})

app.get('/api/persons/:id',(req,res)=>{
  const id = Number(req.params.id)
  const filtered = persons.find(el=>el.id === id)
  filtered ? res.json(filtered) : res.status(404).json({error:`Note with id ${id} not found`})
})

app.delete('/api/persons/:id',(req,res)=>{
  const id = Number(req.params.id);
  persons.filter(el=>el.id!== id);

  return res.status(204).end()
})

app.post('/api/persons',(req,res)=>{
  const newPerson = req.body
  newPerson.name= newPerson.name.toLowerCase()
  console.log(newPerson);
  if(!newPerson.name)res.status(400).json({Error: 'Name missing'})
  if(!newPerson.number)res.status(400).json({Error:'Number missing'})
  const repeatName= persons.find(({name})=>name.toLowerCase() == newPerson.name)
  if(repeatName)res.status(400).json({Error:'Name must be unique'})

  req.body.id = persons.length+1;
    persons.push(newPerson)
    res.status(201).json(newPerson)
    res.end()

})


app.listen(PORT, ()=>{
  console.log(`server listening on: localhost:${PORT}`)
})

