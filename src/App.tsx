import { Route, Routes } from "react-router-dom";
import Aktualnosci from "./pages/Aktualnosci";
import Wrapper from "../src/components/Wrapper";
import Forum from "./pages/Forum/Forum";
import MyProfile from "./pages/MyProfile/MyProfile";
import SekcjaEkspercka from "./pages/SekcjaEkspercka/SekcjaEkspercka";
import Groups from "./pages/Grupy/Groups";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path="" element={<Aktualnosci />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/my_profile" element={<MyProfile />} />
          <Route path="/sekcja_ekspercka" element={<SekcjaEkspercka />} />
          <Route path="/grupy" element={<Groups />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
