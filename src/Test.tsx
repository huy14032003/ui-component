import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Eye, Code2 } from 'lucide-react';
import { PrettyCode } from './components/ui/pretty-code/PrettyCode';

import { DashboardLayout } from './components/ui/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card/Card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion/Accordion';
import { VsCodeIDE } from './components/ui/vs-code/VsCodeIDE';

// Import all pages
import {FormShowcase} from './pages/FormShowcase';
import ButtonPage from './pages/ButtonPage';
import BadgePage from './pages/BadgePage';
import CheckboxPage from './pages/CheckboxPage';
import RadioPage from './pages/RadioPage';
import SwitchPage from './pages/SwitchPage';
import ProgressPage from './pages/ProgressPage';
import SliderPage from './pages/SliderPage';
import InputPage from './pages/InputPage';
import SelectPage from './pages/SelectPage';
import ComboBoxPage from './pages/ComboBoxPage';
import DatePickerPage from './pages/DatePickerPage';
import TabsPage from './pages/TabsPage';
import AccordionPage from './pages/AccordionPage';
import CollapsiblePage from './pages/CollapsiblePage';
import PopoverPage from './pages/PopoverPage';
import TooltipPage from './pages/TooltipPage';
import AlertPage from './pages/AlertPage';
import AvatarPage from './pages/AvatarPage';
import SkeletonPage from './pages/SkeletonPage';
import SpinnerPage from './pages/SpinnerPage';
import DialogModal from './pages/DialogModal';
import AlertDialogPage from './pages/AlertDialogPage';
import TablePage from './pages/TablePage';
import TransactionPage from './pages/TransactionPage';
import CalendarPage from './pages/CalendarPage';
import DrawerPage from './pages/DrawerPage';
import PreviewCardPage from './pages/PreviewCardPage';
import RatePage from './pages/RatePage';
import TogglePage from './pages/TogglePage';
import SidebarPage from './pages/SidebarPage';

// ─────────────────────────────────────────────────────────────────────────────
// Shared Helpers (Cho Documentation)
// ─────────────────────────────────────────────────────────────────────────────

export const ShowcaseCard = ({
  title, description, children, code, dark,
}: {
  title: string; description?: string; children: React.ReactNode; code?: string; dark?: boolean;
}) => (
  <Card className="mb-8 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
    <CardHeader className="bg-muted/50 border-b border-border/50">
      <CardTitle className="text-primary flex items-center gap-2 text-base">
        <Eye className="w-4 h-4" /> {title}
      </CardTitle>
      {description && <CardDescription className="mt-1">{description}</CardDescription>}
    </CardHeader>
    <CardContent className={`p-8 ${dark ? 'bg-zinc-900 rounded-b-xl' : ''}`}>
      <div className="flex flex-wrap gap-4 items-end">
        {children}
      </div>
    </CardContent>
    {code && (
      <Accordion>
        <AccordionItem value="code" className="border-t border-border/50">
          <AccordionTrigger className="px-6 py-3 hover:bg-muted transition-colors" hideChevron>
            <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" /> Xem mã nguồn
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 ove">
            <PrettyCode 
              code={code} 
              className="p-6 text-xs overflow-auto leading-relaxed max-h-[400px]" 
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )}
  </Card>
);

export const PageHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
    <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
    <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Root Application
// ─────────────────────────────────────────────────────────────────────────────

const Test = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/components/vscode" element={<VsCodeIDE />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<TransactionPage />} />

        {/* Các trang Component đã được tách ra file riêng trong src/pages/ */}
        <Route path="components/button" element={<ButtonPage />} />
        <Route path="components/badge" element={<BadgePage />} />
        <Route path="components/checkbox" element={<CheckboxPage />} />
        <Route path="components/radio" element={<RadioPage />} />
        <Route path="components/switch" element={<SwitchPage />} />
        <Route path="components/progress" element={<ProgressPage />} />
        <Route path="components/slider" element={<SliderPage />} />
        <Route path="components/input" element={<InputPage />} />
        <Route path="components/select" element={<SelectPage />} />
        <Route path="components/combobox" element={<ComboBoxPage />} />
        <Route path="components/datepicker" element={<DatePickerPage />} />
        <Route path="components/tabs" element={<TabsPage />} />
        <Route path="components/accordion" element={<AccordionPage />} />
        <Route path="components/collapsible" element={<CollapsiblePage />} />
        <Route path="components/popover" element={<PopoverPage />} />
        <Route path="components/tooltip" element={<TooltipPage />} />
        <Route path="components/alert" element={<AlertPage />} />
        <Route path="components/avatar" element={<AvatarPage />} />
        <Route path="components/skeleton" element={<SkeletonPage />} />
        <Route path="components/spinner" element={<SpinnerPage />} />
        <Route path="components/dialog" element={<DialogModal />} />
        <Route path="components/alert-dialog" element={<AlertDialogPage />} />
        <Route path="components/table" element={<TablePage />} />
        <Route path="components/advanced-form" element={<FormShowcase />} />
        <Route path="components/calendar" element={<CalendarPage />} />
        <Route path="components/drawer" element={<DrawerPage />} />
        <Route path="components/preview-card" element={<PreviewCardPage />} />
        <Route path="components/rate" element={<RatePage />} />
        <Route path="components/toggle" element={<TogglePage />} />
        <Route path="components/sidebar" element={<SidebarPage />} />

        <Route path="*" element={<div className="p-20 text-center text-muted-foreground">Đang xây dựng...</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Test;