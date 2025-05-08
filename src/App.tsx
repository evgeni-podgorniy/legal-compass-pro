
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackButton from "./components/BackButton";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Documents from "./pages/Documents";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import Premium from "./pages/Premium";
import SubscriptionBanner from "./components/SubscriptionBanner";
import { useSubscription } from "./context/SubscriptionContext";
import './styles/premium.css';

const queryClient = new QueryClient();

const App = () => {
  const { isPremium, subscriptionTier, daysLeft } = useSubscription();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <BackButton />
          <SubscriptionBanner 
            isPremium={isPremium}
            subscriptionTier={subscriptionTier || ''}
            daysLeft={daysLeft}
          />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
