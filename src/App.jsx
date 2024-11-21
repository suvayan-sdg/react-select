import Select from "react-select";
import makeAnimated from "react-select/animated";

import { useEffect, useState } from "react";
import axios from "axios";

const animatedComponents = makeAnimated();
export default function App() {
  const [names, setNames] = useState({});
  const [phone, setPhone] = useState({});
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataNames = await axios.get("../data/names.json");
        const dataPhone = await axios.get("../data/phone.json");
        setNames(dataNames.data);
        setPhone(dataPhone.data);
        const transformedData = Object.keys(dataNames.data).map((code) => ({
          value: code,
          imgName: `${code.toLowerCase()}.png`,
          country: dataNames.data[code],
          phone: dataPhone.data[code],
          label: (
            <div>
              {" "}
              <img
                src={`/w80/${code.toLowerCase()}.png`}
                alt={`${dataNames.data[code]} flag`}
              />{" "}
              <span>{dataNames.data[code]}</span>{" "}
              <span>{dataPhone.data[code]}</span>{" "}
            </div>
          ),
        }));
        setOptions(transformedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h1>React Select</h1>
          <MyComponent options={options} />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, odit ab! Commodi cumque placeat sint officia fugit
            ipsum unde nobis fugiat numquam libero eveniet error, odio adipisci.
            Doloribus, labore facilis?
          </p>
        </div>
      </div>
    </div>
  );
}
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

// const countries =

const MyComponent = ({ options }) => (
  <Select
    className="react-select-container"
    classNamePrefix="react-select"
    options={options}
    unstyled
    placeholder="Select your Industry/ Domain"
    defaultMenuIsOpen={true}
    isMulti
    components={animatedComponents}
  />
);
