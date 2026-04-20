import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import MenuPage from "./pages/Menu.tsx";
import Reservation from "./pages/Reservation.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import BranchesPage from "./pages/BranchesPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import Admin from "./pages/Admin.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menyu" element={<MenuPage />} />
          <Route path="/bron" element={<Reservation />} />
          <Route path="/biz-haqimizda" element={<AboutPage />} />
          <Route path="/filiallar" element={<BranchesPage />} />
          <Route path="/aloqa" element={<ContactPage />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
