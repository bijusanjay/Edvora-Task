import { useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";

import {
  Popover,
  OverlayTrigger,
  Button,
  Card,
  Dropdown,
} from "react-bootstrap";
import "./Filter.css";

const Filter = (props) => {

  const { data, key, filters } = props;
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {

    let city = new Set();
    let state = new Set();
    data.forEach((ride) => {
      city.add(ride.city);
      state.add(ride.state);
    });
    setCities([...city]);
    setStates([...state]);

  }, [key]);
  
  const popover = (
    <Popover id="popover-basic filter-popover">
      <Card className="filter-box" body>
      <div className="filter-name">
      Filters
      </div>
        <Dropdown autoClose="inside">
          <Dropdown.Toggle className="dropdown-btn">
            State
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {states.map((state, idx) => (
              <Dropdown.Item
                key={idx}
                onClick={() => props.setFilters({ ...filters, state })}
                class="dropdown-item"
              >
                {state}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown autoClose="inside">
          <Dropdown.Toggle className="dropdown-btn">
            City
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {cities.map((city, idx) => (
              <Dropdown.Item
                key={idx}
                onClick={() => props.setFilters({ ...filters, city })}
                class="dropdown-item"
              >
                {city}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Card>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="left" overlay={popover} className="filter-popover">
      <Button className="filter" variant="Light">
      <BsFilterLeft/> Filter
      </Button>
    </OverlayTrigger>
  );
};

export default Filter;
