import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Main() {
  const [version, setVersion] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}/version`)
      .then(res => setVersion(res.data.version))
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>{version}</div>
  );
}
