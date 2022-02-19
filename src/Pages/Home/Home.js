import {
  Row,
  Col,
  Container,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Rides from "../../Components/Rides/Rides";
import Navbar from "../../Components/Navbar/Navbar";
import Filter from "../../Components/Filter/Filter";
import { ride, user } from "../../Constant";
import "./Home.css";

const { abs, min } = Math;
const tabs = ["current", "future", "past"];

const Home = () => {

  const [key, setKey] = useState(0);

  const [rides, setRides] = useState(ride);

  const [filters, setFilters] = useState({
    city: null,
    state: null,
  });

  // To find Nearest rides
  const sortRidesWithDistance = (ride) => {
    let userValue = user.station_code;

    let newRide = ride.map((r) => {
      let subtractedStationPath = r.station_path.map((c) => abs(c - userValue));
      let distance = min(...subtractedStationPath);
      let date = r.date * 1000;
      let formatDate = new Date(date).toString();
      return {
        ...r,
        date,
        distance,
        formatDate,
      };
    });

    return newRide.sort((a, b) => (a.distance > b.distance ? 1 : -1));
  };

  useEffect(() => {

    setRides(sortRidesWithDistance(rides));

  }, []);

  const tabChanged = (key) => {

    setKey(key);

  };

  const filterBySelection = (filteredData) => {
    if (filters.state) {
      filteredData = filteredData.filter((r) => r.state === filters.state);
    }
    if (filters.city) {
      filteredData = filteredData.filter((r) => r.city === filters.city);
    }
    return filteredData;
  };

  const overallFilter = (type) => {

    let filteredData = rides;

    if (type === "future") {
      filteredData = filteredData
        .filter((r) => new Date() < new Date(r.date))
        .sort((a, b) => (a.date > b.date ? 1 : -1));
    } else if (type === "past") {
      filteredData = filteredData
        .filter((r) => new Date() > new Date(r.date))
        .sort((a, b) => (a.date > b.date ? -1 : 1));
    }
    
    filteredData = filterBySelection(filteredData);

    return filteredData;

  };
  
  let finalData = overallFilter(tabs[key]);

  return (
    <div className="main">
      <Navbar />

      <Container className="cont">
        <Filter
          data={finalData}
          key={key}
          setFilters={setFilters}
          filters={filters}
        ></Filter>
        <Row className="body-row">
          <Col>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={tabChanged}
              className="mb-3 line tab"
            >
              <Tab eventKey={0} title="Nearest rides">
                <Rides ride={finalData} user={user}></Rides>
              </Tab>
              <Tab
                eventKey={1}
                title={`Upcoming Rides (${overallFilter("future").length})`}
              >
                <Rides type="future" ride={finalData} />
              </Tab>
              <Tab
                eventKey={2}
                title={`Past Rides (${overallFilter("past").length})`}
              >
                <Rides type="past" ride={finalData} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
