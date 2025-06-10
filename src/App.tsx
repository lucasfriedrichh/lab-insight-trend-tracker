import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Reports from "@/components/Reports";

// Componentes
import LoginScreen from "@/components/LoginScreen";
import HomePage from "@/components/HomePage";
import AdminPanel from "@/components/AdminPanel";
import UserSettings from "@/components/UserSettings";
import Sidebar from "@/components/Sidebar";
import QualityMetrics from "@/components/QualityMetrics";
import ClientAnalyses from "@/components/ClientAnalyses";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-white text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'admin-panel':
        return user.role === 'admin' ? <AdminPanel /> : <HomePage />;
      case 'user-settings':
        return <UserSettings />;
      case 'quality-metrics':
        return <QualityMetrics />;
      case 'client-analyses':
        return <ClientAnalyses />;
      case 'reports':
        return <Reports />;
      case 'control-charts':
      case 'reference-materials':
      case 'calendar':
      case 'notifications':
      case 'user-management':
        return <Index />; // Usar componentes existentes
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${sidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      `}>
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isCollapsed={false}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden"
            >
              {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
            </Button>
            
            <div className="text-xs sm:text-sm text-slate-600 hidden sm:block">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>

            <div className="text-xs text-slate-600 sm:hidden">
              {new Date().toLocaleDateString('pt-BR')}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
