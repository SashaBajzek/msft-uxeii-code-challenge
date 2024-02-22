import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import AllResults from "../../pages/AllResults/AllResults";
import SubBreedDetails from "../../pages/SubBreedDetails/SubBreedDetails";
import BreedDetails from "../../pages/BreedDetails/BreedDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Routes>
            <Route path="/:breed" element={<BreedDetails />} />
            <Route path="/:breed/:subBreed" element={<SubBreedDetails />} />
            <Route path="/" element={<AllResults />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
