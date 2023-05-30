const express = require('express')
const morgan = require('morgan')
const app = express()

const PORT = process.env.PORT || 3001

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.use(express.json())

// Configure morgan middleware for non-POST requests in "tiny" format
app.use(
  morgan('tiny', {
    skip: req => req.method === 'POST', // Skip logging for POST requests
  })
)

// Configure morgan middleware for POST requests to log request body
app.use(
  morgan(
    (tokens, req, res) => {
      if (req.method === 'POST') {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['response-time'](req, res),
          'ms',
          JSON.stringify(req.body), // Log request body
        ].join(' ')
      }
    },
    {
      skip: req => req.method !== 'POST', // Skip logging for non-POST requests
    }
  )
)
/*
Note that logging data even in the console can be dangerous since it can contain sensitive data and may violate local privacy law (e.g. GDPR in EU) or business-standard. In this exercise, you don't have to worry about privacy issues, but in practice, try not to log any sensitive data.
*/

function generateRandomId() {
  const min = 1000000
  const max = 10000000
  const range = max - min

  const randomNumber = Math.random()
  const randomId = Math.floor(randomNumber * range) + min

  return randomId
}

app.get('/info', (req, res) => {
  res.send(
    `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.statusMessage = 'Page Not Found. The force is weak with this one!'
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  const person = persons.find(person => person.name === body.name)

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Provide name and number',
    })
  }

  if (person) {
    return res.status(409).json({
      error: 'Name must be unique',
    })
  }

  const randomId = generateRandomId()

  const newPerson = {
    id: randomId,
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(newPerson)

  res.status(201).json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
)
