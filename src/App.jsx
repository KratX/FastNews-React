import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigationbar } from "./components/Navbar";
import { News } from "./components/News";
import { Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigationbar />
      <Routes>
      <Route exact path="/" element={<News category="general"/>}></Route>
      <Route exact path="/business" key="business" element={<News category="business"/>}></Route>
      <Route exact path="/entertainment" key="entertainment" element={<News category="entertainment"/>}></Route>
      <Route exact path="/health" element={<News category="health"/>}></Route>
      <Route exact path="/science" element={<News category="science"/>}></Route>
      <Route exact path="/sports" element={<News category="sports"/>}></Route>
      <Route exact path="/technology" element={<News category="technology"/>}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
