import { useEffect, useState } from "react";
import axios from "axios";

export default function TestPage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("/api/property").then((res) => setProperties(res.data));
  }, []);

  return (
    <div>
      <h1>Properties:</h1>
      <ul>
        {properties.map((prop) => (
          <li key={prop.id}>
            {prop.name} - {prop.address}
          </li>
        ))}
      </ul>
    </div>
  );
}
