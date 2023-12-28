import { v4 as uuidv4 } from 'uuid'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useSearchParams, useParams
} from 'react-router-dom'
import { API } from '../../mockApi/apiClient'
import { useState, useEffect } from 'react'

const Home = ({home}) => {
  
  const alternate = home.name.toLowerCase().replaceAll(" ", "-")
  const details = `${home.numBeds} beds - ${home.numBaths} baths - ${home.sqft} sqft`
  const tags = home.tags.map(tag => {
    return <p className="tags" key={uuidv4()}>{tag}</p>
  })
  return (
        <div className="cardContainer">
          <div className="cardImageContainer">
            <img
              src={home.image}
              alt={alternate}
            />
            <div>
              <button className="favoriteButton highlighted">
                <img src="./images/heart.png" alt="heart icon" />
              </button>
            </div>
          </div>
          <div className="homeInfoContainer">
            <h3>{home.name}</h3>
            <p id="homeDetails">{details}</p>
            <div className="tagsContainer">
              {tags}
            </div>
            <p className="description">
              {home.description}
            </p>
          </div>
        </div> 
     
  )
}

const HomePopover = ({ home }) => {
  const alternate = home.name.toLowerCase().replaceAll(" ", "-")
  const details = `${home.numBeds} beds - ${home.numBaths} baths - ${home.sqft} sqft`
  const tags = home.tags.map(tag => {
    return <p className="tags" key={uuidv4()}>{tag}</p>
  })

  return (
    <div className="modalContainer">
          <div className="selectedCardContainer">
            <div className="modalImageContainer">
              <img
                src={home.image}
                alt={alternate}
              />
            </div>
            <div className="modalInformationContainer">
              <div className="homeInfoContainer">
                <h3>{home.name}</h3>
                <p id="homeDetails">{details}</p>
                <div class="tagsContainer">
                  {tags}
                </div>
                <p className="description">{home.description}</p>
              </div>
              <div>
                <button className="favoriteButton highlighted">
                  <img src="heart.png" alt="heart icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

const CompatibleLot = ({ lots }) => {
  return (
    <>
    <a href="/lots?selectedLot=123-example-ln">
                <div class="cardContainer">
                  <div class="cardImageContainer">
                    <img
                      src="https://storage.googleapis.com/plot_images/1018314458"
                      alt="123-example-ln"
                    />
                    <div>
                      <button class="favoriteButton" id="false">
                        <img src="heart.png" alt="heart icon" />
                      </button>
                    </div>
                  </div>
                  <div class="lotInfoContainer">
                    <h2>123 Example Ln</h2>
                    <p id="cityState">Charlotte, NC</p>
                    <p id="acreage">1.6 acres - 69,696 sqft</p>
                    <p class="lotDescription">
                      This sprawling lot is located on the outskirts of
                      Charlotte, with nearby boat access to Example Lake and a
                      straight shot to downtown Charlotte via Example Highway.
                    </p>
                  </div>
                </div>
          </a>
      </>
  )
}

const CompatibleLots = ({ id }) => {
  const [lots, setLots] = useState([])

  const getLots = async () => {
    const l = await API.getCombinations()
    setLots(l.filter(e => String(e.homePlanId) === id))
  }

  useEffect(() => {
    getLots()
  }, [])

  

  return (
    <div class="compatibleOptionsContainer">
            <div id="compatibleOptionsTitle">
              <p>Compatible Lots</p>
            </div>
            <div class="compatibleOptionsList">
              <a href="/lots?selectedLot=123-example-ln">
                <div class="cardContainer">
                  <div class="cardImageContainer">
                    <img
                      src="https://storage.googleapis.com/plot_images/1018314458"
                      alt="123-example-ln"
                    />
                    <div>
                      <button class="favoriteButton" id="false">
                        <img src="heart.png" alt="heart icon" />
                      </button>
                    </div>
                  </div>
                  <div class="lotInfoContainer">
                    <h2>123 Example Ln</h2>
                    <p id="cityState">Charlotte, NC</p>
                    <p id="acreage">1.6 acres - 69,696 sqft</p>
                    <p class="lotDescription">
                      This sprawling lot is located on the outskirts of
                      Charlotte, with nearby boat access to Example Lake and a
                      straight shot to downtown Charlotte via Example Highway.
                    </p>
                  </div>
                </div> </a><a href="/lots?selectedLot=123-sample-ln">
                <div class="cardContainer">
                  <div class="cardImageContainer">
                    <img
                      src="https://storage.googleapis.com/plot_images/1018937216"
                      alt="123-sample-ln"
                    />
                    <div>
                      <button class="favoriteButton">
                        <img src="heart.png" alt="heart icon" />
                      </button>
                    </div>
                  </div>
                  <div class="lotInfoContainer">
                    <h2>123 Sample Ln</h2>
                    <p id="cityState">Raleigh, NC</p>
                    <p id="acreage">0.7 acres - 30,492 sqft</p>
                    <p class="lotDescription">
                      This spacious lot is in the gorgeous Example Neighborhood,
                      surrounded by historic landmarks such as The Cool Things
                      Museum and The Very Old House.
                    </p>
                  </div>
                </div> </a><a href="/lots?selectedLot=123-test-ct">
                <div class="cardContainer">
                  <div class="cardImageContainer">
                    <img
                      src="https://storage.googleapis.com/plot_images/1043665691"
                      alt="123-test-ct"
                    />
                    <div>
                      <button class="favoriteButton highlighted">
                        <img src="heart.png" alt="heart icon" />
                      </button>
                    </div>
                  </div>
                  <div class="lotInfoContainer">
                    <h2>123 Test Ct</h2>
                    <p id="cityState">Charlotte, NC</p>
                    <p id="acreage">0.28 acres - 12,197 sqft</p>
                    <p class="lotDescription">
                      This cozy lot is directly next to downtown Charlotte -
                      from your front yard you can walk to uptown. Be sure to
                      check out The Average Bowling Alley or one of the plenty
                      of restaurants nearby!
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
  )
}

const HomesPopover = ({ homes, id }) => {
  const home = homes.find(h => String(h.homePlanId) === id)
  const alternate = home.name.toLowerCase().replaceAll(" ", "-")
  const details = `${home.numBeds} beds - ${home.numBaths} baths - ${home.sqft} sqft`
  const tags = home.tags.map(tag => {
    return <p className="tags" key={uuidv4()}>{tag}</p>
  })
  return (
    <div id="modal-container">
      <div class="screen"></div>
      <div id="modal">
        <HomePopover home={home} />
        <CompatibleLots id={id} />
      </div>
    </div>
  )
}

const HomesList = ({ homes }) => {
  const [ searchParams ] = useSearchParams()
  
  const homeParam = searchParams.get('home')
  
  const listOfHomes = homes.map(home => {
    const id = home.homePlanId
    return (
      <div key={id}>
        <Link to={`/homes?home=${id}`}>
          <Home home={home} />
        </Link>
      </div>
      
    )
  })

  const listOfHomesPopover = (
    <>
    {listOfHomes}
    <HomesPopover homes={homes} />
    
    </>
  )

  const displayPopover = homeParam ? <HomesPopover homes={homes} id={homeParam} /> : null

  return (
    <>
      <div className="homesListContainer">
        <button className="button">Show Saved Homes</button>
        <div className="homesList">
          {listOfHomes}
        </div>
      </div>
      {displayPopover}
    </>
  )
}

export { HomesList }