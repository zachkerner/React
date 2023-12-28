import "dotenv/config"
import cors from 'cors'
import express from 'express'
import { findMedian } from "../src/primes.js"

//put in separate routes folder

const app = express()

app.use(cors())

app.get("/:number", (req, res) => {
  const number = Number(req.params["number"])
  const data = `[${findMedian(number)}]`
  res.send(data)
})

//var server = [next line]
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})

//module.exports = server