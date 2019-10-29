const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'pg',
  port: 54320,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM name', (error, results) => {
      if (error) {
        response.status(400).json(error)
      }
      else{
        response.status(200).json(results.rows)
      }
    })
  }

const searchQuery = (request, response) => {
    const queryString = `SELECT book.isbn, title, author.name,\
    not exists(select * from book_loan where book_loan.isbn=book.isbn and date_in < now())
    as can_checkout\
     FROM book\
    join book_author on book.isbn=book_author.isbn\
    join author on book_author.author_id = author.author_id\
    WHERE \
    to_tsvector(title) ||\
    to_tsvector(book.isbn) ||\
    to_tsvector(author.name) @@\
    to_tsquery(\'${request.query.searchString}\');`
    pool.query(queryString, (error, results)=>{
        if (error) {
            response.status(400).json(error)
          }
          else{
            response.status(200).json(results.rows)
          }
    })
}

const checkout = (request, response) => {
  const queryString = `
  insert into book_loan(isbn,borrower_id,date_in)
  values(\'${request.query.isbn}\', ${request.query.cardId} , null)`
  pool.query(queryString, (error, results)=>{
      if (error) {
          response.status(400).json(error)
        }
        else{
          response.status(200).json(results.rows)
        }
  })
}

const query = (request, response) => {
  console.log(request.body.query)
  const queryString = request.body.query
  pool.query(queryString, (error, results)=>{
    if (error) {
        response.status(400).json(error)
      }
      else{
        console.log(results)
        response.status(200).json(results.rows)
      }
})
}


module.exports={
    getUsers, searchQuery, checkout, query
}