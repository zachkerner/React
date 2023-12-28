const Page = ({ numRows, handlePage }) => {
  const numPages = Math.ceil(numRows.length / 10)
  const pageArr = new Array(numPages).fill(0)
  

  const pageLinks = (
      <div style={{ display: "flex", whiteSpace: "nowrap" }}>
        page: 
      {pageArr.map((item, idx) => (
        <div key={idx} style={{ marginRight: "3px" }}>
          <Link to={`/users?page=${idx+1}`}><PageChange number={idx + 1} handlePage={handlePage} /></Link>
        </div>
        ))}
    </div>
  )

  return (
    <p>{numPages > 1 ? pageLinks : null}</p>
  )
}

const PageChange = ({ number, handlePage }) => {
  const handleSinglePage = (e) => {
    e.preventDefault()
    handlePage(number)
  }
  return (
    <a onClick={handleSinglePage}>{number} </a>
  )
}

export default Page