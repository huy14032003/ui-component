import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Settings, Star, LayoutDashboard,
  Square, Tag, UserCircle, Layers3, Loader2, TrendingUp,
  Bell, SlidersHorizontal, ListChecks, Circle, ChevronsUpDown,
  CalendarDays, Eye, ToggleLeft, PanelLeft, Type,
  Table2, Rows3, ChevronRight, Columns3, Menu, Code2,
  MessageSquare, Info, AlertTriangle, Lightbulb,
  BookOpen, Users, CreditCard, ShieldCheck,
  Sparkles, BadgeCheck, CreditCard as BillingIcon, Bell as BellIcon, LogOut,
} from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import {
  SidebarProvider,
  Sidebar,
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

// ─── Nav Config ───────────────────────────────────────────────────────────────

const NAV_OVERVIEW = [
  { to: '/', end: true, icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
];

const NAV_COLLAPSIBLES = [
  {
    id: 'general',
    icon: <BookOpen className="w-4 h-4" />,
    label: 'General',
    defaultOpen: true,
    prefix: '/components',
    items: [
      { to: '/components/button', icon: <Square className="w-4 h-4" />, label: 'Button' },
      { to: '/components/badge', icon: <Tag className="w-4 h-4" />, label: 'Badge' },
      { to: '/components/avatar', icon: <UserCircle className="w-4 h-4" />, label: 'Avatar' },
      { to: '/components/skeleton', icon: <Layers3 className="w-4 h-4" />, label: 'Skeleton' },
      { to: '/components/spinner', icon: <Loader2 className="w-4 h-4" />, label: 'Spinner' },
      { to: '/components/progress', icon: <TrendingUp className="w-4 h-4" />, label: 'Progress' },
      { to: '/components/alert', icon: <Bell className="w-4 h-4" />, label: 'Alert' },
      { to: '/components/calendar', icon: <CalendarDays className="w-4 h-4" />, label: 'Calendar' },
      { to: '/components/preview-card', icon: <Eye className="w-4 h-4" />, label: 'Preview Card' },
      { to: '/components/rate', icon: <Star className="w-4 h-4" />, label: 'Rate (Star)' },
    ],
  },
  {
    id: 'forms',
    icon: <Users className="w-4 h-4" />,
    label: 'Forms',
    defaultOpen: false,
    prefix: '/components',
    items: [
      { to: '/components/input', icon: <Type className="w-4 h-4" />, label: 'Input' },
      { to: '/components/select', icon: <ChevronsUpDown className="w-4 h-4" />, label: 'Select' },
      { to: '/components/datepicker', icon: <CalendarDays className="w-4 h-4" />, label: 'DatePicker' },
      { to: '/components/checkbox', icon: <ListChecks className="w-4 h-4" />, label: 'Checkbox' },
      { to: '/components/radio', icon: <Circle className="w-4 h-4" />, label: 'Radio Group' },
      { to: '/components/combobox', icon: <Columns3 className="w-4 h-4" />, label: 'ComboBox' },
      { to: '/components/switch', icon: <ToggleLeft className="w-4 h-4" />, label: 'Switch' },
      { to: '/components/slider', icon: <SlidersHorizontal className="w-4 h-4" />, label: 'Slider' },
      { to: '/components/toggle', icon: <ToggleLeft className="w-4 h-4" />, label: 'Toggle' },
      { to: '/components/advanced-form', icon: <Rows3 className="w-4 h-4" />, label: 'Advanced Form', badge: 'New' },
    ],
  },
  {
    id: 'complex',
    icon: <CreditCard className="w-4 h-4" />,
    label: 'Complex',
    defaultOpen: false,
    prefix: '/components',
    items: [
      { to: '/components/table', icon: <Table2 className="w-4 h-4" />, label: 'Data Table' },
      { to: '/components/tabs', icon: <Layers3 className="w-4 h-4" />, label: 'Tabs' },
      { to: '/components/accordion', icon: <ChevronRight className="w-4 h-4" />, label: 'Accordion' },
      { to: '/components/collapsible', icon: <Menu className="w-4 h-4" />, label: 'Collapsible' },
      { to: '/components/sidebar', icon: <PanelLeft className="w-4 h-4" />, label: 'Sidebar' },
      { to: '/components/vscode', icon: <Code2 className="w-4 h-4" />, label: 'VS Code IDE', badge: 'New' },
    ],
  },
  {
    id: 'overlays',
    icon: <ShieldCheck className="w-4 h-4" />,
    label: 'Overlays',
    defaultOpen: false,
    prefix: '/components',
    items: [
      { to: '/components/dialog', icon: <MessageSquare className="w-4 h-4" />, label: 'Dialog (Modal)' },
      { to: '/components/alert-dialog', icon: <AlertTriangle className="w-4 h-4" />, label: 'Alert Dialog' },
      { to: '/components/popover', icon: <Lightbulb className="w-4 h-4" />, label: 'Popover' },
      { to: '/components/tooltip', icon: <Info className="w-4 h-4" />, label: 'Tooltip' },
      { to: '/components/drawer', icon: <PanelLeft className="w-4 h-4" />, label: 'Drawer' },
    ],
  },
];

// ─── App Sidebar ──────────────────────────────────────────────────────────────

const AppSidebar: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={`flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
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
        {/* Overview */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_OVERVIEW.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarNavLink to={item.to} end={item.end} icon={item.icon} label={item.label} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Components Collapsible Groups */}
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_COLLAPSIBLES.map((group) => {
                // Detect xem có child nào đang active không
                const isChildActive = group.items.some((item) =>
                  location.pathname === item.to || location.pathname.startsWith(item.to + '/')
                );

                return (
                  <SidebarMenuItem key={group.id}>
                    <SidebarMenuCollapsible
                      id={group.id}
                      icon={group.icon}
                      label={group.label}
                      defaultOpen={group.defaultOpen}
                      isChildActive={isChildActive}
                    >
                      {group.items.map((item) => (
                        <SidebarNavLink
                          key={item.to}
                          to={item.to}
                          icon={item.icon}
                          label={item.label}
                          size="sm"
                          badge={
                            'badge' in item && !isCollapsed ? (
                              <span className="text-[10px] bg-primary text-primary-foreground rounded px-1.5 py-0.5 font-medium leading-none">
                                {(item as any).badge}
                              </span>
                            ) : undefined
                          }
                        />
                      ))}
                    </SidebarMenuCollapsible>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
              <UserMenuItem icon={<Sparkles className="w-4 h-4" />}>
                Upgrade to Pro
              </UserMenuItem>
              <div className="h-px bg-border/50 my-1" />
              <UserMenuItem icon={<BadgeCheck className="w-4 h-4" />}>
                Account
              </UserMenuItem>
              <UserMenuItem icon={<BillingIcon className="w-4 h-4" />}>
                Billing
              </UserMenuItem>
              <UserMenuItem icon={<BellIcon className="w-4 h-4" />}>
                Notifications
              </UserMenuItem>
              <div className="h-px bg-border/50 my-1" />
              <UserMenuItem icon={<LogOut className="w-4 h-4" />} destructive>
                Log out
              </UserMenuItem>
            </UserMenuPopover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
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
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
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

export const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
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
  );
};
