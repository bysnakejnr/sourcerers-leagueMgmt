import {Button, Row, Col} from 'react-bootstrap'; 
//import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {FaSearch, FaFilter } from 'react-icons/fa';
import { func } from 'prop-types';



const Search = () => {

    const [teamFilter, handleTeamFilter] = useState(false);
    const [playerFilter, handlePlayerFilter] = useState(false);
    const [leagueFilter, handleLeagueFilter] = useState(false);
    const [teamButton, handleTeamButton] = useState("secondary");
    const [playerButton, handlePlayerButton] = useState("secondary");
    const [leagueButton, handleLeagueButton] = useState("secondary");
    const [filterButton, handleFilterButton] = useState("secondary");
    const [teamResultsFilter, handleTeamResultsFilter] = useState(false);
    const [playerResultsFilter, handlePlayerResultsFilter] = useState(false);
    const [leagueResultsFilter, handleLeagueResultsFilter] = useState(false);
    const [sportBResultsFilter, handleSportBResultsFilter] = useState(false);
    const [sportSResultsFilter, handleSportSResultsFilter] = useState(false);
    const [teamResultsButton, handleTeamResultsButton] = useState("outline-secondary");
    const [playerResultsButton, handlePlayerResultsButton] = useState("outline-secondary");
    const [leagueResultsButton, handleLeagueResultsButton] = useState("outline-secondary");
    const [sportBResultsButton, handleSportBResultsButton] = useState("outline-secondary");
    const [sportSResultsButton, handleSportSResultsButton] = useState("outline-secondary");
    const [searchText, changeText] = useState("");
    const [searchLocation, changeLocation] = useState("");
    const [searchActive, setSearchActive] = useState(false);
    const [filterShow, setFilterShow] = useState(false);

    const handleFilter = (filter) => {
      if (filter === "Teams") {
        handleTeamFilter(!teamFilter);
        if (teamFilter === true) {
            handleTeamButton("secondary")
        } else {
            handleTeamButton("primary")
        }
      } else if (filter === "Players") {
        handlePlayerFilter(!playerFilter);
        if (playerFilter === true) {
            handlePlayerButton("secondary")
        } else {
            handlePlayerButton("primary")
        }
      } else {
        handleLeagueFilter(!leagueFilter);
        if (leagueFilter === true) {
            handleLeagueButton("secondary")
        } else {
            handleLeagueButton("primary")
        }
      }
    };

    const handleResultFilter = (filter) =>{
      if (filter === "Teams") {
        handleTeamResultsFilter(!teamResultsFilter);
        if (teamResultsFilter === true) {
            handleTeamResultsButton("outline-secondary")
        } else {
          handleTeamResultsButton("secondary")
        }
      } else if (filter === "Players") {
        handlePlayerResultsFilter(!playerResultsFilter);
        if (playerResultsFilter === true) {
            handlePlayerResultsButton("outline-secondary")
        } else {
            handlePlayerResultsButton("secondary")
        }
        
      }
      else if (filter === "Basketball") {
        handleSportBResultsFilter(!sportBResultsFilter);
        if (sportBResultsFilter === true) {
          handleSportBResultsButton("outline-secondary")
        } else {
          handleSportBResultsButton("secondary")
        }
        
      }
      else if (filter === "Soccer") {
        handleSportSResultsFilter(!sportSResultsFilter);
        if (sportSResultsFilter === true) {
          handleSportSResultsButton("outline-secondary")
        } else {
          handleSportSResultsButton("secondary")
        }
        
      }
       else {
        handleLeagueResultsFilter(!leagueResultsFilter);
        if (leagueResultsFilter === true) {
            handleLeagueResultsButton("outline-secondary")
        } else {
            handleLeagueResultsButton("secondary")
        }
      }
    };
    const setFilterButton = () =>{
      setFilterShow(!filterShow)
    }


    const handleSearchText = (input) => {changeText(input.target.value)}
    const handleSearchLocation = (input) => {changeLocation(input.target.value)}
    const data = [
        {
      rowid:1,
      type: "Team",
      name: "Real Madrid",
      numberOfPlayers: 23,
      location: "Toronto",
      sportsType : "Soccer",
      lookingForPlayers: true
      
    },{
      rowid:2,
      type: "Team",
      name: "Barcelona",
      numberOfPlayers: 23,
      location: "Toronto",
      sportsType : "Soccer",
      lookingForPlayers: false
      
    },{
      rowid:3,
      type: "Team",
      name: "Lakers",
      numberOfPlayers: 11,
      location: "Toronto",
      sportsType : "Basketball",
      lookingForPlayers: false
      
    },{
      rowid:4,
      type: "Team",
      name: "Bulls",
      numberOfPlayers: 123,
      location: "Toronto",
      sportsType : "Basketball",
      lookingForPlayers: false
      
    },{
      rowid:5,
      type: "Team",
      name: "No Name Team",
      numberOfPlayers: 15,
      location: "Toronto",
      sportsType : "Soccer",
      lookingForPlayers: true
      
    },
      
   {
      rowid:6,
      type: "League",
      name: "Play or Don't, just live.",
      lookingForTeams: true,
      sportsType : "Soccer"
      
    },{
      rowid:7,
      type: "League",
      name: "Winner gets the girl",
      lookingForTeams: false,
      sportsType : "Soccer"
      
      
    },{
      rowid:8,
      type: "League",
      name: "Winner gets the boy",
      lookingForTeams: true,
      sportsType : "Basketball"
      
    },{
      rowid:9,
      type: "League",
      name: "Winner gets nothing",
      lookingForTeams: true,
      sportsType : "Basketball"
    },
    {
    
      rowid:10,
      type: "Player",
      name: "Baris Berber"
      
    },{
      rowid:11,
      type: "Player",
      name: "Jemma MatchPlay"
      
    },{
      rowid:12,
      type: "Player",
      name: "Hyun LEEgue"
      
    },{
      rowid:13,
      type: "Player",
      name: "Jinny Leegue"
      
    },{
      rowid:14,
      type: "Player",
      name: "Divine TheGodOu(dagadu)"

    }
    
];
const filteredLeague = data.filter(filteredData=>{
  if(filteredData.type === "League"){
    filteredData.lookingForPlayers = "N/A";
    return filteredData;
  }})
const filteredTeam = data.filter(filteredData=>{
  if(filteredData.type === "Team"){
    return filteredData;
  }});
  const filteredPlayers = data.filter(filteredData=>{
    if(filteredData.type === "Player"){
      return filteredData;
    }})
  const filteredSportsB = data.filter(filteredData=>{
    if(filteredData.sportsType==="Basketball") return filteredData;
  })
  const filteredSportsS = data.filter(filteredData=>{
    if(filteredData.sportsType==="Soccer") return filteredData;
  })
      

  return (
<>
    <h1 className='center-header'>SEARCH</h1>
    <div className='bg-light container justify-content-center align-items-center text-center'>
    
    <form id="search-form" className="form-inline" role="form" method="get" action="">
    <div className="input-group">
        <input type="text" className="w-50 form-control search-form" value = {searchText} onChange={handleSearchText} 
                    placeholder="Search for teams, players, or leagues" />
        <button type='button' className="btn btn-primary me-2 search-btn" onClick={ () => setSearchActive(true) } style={{"borderTopRightRadius":"50%","borderBottomRightRadius":"50%" }} ><FaSearch className='search-btn'
        />
		</button>
        {/* Location Search Item */}
        <input type="text" className="w-25 form-control search-form" value = {searchLocation} onChange={handleSearchLocation} 
                    placeholder="Search by location" /> 
        <div className="container my-3 bg-light justify-content-center align-items-center">
      <div className="col-md-7 justify-content-center align-items-center text-center mx-auto justify-content-center align-items-center">
             <Button className='me-2' onClick={() => handleFilter('Teams')} variant={teamButton}>Teams</Button>
            <Button className='me-2' onClick={() => handleFilter('Players')} variant={playerButton}>Players</Button>
           <Button className='me-2' onClick={() => handleFilter('Leagues')} variant={leagueButton}>Leagues</Button>
       </div>
        </div>
    </div>
</form>
</div>
<div className='mx-auto w-75'>
{ searchActive === true &&
      
            <div className='search-list'> 
            <Row>
            <Col><h2 className='text-center mt-3'><Button size="sm" variant="outline-secondary" onClick={setFilterButton}>
                <FaFilter></FaFilter>Filter Results
              </Button></h2>
              {filterShow &&
                <Col className='text-center'>
                <Button size="sm" className='me-2' onClick={()=>{handleResultFilter("Teams")}} variant={teamResultsButton}>Teams</Button>
                <Button size="sm" className='me-2' onClick={()=>{handleResultFilter("Leagues")}} variant={leagueResultsButton}>Leagues</Button>
                <Button size="sm" className='me-2' onClick={()=>{handleResultFilter("Players")}} variant={playerResultsButton}>Players</Button>
                <Button size="sm" className='me-2' onClick={()=>{handleResultFilter("Basketball")}} variant={sportBResultsButton}>Basketball</Button>
                <Button size="sm" className='me-2' onClick={()=>{handleResultFilter("Soccer")}} variant={sportSResultsButton}>Soccer</Button>
                </Col>
              }
              
              </Col>
            <Col><h2 className='text-center mt-3'>Results</h2></Col>
            <Col></Col>
            </Row>
            <ul>
          <Row className='mb-5 mt-5'>
            <Col>Name</Col>
            <Col>Location</Col>
            <Col>Status</Col>
            <Col>Looking for Teams</Col>
            <Col>Looking for Players</Col>
            <Col>Sports Type</Col>
          </Row>
          {/* Team Listing */}
          {!teamResultsFilter && !leagueResultsFilter && !playerResultsFilter && !sportBResultsFilter && !sportSResultsFilter &&
          data.map(list => 
            <li key={list.id} className='border'>
            <a href={list.type + "/" + list.rowid} >
            <Row className='search-list p-2'>
            <Col> {list.name}</Col>
            <Col>{list.location}</Col>
            <Col>Status</Col>
            <Col>{(list.lookingForTeams === undefined ? "N/A" : (list.lookingForTeams ? "Yes" : "No"))}</Col>
            <Col>{(list.lookingForTeams === undefined ? "N/A" : (list.lookingForTeams ? "Yes" : "No"))}</Col>
            <Col>{(list.sportsType === undefined ? "N/A" : list.sportsType)}</Col>
          </Row>
          </a>
          
          </li>
            )}
            
                    {leagueResultsFilter === true &&
                    filteredLeague.map(league=>
         <li key={league.id} className='border'>
            <a href={"league/"+ league.id} >
            <Row className='search-list p-2'>
            <Col> {league.name}</Col>
            <Col>{league.location}</Col>
            <Col>Status</Col>
            <Col>{}</Col>
            <Col>{league.lookingForTeams ? "Yes" : "No"} </Col>
            <Col>{(league.sportsType === undefined ? "N/A" : league.sportsType)}</Col>
          </Row>
          </a>
          
          </li>
         
         )}
                    {playerResultsFilter === true &&
          filteredPlayers.map(player => 
          
            <li key={player.id} className='border'>
            <a href={"league/"+ player.id} >
            <Row className='search-list p-2'>
            <Col> {player.name}</Col>
            <Col>{player.location}</Col>
            <Col>Status</Col>
            <Col>N/A</Col>
            <Col>{player.lookingForTeams ? "Yes" : "No"} </Col>
            <Col>{(player.sportsType === undefined ? "N/A" : player.sportsType)}</Col>
          </Row>
          </a>
          
          </li>
          
          
          )}
 {teamResultsFilter === true &&
                    filteredTeam.map(team=>
         <li key={team.id} className='border'>
            <a href={"league/"+ team.id} >
            <Row className='search-list p-2'>
            <Col> {team.name}</Col>
            <Col>{team.location}</Col>
            <Col>Status</Col>
            <Col>N/A</Col>
            <Col>{team.lookingForTeams ? "Yes" : "No"} </Col>
            <Col>{(team.sportsType === undefined ? "N/A" : team.sportsType)}</Col>
          </Row>
          </a>
          
          </li>
         
         )}

{sportBResultsFilter === true &&
                    filteredSportsB.map(sport=>
         <li key={sport.id} className='border'>
            <a href={"league/"+ sport.id} >
            <Row className='search-list p-2'>
            <Col> {sport.name}</Col>
            <Col>{sport.location}</Col>
            <Col>Status</Col>
            <Col>N/A</Col>
            <Col>{sport.lookingForTeams ? "Yes" : "No"} </Col>
            <Col>{(sport.sportsType === undefined ? "N/A" : sport.sportsType)}</Col>
          </Row>
          </a>
          
          </li>
         
         )}

{sportSResultsFilter === true &&
                    filteredSportsS.map(sport=>
         <li key={sport.id} className='border'>
            <a href={"league/"+ sport.id} >
            <Row className='search-list p-2'>
            <Col> {sport.name}</Col>
            <Col>{sport.location}</Col>
            <Col>Status</Col>
            <Col>N/A</Col>
            <Col>{sport.lookingForTeams ? "Yes" : "No"} </Col>
            <Col>{(sport.sportsType === undefined ? "N/A" : sport.sportsType)}</Col>
          </Row>
          </a>
          
          </li>
         
         )}
          </ul>
        </div>
        
}

</div>


</>
  );
}

export default Search;