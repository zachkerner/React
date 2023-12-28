import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'


const Lot = ({lot}) => {
  const ACRESQFOOTCONVERSION = 43560
  const cityState = lot.address.split(", ").slice(1,).join(", ")
  const squareFeet = Math.floor(lot.acres * ACRESQFOOTCONVERSION)
  return (
    <Link to={`/lots?lot=${lot.lotId}`}>
      <div className="cardContainer">
        <div className="cardImageContainer">
          <img
            src={lot.image}
            alt="123-example-ln"
          />
          <div>
            <button className="favoriteButton">
              <img src="./images/heart.png" alt="heart icon" />
            </button>
          </div>
        </div>
        <div className="lotInfoContainer">
          <h2>{lot.address}</h2>
          <p id="cityState">{cityState}</p>
          <p id="acreage">{lot.acres} acres - {squareFeet} sqft</p>
          <p className="lotDescription">{lot.description}</p>
        </div>
      </div> 
    </Link>
      
  )
}

const LotsList = ({ lots }) => {
  const listOfLots = lots.map(lot => {
    return (
      <div key={lot.lotId}>
        <Lot lot={lot}/>
      </div>
    )
  })

  return (
    <div className="lotsContainer">
      <button className="button">Show Saved Lots</button>
      <div className="lotsList">
        {listOfLots}
      </div>
    </div>
  )
}

export { LotsList }