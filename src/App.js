import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import StoryBook from "./pages/StoryBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storybook/:id" element={<StoryBook />} />
      </Routes>
    </Router>
  );
}

export default App;
