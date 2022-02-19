import { Row, Col, Card, Image } from "react-bootstrap";
import map from "../../assests/map.jpg";
import "./Rides.css"

const Rides = (props) => {
  const { ride } = props;

  return (
    <div className="page">
      <Row>
        {ride.map((obj, index) => {
          return (
            <Col>
              <Card
                className="box"
                style={{
                  width: "1280px",
                  background: "#171717",
									marginTop:"10px",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                <Card.Body>
                  <Card.Title className="proj-title"></Card.Title>
                  <Card.Subtitle className="mb-2 language"></Card.Subtitle>
                  <Card.Text>
                    <Row>
                      <Col>
                        <div className="img">
													<Image className="map-img" src={map} height={180} width={280} />
												</div>
                      </Col>

                      <Col>
                        <div className="text1">
                          <p>Ride Id : {obj.id}</p>
                          <p>Origin Station : {obj.origin_station_code}</p>
                          <p>station_path : [{obj.station_path?.join(", ") ?? obj.station_path}]</p>
                          <p>Date : {obj.formatDate}</p>
                          <p>Distance : {obj.distance}</p>
                        </div>
                      </Col>
                      <Col>
                      <div className="text3">
                        <div>
                            <p>
                              {obj.city}
                            </p>
                          </div>
                          <div>
                            <p>
                              {obj.state}
                            </p>
                          </div>
                      </div>
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Rides;
