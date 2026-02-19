import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Suspense, lazy } from "react";
import Loading from "@/components/ui/loading";

// Lazy Load Pages for Performance
// Basic Pages
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const Services = lazy(() => import("@/pages/services"));
const Blogs = lazy(() => import("@/pages/blogs"));
const BlogDetail = lazy(() => import("@/pages/blog-detail"));
const Resources = lazy(() => import("@/pages/resources"));
const Investors = lazy(() => import("@/pages/investors"));
const Careers = lazy(() => import("@/pages/careers"));

// Ventures
const VenturesHub = lazy(() => import("@/pages/ventures"));
const VentureDetail = lazy(() => import("@/pages/ventures/venture-detail"));

// Legal
const PrivacyPolicy = lazy(() => import("@/pages/legal/privacy"));
const TermsOfService = lazy(() => import("@/pages/legal/terms"));

const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<Loading />}>
          <Switch>
            {/* Main Routes */}
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/services" component={Services} />

            {/* Blog */}
            <Route path="/blogs" component={Blogs} />
            <Route path="/blogs/:slug" component={BlogDetail} />

            <Route path="/resources" component={Resources} />
            <Route path="/investors" component={Investors} />
            <Route path="/careers" component={Careers} />

            {/* Ventures */}
            <Route path="/ventures" component={VenturesHub} />
            <Route path="/ventures/:slug" component={VentureDetail} />

            {/* Legal */}
            <Route path="/privacy" component={PrivacyPolicy} />
            <Route path="/terms" component={TermsOfService} />

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;