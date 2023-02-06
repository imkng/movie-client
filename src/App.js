import "./App.css";
import apiConfig from "./api/apiConfig";
import { useState, useEffect } from "react";
import Layout from "./component/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./component/home/Home";

function App() {
  const [movies, setMovies] = useState();

  const getMovies = async () => {
    try {
      const response = await apiConfig.get("/api/v1/movies");
      console.log("Hello");
      console.log(response.data);
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home movies={movies} />} ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
