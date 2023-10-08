import "./App.css";
import MainStreet from "./components/streetInterception/MainStreet";
import SideStreet from "./components/streetInterception/SideStreet";

function App() {

  return (
    <div className="app">
      <div className="container">

        <MainStreet />
        <SideStreet />

      </div>
    </div>
  );
}

export default App;
