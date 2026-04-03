import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ComboBox } from '../combobox/ComboBox';
import { flattenSearchableRoutes, type RouteConfig } from '../../../../routes';

import * as Icon from "@/components/ui/icons";
import { cn } from '@/lib/utils/cn';
import { ThemeToggle } from '../ThemeToggle';
import { Tooltip } from '../tooltip/Tooltip';
import {
  SidebarProvider,
  Sidebar,
  SidebarRail,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarNavLink,
  SidebarMenuCollapsible,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
  UserMenuPopover,
  UserMenuItem,
  useSidebar,
} from '../sidebar/Sidebar';
import { ROUTES } from '../../../../routes';

// ─── SidebarNavItem ──────────────────────────────────────────────────────────

interface SidebarNavItemProps {
  route: RouteConfig;
  parentPath?: string;
  isCollapsed: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ route, parentPath = '', isCollapsed }) => {
  const location = useLocation();
  
  // Tính toán path tuyệt đối
  const absolutePath = [parentPath, route.prefix, route.path]
    .filter(Boolean)
    .join('/')
    .replace(/\/+/g, '/');

  const hasChildren = route.children && route.children.length > 0;

  // Kiểm tra xem có node con nào đang active không (để tự động mở group)
  const isAnyChildActive = React.useMemo(() => {
    if (!hasChildren) return false;
    const checkActive = (items: RouteConfig[]): boolean => {
      return items.some(item => {
        const itemAbsPath = [absolutePath, item.prefix, item.path]
          .filter(Boolean)
          .join('/')
          .replace(/\/+/g, '/');
        if (location.pathname === itemAbsPath) return true;
        if (item.children) return checkActive(item.children);
        return false;
      });
    };
    return checkActive(route.children ?? []);
  }, [hasChildren, route.children, absolutePath, location.pathname]);

  if (hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuCollapsible
          id={route.label}
          icon={route.icon}
          label={route.label}
          isChildActive={isAnyChildActive}
        >
          {route.children!.map((child, index) => (
            <SidebarNavItem 
              key={index} 
              route={child} 
              parentPath={absolutePath} 
              isCollapsed={isCollapsed} 
            />
          ))}
        </SidebarMenuCollapsible>
      </SidebarMenuItem>
    );
  }

  // Nếu không có children nhưng có element -> Render Link
  if (route.element) {
    return (
      <SidebarMenuItem>
        <SidebarNavLink
          to={absolutePath === '' ? '/' : absolutePath}
          icon={route.icon}
          label={route.label}
          end={route.end}
          size="sm"
          badge={
            route.badge && !isCollapsed ? (
              <span className="text-[10px] bg-primary text-primary-foreground rounded px-1.5 py-0.5 font-medium leading-none">
                {route.badge}
              </span>
            ) : undefined
          }
        />
      </SidebarMenuItem>
    );
  }

  return null;
};

// ─── App Sidebar ──────────────────────────────────────────────────────────────

const AppSidebar: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarRail />
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                'flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-200',
                isCollapsed && 'justify-center'
              )}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-primary-foreground font-bold text-sm select-none">UI</span>
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate leading-tight">UI Library</p>
                  <p className="text-xs text-muted-foreground truncate leading-tight">Component Showcase</p>
                </div>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {['overview', 'general', 'forms', 'complex', 'overlays'].map((cat) => {
          const catRoutes = ROUTES.filter(r => r.category === cat);
          if (catRoutes.length === 0) return null;

          return (
            <SidebarGroup key={cat}>
              <SidebarGroupLabel className="capitalize">{cat}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {catRoutes.map((route, idx) => (
                    <SidebarNavItem 
                      key={idx} 
                      route={route} 
                      isCollapsed={isCollapsed} 
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
              <SidebarSeparator className="mt-2 opacity-50" />
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      {/* Footer — User menu */}
      <SidebarFooter className="border-t border-sidebar-border pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenuPopover
              name="admin2"
              email="admin@example.com"
              avatar="https://i.pravatar.cc/100"
            >
              <UserMenuItem icon={<Icon.Sparkles className="w-4 h-4" />}>
                Upgrade to Pro
              </UserMenuItem>
              <div className="h-px bg-border/50 my-1" />
              <UserMenuItem icon={<Icon.BadgeCheck className="w-4 h-4" />}>
                Account
              </UserMenuItem>
              <UserMenuItem icon={<Icon.BillingIcon className="w-4 h-4" />}>
                Billing
              </UserMenuItem>
              <UserMenuItem icon={<Icon.BellIcon className="w-4 h-4" />}>
                Notifications
              </UserMenuItem>
              <div className="h-px bg-border/50 my-1" />
              <UserMenuItem icon={<Icon.LogOut className="w-4 h-4" />} destructive>
                Log out
              </UserMenuItem>
            </UserMenuPopover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

// ─── Header Search ───────────────────────────────────────────────────────────

const HeaderSearch: React.FC = () => {
  const navigate = useNavigate();
  const searchItems = React.useMemo(() => flattenSearchableRoutes(), []);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Ctrl + K to focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex-1 max-w-sm mx-4 relative group hidden md:block">
      <ComboBox
        ref={inputRef}
        options={searchItems}
        placeholder="Tìm kiếm component... (Ctrl + K)"
        leftIcon={<Icon.Search className="w-4 h-4" />}
        className="w-full h-9 min-h-[36px]" // Tinh chỉnh chiều cao cho gọn
        onValueChange={(val) => {
          if (typeof val === 'string') {
            navigate(val);
          }
        }}
      />

      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-muted/50 text-[10px] font-medium text-muted-foreground pointer-events-none group-focus-within:opacity-0 transition-opacity">
        <span className="text-[8px]">⌘</span>K
      </div>
    </div>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────

const Header: React.FC = () => {
  const location = useLocation();
  const segments = location.pathname.replace(/^\//, '').split('/').filter(Boolean);

  return (
    <header className="h-[60px] bg-background/95 backdrop-blur-sm border-b border-border/50 flex items-center px-4 gap-3 sticky top-0 z-30">
      <SidebarTrigger />
      <div className="h-4 w-px bg-border/60" />
      <nav className="flex items-center gap-1 text-sm flex-1 min-w-0">
        <span className="text-muted-foreground hover:text-foreground transition-colors cursor-default">
          Home
        </span>
        {segments.map((seg, i) => (
          <React.Fragment key={i}>
            <Icon.ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
            <span
              className={
                i === segments.length - 1
                  ? 'text-foreground font-medium capitalize truncate'
                  : 'text-muted-foreground capitalize'
              }
            >
              {seg.replace(/-/g, ' ')}
            </span>
          </React.Fragment>
        ))}
      </nav>

      <HeaderSearch />

      <div className="flex items-center gap-2 shrink-0">
        <ThemeToggle />
        <img
          src="https://i.pravatar.cc/100"
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover border border-border cursor-pointer"
        />
      </div>
    </header>
  );
};

// ─── DashboardLayout ──────────────────────────────────────────────────────────

export const DashboardLayout = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(({ children }, ref) => {
  return (
    <div ref={ref} className="h-full w-full">
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/10">
          <div className="p-6 h-[calc(100vh-60px)] overflow-auto">
            {children ? children : <Outlet />}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
    </div>
  );
});

DashboardLayout.displayName = "DashboardLayout";
