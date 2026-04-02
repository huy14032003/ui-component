import React from 'react'
import { PageHeader, ShowcaseCard } from '@/Test'
import {
    SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup,
    SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem,
    SidebarMenuButton, SidebarMenuBadge, SidebarSeparator, SidebarFooter,
    SidebarInset, SidebarTrigger, SidebarMenuSkeleton
} from '@components/ui/sidebar/Sidebar'

const SidebarPage = () => {
    const [open, setOpen] = React.useState(true);
    return (
        <div className="max-w-5xl">
            <PageHeader title="Sidebar" description="Thanh điều hướng chuyên nghiệp với đầy đủ tính năng (collapsible, groups, menus)." />

            {/* Live Demo */}
            <ShowcaseCard title="Live Demo" description="Click nút toggle hoặc nhấn ⌘B / Ctrl+B để thu/mở sidebar.">
                <div className="rounded-xl border border-border overflow-hidden" style={{ height: 420 }}>
                    <SidebarProvider defaultOpen={open} onOpenChange={setOpen}>
                        <Sidebar collapsible="icon" className="h-[420px]! relative! border-0">
                            <SidebarHeader className="border-b border-border/50">
                                <div className="flex items-center gap-2 px-2 py-1.5">
                                    <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center shrink-0">
                                        <span className="text-primary-foreground text-xs font-bold">A</span>
                                    </div>
                                    {open && <span className="text-sm font-semibold text-foreground">Acme Inc</span>}
                                </div>
                            </SidebarHeader>

                            <SidebarContent>
                                <SidebarGroup>
                                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {[
                                                { to: '#', icon: '🏠', label: 'Dashboard' },
                                                { to: '#', icon: '📊', label: 'Analytics' },
                                                { to: '#', icon: '⚙️', label: 'Settings', badge: '3' },
                                            ].map((item) => (
                                                <SidebarMenuItem key={item.label}>
                                                    <SidebarMenuButton tooltip={item.label} isActive={item.label === 'Dashboard'}>
                                                        <span>{item.icon}</span>
                                                        {open && <span className="flex-1">{item.label}</span>}
                                                        {open && item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>

                                <SidebarSeparator />

                                <SidebarGroup>
                                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {['Project Alpha', 'Project Beta', 'Project Gamma'].map((p) => (
                                                <SidebarMenuItem key={p}>
                                                    <SidebarMenuButton tooltip={p}>
                                                        <div className="w-2 h-2 rounded-full bg-primary/60 shrink-0" />
                                                        {open && <span>{p}</span>}
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            </SidebarContent>

                            <SidebarFooter>
                                <SidebarMenuButton tooltip="shadcn">
                                    <img src="https://i.pravatar.cc/100" alt="" className="w-6 h-6 rounded-full" />
                                    {open && (
                                        <div className="flex-1 text-left text-xs overflow-hidden">
                                            <p className="font-medium truncate">shadcn</p>
                                            <p className="text-muted-foreground truncate">m@example.com</p>
                                        </div>
                                    )}
                                </SidebarMenuButton>
                            </SidebarFooter>
                        </Sidebar>

                        <SidebarInset className="h-[420px]! bg-muted/20">
                            <div className="flex items-center gap-2 px-4 h-12 border-b border-border/50 bg-background">
                                <SidebarTrigger />
                                <span className="text-sm text-muted-foreground">Toggle sidebar</span>
                            </div>
                            <div className="p-4 text-sm text-muted-foreground">Main content area</div>
                        </SidebarInset>
                    </SidebarProvider>
                </div>
            </ShowcaseCard>

            {/* Loading state */}
            <ShowcaseCard title="Loading Skeleton" description="Trạng thái loading với SidebarMenuSkeleton.">
                <div className="w-64 border border-border rounded-xl overflow-hidden bg-background">
                    <div className="p-3 border-b border-border/50">
                        <div className="h-8 w-32 rounded-md bg-muted animate-pulse" />
                    </div>
                    <div className="p-2 space-y-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <SidebarMenuSkeleton key={i} showIcon />
                        ))}
                    </div>
                </div>
            </ShowcaseCard>
        </div>
    );
};

export default SidebarPage;
