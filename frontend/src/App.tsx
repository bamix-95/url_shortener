import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
};

export default App;
