
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, BarChart3, FlaskConical, TrendingUp, 
  Settings, Shield, Users, LogOut, 
  FileText, Calendar, Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isCollapsed }) => {
  const { user, logout } = useAuth();

  const navigationItems = [
    { id: 'home', label: 'Início', icon: Home, roles: ['admin', 'user', 'analyst'] },
    { id: 'quality-metrics', label: 'Métricas', icon: BarChart3, roles: ['admin', 'user', 'analyst'] },
    { id: 'control-charts', label: 'Cartas de Controle', icon: TrendingUp, roles: ['admin', 'analyst'] },
    { id: 'reference-materials', label: 'Materiais de Ref.', icon: FlaskConical, roles: ['admin', 'analyst'] },
    { id: 'reports', label: 'Relatórios', icon: FileText, roles: ['admin', 'user', 'analyst'] },
    { id: 'calendar', label: 'Agenda', icon: Calendar, roles: ['admin', 'user', 'analyst'] },
  ];

  const adminItems = [
    { id: 'admin-panel', label: 'Painel Admin', icon: Shield, roles: ['admin'] },
    { id: 'user-management', label: 'Usuários', icon: Users, roles: ['admin'] },
  ];

  const userItems = [
    { id: 'notifications', label: 'Notificações', icon: Bell, roles: ['admin', 'user', 'analyst'] },
    { id: 'user-settings', label: 'Configurações', icon: Settings, roles: ['admin', 'user', 'analyst'] },
  ];

  const canAccess = (roles: string[]) => {
    return user && roles.includes(user.role);
  };

  const NavItem = ({ item, onClick }: { item: any, onClick: () => void }) => (
    <Button
      variant={currentPage === item.id ? "default" : "ghost"}
      className={cn(
        "w-full justify-start gap-3 h-12",
        isCollapsed && "px-2",
        currentPage === item.id && "bg-primary text-primary-foreground"
      )}
      onClick={onClick}
    >
      <item.icon size={20} />
      {!isCollapsed && <span>{item.label}</span>}
    </Button>
  );

  return (
    <div className={cn(
      "bg-white border-r border-slate-200 flex flex-col h-full transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-slate-800">ISO 17025</h2>
              <p className="text-xs text-slate-600">Qualidade Lab</p>
            </div>
          )}
        </div>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary font-semibold">
            {user?.name?.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-800 truncate">{user?.name}</p>
              <p className="text-xs text-slate-600 truncate">
                {user?.role === 'admin' ? 'Administrador' : 
                 user?.role === 'analyst' ? 'Analista' : 'Usuário'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Main navigation */}
        <div className="space-y-2">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Principal
            </p>
          )}
          {navigationItems.map((item) => (
            canAccess(item.roles) && (
              <NavItem
                key={item.id}
                item={item}
                onClick={() => onPageChange(item.id)}
              />
            )
          ))}
        </div>

        {/* Admin section */}
        {user?.role === 'admin' && (
          <div className="space-y-2">
            {!isCollapsed && (
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Administração
              </p>
            )}
            {adminItems.map((item) => (
              canAccess(item.roles) && (
                <NavItem
                  key={item.id}
                  item={item}
                  onClick={() => onPageChange(item.id)}
                />
              )
            ))}
          </div>
        )}

        {/* User section */}
        <div className="space-y-2">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Usuário
            </p>
          )}
          {userItems.map((item) => (
            canAccess(item.roles) && (
              <NavItem
                key={item.id}
                item={item}
                onClick={() => onPageChange(item.id)}
              />
            )
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 h-12 text-red-600 border-red-200 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Sair</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
