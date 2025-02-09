import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Container,Row,Col, Button, Card, Image, ListGroup} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './teamdetails.css'
import { BsGearFill } from "react-icons/bs";
import useAuth, {checkIfSignedIn, getToken} from "../hooks/auth";

const LeagueDetails = () => {

  const navigate = useNavigate(); 
  const routeParams = useParams();
  const navigateUpdateLeague = () => { navigate(`/updateleague/${routeParams.leagueid}`) }   // temp id only
  const token = `Bearer ${getToken()}`;
  const {isSignedIn} = useAuth();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [teamJoinedWith, handleJoinLeague] = useState("");
  const [joinMsg, handleJoinMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  let [orderedDates, setOrderedDates] = useState([]);
  const [leagueInfo, setLeagueInfo] = useState({leagueId: "", leagueName: "", location: "", sports:"",
    status:"", lookingForTeams:"", division: "",
    description: "", ageGroup: "", numberOfRounds: "", numberOfTeams: "",
    teams: [], matches: [],
    displayUpdateButton:null, displayTurnOnLookingForTeams: null,
    displayTurnOffLookingForTeams:null, displayUnjoinButton: null, 
    displayJoinButton: null, teamsCreated : [], displayCancelReqButton: null,
    pendingRequestId: null, displayStartLeagueButton: null, displayPendingStartLeagueInd: null,
    pendingStartLeagueRequestId :null,
    startDate:"", endDate:"", minApprovals: 999
  })


  const backend = import.meta.env.MODE === "development" ? "http://localhost:8000" : "https://sourcerers-leaguemgmt.onrender.com";
  const backendPhotos = 'https://playpal-images.s3.amazonaws.com/images';



  useEffect(() => {
    setLoading(true)
      fetch(`${backend}/league/${routeParams.leagueid}`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "Application/JSON",
            "Authorization": token
        }
      })
      .then(response => response.json())
      .then(data=>{
        if (data.requestStatus === 'RJCT') {
            setErrorMessage([data.errMsg])
            if (data.errField !== "") {
                document.getElementById(data.errField).focus()
            }
        } else {
          setLeagueInfo({leagueId: data.details.leagueId, leagueName: data.details.leagueName, location: data.details.location, sports:data.details.sportsName,
              status:data.details.status, lookingForTeams:data.details.lookingForTeams, division: data.details.division,
              description: data.details.description, ageGroup: data.details.ageGroup, numberOfRounds: data.details.numberOfRounds, numberOfTeams: data.details.numberOfTeams,
              teams: data.details.teams, matches: data.details.matches, startDate: data.details.startDate,endDate: data.details.endDate,
              displayUpdateButton:data.buttons.displayUpdateButton, displayTurnOnLookingForTeams: data.buttons.displayTurnOnLookingForTeams,
              displayTurnOffLookingForTeams:data.buttons.displayTurnOffLookingForTeams, displayUnjoinButton: data.buttons.displayUnjoinButton, 
              displayJoinButton: data.buttons.displayJoinButton, teamsCreated : data.buttons.teamsCreated, displayCancelReqButton: data.buttons.displayCancelReqButton,
              pendingRequestId: data.buttons.pendingRequestId, displayStartLeagueButton: data.buttons.displayStartLeagueButton, displayPendingStartLeagueInd: data.buttons.displayPendingStartLeagueInd,
              pendingStartLeagueRequestId :data.buttons.pendingStartLeagueRequestId, minApprovals: data.buttons.minApprovals
            })
          setLoading(false)
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
    
},[]);

const handleJoin = () => {
  if (leagueInfo.teamsCreated.length > 0) {
    handleJoinLeague(leagueInfo.teamsCreated[0].teamId)
    setShow(true)
  }
}

const handleTurnOnLookingForTeams = () => {
  if(confirm(`Please confirm if you want to turn on looking for teams for this league.`)){
    fetch(`${backend}/lookingforteamson/${routeParams.leagueid}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
          "Content-Type": "Application/JSON",
          "Authorization": token
      }
    })
    .then(response => response.json())
    .then(data=>{
      if (data.requestStatus === 'RJCT') {
          setErrorMessage([data.errMsg])
      } else {
        setLeagueInfo({...leagueInfo, displayTurnOnLookingForTeams : false, displayTurnOffLookingForTeams: true})
      }
    })
  }
}

const handleTurnOffLookingForTeams = () => {
  if(confirm(`Please confirm if you want to turn off looking for teams.`)){
    fetch(`${backend}/lookingforteamsoff/${routeParams.leagueid}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
          "Content-Type": "Application/JSON",
          "Authorization": token
      }
    })
    .then(response => response.json())
    .then(data=>{
      if (data.requestStatus === 'RJCT') {
          setErrorMessage([data.errMsg])
      } else {
        setLeagueInfo({...leagueInfo, displayTurnOnLookingForTeams : true, displayTurnOffLookingForTeams: false})
      }
    })
  }


}

const handleCancelJoin = () => {
  if (leagueInfo.pendingRequestId !== "") {
    if (confirm("Please confirm if you want to proceed with join request cancellation.")) {
      fetch(`${backend}/cancelrequest/${leagueInfo.pendingRequestId}`, {
          method: "POST",
          credentials: 'include',
          headers: {
              "Content-Type": "Application/JSON",
              "Authorization": token
          }
      })
      .then(response => response.json())
      .then(data=>{
          if (data.requestStatus === 'RJCT') {
              setErrorMessage([data.errMsg])
          } else {
            setLeagueInfo({...leagueInfo, displayJoinButton : true, displayUnjoinButton: false, displayCancelReqButton:false, pendingRequestId: ""})
          }
      }).catch((error) => {
          console.log(error)
      })
    }
  }
}

const handleUnjoin = () => {
    if (confirm(`Please confirm to leave the league${leagueInfo.leagueName}.`)) {
      fetch(`${backend}/unjoinleague/${routeParams.leagueid}`, {
          method: "POST",
          credentials: 'include',
          headers: {
              "Content-Type": "Application/JSON",
              "Authorization": token
          }
      })
      .then(response => response.json())
      .then(data=>{
          if (data.requestStatus === 'RJCT') {
              setErrorMessage([data.errMsg])
          } else {
            if(leagueInfo.lookingForTeams){
              setLeagueInfo({...leagueInfo, displayJoinButton : true, displayUnjoinButton: false, displayCancelReqButton:false, pendingRequestId: "", displayTurnOffLookingForTeams: false, displayTurnOnLookingForTeams:false})
            }
            else{
              setLeagueInfo({...leagueInfo, displayJoinButton : false, displayUnjoinButton: false, displayCancelReqButton:false, pendingRequestId: "", displayTurnOffLookingForTeams: false, displayTurnOnLookingForTeams:false})
            
            }
            }
      }).catch((error) => {
          console.log(error)
      })
    
  }
}

const handleLeagueJoinChange = (e) => {
  handleJoinLeague(e.target.value)
}
const handleJoinLeagueMsg = (e) => {
  handleJoinMsg(e.target.value)
}

const sendJoin = () => {
  let data = {teamId: teamJoinedWith, msg: joinMsg}
  fetch(`${backend}/joinleague/${routeParams.leagueid}`, {
    method: "POST",
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "Application/JSON",
        "Authorization": token
    }
  })
  .then(response => response.json())
  .then(data=>{
    if (data.requestStatus === 'RJCT') {
        setErrorMessage([data.errMsg])
    } else {
      setLeagueInfo({...leagueInfo, displayJoinButton : false, displayCancelReqButton:true, displayUnjoinButton: false, pendingRequestId: data.pendingRequestId})
    }
  })
  setShow(false)
}

const handleStartLeague = () =>{
  if(leagueInfo.teams.length<3){
    alert("You cannot start the league with less than 3 teams.")
  }
  else{
    sendStartLeague();
  }
}

const sendStartLeague = () =>{
  if(confirm(`You are going to need ${leagueInfo.minApprovals} approvals to start the league. Please confirm if you want to proceed.`)){
    fetch(`${backend}/startleague/${routeParams.leagueid}`, {
      method: "POST",
      credentials: 'include',
      headers: {
          "Content-Type": "Application/JSON",
          "Authorization": token
      }
    })
    .then(response => response.json())
    .then(data=>{
      console.log(JSON.stringify(data))
      if (data.requestStatus === 'RJCT') {
          setErrorMessage([data.errMsg])
      } else {
        setLeagueInfo({...leagueInfo, displayPendingStartLeagueInd : true, displayStartLeagueButton: false})
      }
    })
    setShow(false)
  }
}










  return (
    <>
    
     <div className='d-flex w-100 position-absolute w-75 justify-content-end p-5' style={{zIndex:"1"}}>
     {isSignedIn && leagueInfo.displayUpdateButton===true && 
                    <Button onClick={navigateUpdateLeague} variant='transparent' className="btn btn-outline-success"><BsGearFill className="m-auto" /></Button>

                  }
      </div>
        
    <div className="App" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      
  
      
      
      




      <div className='bg-light container justify-content-center text-center'>
        {/* Here is the team header, with background and info */}
        
        <div className="bg-image mt-2 d-flex p-5 text-center shadow-1-strong rounded mb-3 text-white"
  style={{"backgroundImage": `url(${backendPhotos}/leaguebanners/${leagueInfo.leagueId}.jpeg), url(${backendPhotos}/leaguebanners/default.jpg)`, backgroundPosition:"center", backgroundSize:"cover"}} >
        <Container style={{"background-color":"rgba(0, 0, 0, 0.25)"}} className='rounded'>
      <Row className='text-center ms-5'>
      <Image src={`${backendPhotos}/leaguelogos/${leagueInfo.leagueId}.jpeg`} 
      onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src=`${backendPhotos}/teamlogos/default-image.jpeg`;
  }}
      className='border border-info shadow object-fit-cover ' roundedCircle fluid style={{ width: "10em", height: "10em"}}/>
        <Col><h1 className='header-text-info'>{leagueInfo.leagueName}</h1>
        <p className='information-text'>{leagueInfo.location==="" ? "TBD" : leagueInfo.location}</p>
        <p className='mt-3 information-text'>{leagueInfo.description}</p>
        

                    <>
                      {isSignedIn && leagueInfo.displayJoinButton &&
                    (<div><Button className='mt-2 mb-2 btn-success rounded-pill' onClick={handleJoin}>Join</Button></div>)
                      }
                    {isSignedIn && leagueInfo.displayCancelReqButton && 
                      (<div><Button className='mt-2 mb-2 btn-danger rounded-pill' onClick={handleCancelJoin}>Cancel Request</Button></div>)
                    }

                    {isSignedIn && leagueInfo.displayUnjoinButton && 
                      (<div className='mt-1'><Button className='mt-2 mb-2 btn-danger rounded-pill' onClick={handleUnjoin}>Unjoin</Button></div>)
                    }

                    {isSignedIn && leagueInfo.displayStartLeagueButton && 
                      (<div className='mt-1'><Button className='mt-2 mb-2 btn-success rounded-pill' onClick={handleStartLeague}>Start League</Button></div>)
                    }

                    {isSignedIn && leagueInfo.displayPendingStartLeagueInd && 
                      (<div className='mt-1'><Button className='mt-2 mb-2 btn-success rounded-pill' disabled>Pending to start league...</Button></div>)
                    }

                    {isSignedIn && leagueInfo.displayTurnOnLookingForTeams && 
                      (<div className='mt-1'><Button className='mt-2 mb-2 btn-success rounded-pill' onClick={handleTurnOnLookingForTeams}>Turn on looking for Teams</Button></div>)
                    }
                    {isSignedIn && leagueInfo.displayTurnOffLookingForTeams && 
                      (<div className='mt-1'><Button className='mt-2 mb-2 btn btn-dark rounded-pill' onClick={handleTurnOffLookingForTeams}>Turn off looking for Teams</Button></div>)
                    }

          
                    </>
                  
                  
        </Col>
        

      
      
      
      </Row>
      <Row className='text-start ms-5 mt-2'>
        
        <Col >
        {leagueInfo.sports == "Basketball" ? (
                       <Row> <p className='ms-5'><img
                          src="https://i.imgur.com/w14EKbv.png"
                          style={{ width: "2em", backgroundColor:"white", borderRadius:"50%"}}
                          className="text-center opacity-75 mt-2 position-relative"
                        /></p></Row>
                      ) : (
                        <Row><p className='ms-5'><img
                          src="https://i.imgur.com/7Qa798a.png"
                          style={{ width: "2em", backgroundColor:"white", borderRadius:"50%"}}
                          className="text-center opacity-75 mt-2 position-relative"
                        /></p></Row>
                      )}
        <Row><p className='information-text'>Division : {leagueInfo.division}</p></Row>
        
        <Row><p className='information-text'>Age Group : {leagueInfo.ageGroup}</p></Row>
        </Col>
        <Col className='text-end me-3'>
        <Row><p className='information-text'>Start Date : {leagueInfo.startDate==="" ? "TBD" : new Date(leagueInfo.startDate).toLocaleDateString('en-US')}</p></Row>
        <Row><p className='information-text'>End Date : {leagueInfo.endDate==="" ? "" : new Date(leagueInfo.endDate).toLocaleDateString('en-US')}</p></Row>
        <Row><p className='information-text'>Rounds : {leagueInfo.numberOfRounds}</p></Row>
        <Row><p className='information-text'>Teams : {leagueInfo.numberOfTeams }</p></Row>
      </Col>
      </Row>

    


    </Container>
    </div>

{/* Here is the team players and listing */}
<Row className=''>
        <Col className='border'>
        <div className='team-past-matches'>
          <h2 className='center-header gap-divider'>Teams</h2>
         <Row className='mb-5 mx-5'>
          
          {leagueInfo.teams.length<1 ? <h4 className='center-header'>No teams yet.</h4>:
          leagueInfo.teams.map((team)=>(
            <Col className='league-details-team-listing text-break ms-5 mt-5' md={1} key={team.teamId} >
            
            <a href={`/team/${team.teamId}`} className='general-link-no-dec'><Image src={`${backendPhotos}/teamlogos/${team.teamId}.jpeg`}  className='object-fit-cover ml-auto' roundedCircle fluid style={{ width: "5em", height: "5em", minHeight:"3em", minWidth:"3em"}}/>
            {team.teamName}</a>
            
            </Col>
          ))}
          
          
         
            
         
         </Row>

          </div>
        </Col>
        </Row>


    <div className='mt-20 container justify-content-center text-center gap-divider'>
{/* This is for the past matches list for the team */}
      <Row className=''>
        <Col sm={8} className='border'>
        <div className='team-past-matches overflow-y-scroll' style={{maxHeight:"50em", "overflow-x": "hidden"}}>
          <h2 className='center-header gap-divider'>Team Matchups</h2>
          <Row className='text-center mx-1'>
              <Col md={3}>
              <h6 className='border-bottom border-secondary'>Date</h6>
              </Col>
              <Col md={6}>
              <h6 className='border-bottom border-secondary'>Teams</h6>
              </Col>
              <Col md={3}>
              <h6 className='border-bottom border-secondary'>Location</h6>
              </Col>
              </Row>
      <Row>
        <Col sm={12} >
          <ListGroup >
            
              {leagueInfo.matches.map((match)=>(
                <ListGroup.Item action variant="secondary" href={`/match/${match.matchId}`} className='mt-2' key={match.matchId}>
                <Row className='text-center'>
              <Col md={3}>
              {match.dateOfMatch===null ? "TBD" : new Date(match.dateOfMatch).toLocaleDateString('en-US')}
              </Col>
              <Col md={6}>
              <strong>{match.team1.finalScore===null ? "" : match.team1.finalScore+ " "}</strong>
              <Image
                          src={`${backendPhotos}/teamlogos/${match.team1.teamId}.jpeg`}
                          className="shadow object-fit-cover border"
                          rounded
                          style={{  width: "2em", height: "2em" }}
                        />
                        -
                        <Image
                          src={`${backendPhotos}/teamlogos/${match.team2.teamId}.jpeg`}
                          className="shadow object-fit-cover border"
                          rounded
                          style={{  width: "2em", height: "2em" }}
                        />
                       <strong> { " "+ match.team2.finalScore===null ? "" : match.team2.finalScore }</strong>
                             
              </Col>
              <Col md={3}>
              {match.locationOfMatch===null ? "TBD" : match.locationOfMatch}
              </Col>
              </Row>
              </ListGroup.Item>
              ))}
              
          
          </ListGroup>
        </Col>
        <Col sm={8}>
          
        </Col>
      </Row>

          </div>
        </Col>
        <Col sm={4} className='container '>
        {leagueInfo.matches.length > 0 &&
        <Col sm={12} className='border'>
        <div className='team-past-matches overflow-y-scroll' style={{maxHeight:"50em", "overflow-x": "hidden"}}>
          <h2 className='center-header gap-divider mt-5 mb-4  '>Leaderboard</h2>
          <Row className='text-center mx-1'>
          <Col md={2}>
              <h6 className='border-bottom border-secondary'>Rank</h6>
              </Col>
              <Col>
              <h6 className='border-bottom border-secondary'>Team</h6>
              </Col>
              <Col>
              <h6 className='border-bottom border-secondary'>Points</h6>
              </Col>
              </Row>
              
      <Row>
        <Col sm={12} >
          <ListGroup >
            
              {leagueInfo.teams.map((team, index)=>(
                <ListGroup.Item action variant="secondary" href={`/team/${team.teamId}`} className='mt-2' key={team.teamId}>
                <Row className='text-center'>
                  <Col md={2}>{index+1}</Col>
              <Col>
              <Image
                          src={`${backendPhotos}/teamlogos/${team.teamId}.jpeg`}
                          className="shadow object-fit-cover border"
                          rounded
                          style={{  width: "2em", height: "2em" }}
                        /> {" " + team.teamName}
                             
              </Col>
              <Col>
              <strong>{team.totalLeaguePts+ " "}</strong></Col>
              </Row>
              </ListGroup.Item>
              ))}
              
          
          </ListGroup>
        </Col>
        <Col sm={8}>
          
        </Col>
      </Row>
 
          </div>
        </Col>
      }
        </Col>
      
      </Row>
      </div>
    </div>


{/* Modal opening up after clicking Join */}
<Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Choose a team to join this league with</Form.Label>
            <select id="teamJoinedWith" name="teamJoinedWith" className="form-control" value={teamJoinedWith} onChange={handleLeagueJoinChange}>
                {leagueInfo.teamsCreated.map((option) => (
                    <option value={option.teamId} key={option.teamId}>{option.teamName}</option>
                ))}
            </select>
            <br/><br/>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Explain shortly why you want to join your team to this league.</Form.Label>
              <Form.Control as="textarea" rows={3} name="inviteMsg" value={joinMsg} onChange={handleJoinLeagueMsg}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={sendJoin}>
            Confirm Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
}

export default LeagueDetails;