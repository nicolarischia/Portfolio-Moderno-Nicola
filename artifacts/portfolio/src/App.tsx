import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Competenze from "@/pages/competenze";
import Formazione from "@/pages/formazione";
import Contatti from "@/pages/contatti";
import Servizi from "@/pages/servizi";
import Progetti from "@/pages/progetti";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/competenze" component={Competenze} />
        <Route path="/formazione" component={Formazione} />
        <Route path="/servizi" component={Servizi} />
        <Route path="/contatti" component={Contatti} />
        <Route path="/progetti" component={Progetti} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
