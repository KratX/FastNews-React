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
      <Route exact path="/" element={<News/>}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
