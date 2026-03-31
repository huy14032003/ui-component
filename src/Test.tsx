import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Search, Plus,
  MoreHorizontal, ArrowRight,
  Info, AlertCircle, CheckCircle2,
  Code2, Eye, XCircle, Bell, Settings,
  Layers, MousePointer2, Sliders, Activity, ShieldCheck, Trash2, Loader2
} from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

import { DashboardLayout } from './components/ui/layout/DashboardLayout';
import { Button } from './components/ui/button/Button';
import { Input } from './components/ui/input/Input';
import { Select } from './components/ui/select/Select';
import { DatePicker } from './components/ui/datepicker/DatePicker';
import { Checkbox } from './components/ui/checkbox/Checkbox';
import { Switch } from './components/ui/switch/Switch';
import { Tabs } from './components/ui/tabs/Tabs';
import { Dialog } from './components/ui/dialog/Dialog';
import { Tooltip } from './components/ui/tooltip/Tooltip';
import { Table } from './components/ui/table/Table';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion/Accordion';
import { Spinner } from './components/ui/spinner/Spinner';
import { Badge } from './components/ui/badge/Badge';
import { Avatar } from './components/ui/avatar/Avatar';
import { Skeleton } from './components/ui/skeleton/Skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card/Card';
import { Radio } from './components/ui/radio/Radio';
import { RadioGroup } from './components/ui/radio-group/RadioGroup';
import { ComboBox } from './components/ui/combobox/ComboBox';
import { Popover } from './components/ui/popover/Popover';
import { Slider } from './components/ui/slider/Slider';
import { Progress } from './components/ui/progress/Progress';
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert/Alert';
import { AlertDialog } from './components/ui/alret-dialog/AlertDialog';
import { Collapsible } from './components/ui/collapsible/Collapsible';
import { type DateRange } from 'react-day-picker';

// ----------------------------------------------------------------------------
// Showcase Helpers
// ----------------------------------------------------------------------------

const ShowcaseCard = ({
  title,
  description,
  children,
  code
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
}) => (
  <Card className="mb-8 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
    <CardHeader className="bg-slate-50/50">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-primary flex items-center gap-2">
            <Eye className="w-4 h-4" /> {title}
          </CardTitle>
          {description && <CardDescription className="mt-1">{description}</CardDescription>}
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-8">
      <div className="flex flex-wrap gap-6 items-end">
        {children}
      </div>
    </CardContent>
    {code && (
      <Accordion>
        <AccordionItem value="code" className="border-t border-border/50">
          <AccordionTrigger className="px-6 py-3 hover:bg-slate-50 transition-colors" hideChevron>
            <div className="flex items-center gap-2 text-slate-500 font-medium text-xs uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" /> Xem mã nguồn
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <pre className="p-6 bg-slate-900 text-slate-100 text-xs overflow-auto leading-relaxed max-h-[400px]">
              <code>{code}</code>
            </pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )}
  </Card>
);

const PageHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
    <p className="text-slate-500 mt-2 max-w-2xl">{description}</p>
  </div>
);

// ----------------------------------------------------------------------------
// Component Pages
// ----------------------------------------------------------------------------

const ButtonPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Button" description="Các nút tương tác với nhiều biến thể, kích thước và trạng thái." />

    <ShowcaseCard
      title="Variants"
      description="Các kiểu nút cơ bản trong hệ thống."
      code={`<Button variant="solid">Solid</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>`}
    >
      <Button variant="solid">Solid Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link">Link Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </ShowcaseCard>


  </div>
);

const CheckboxPage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Checkbox" description="Thành phần lựa chọn nhị phân, hỗ trợ trạng thái indeterminate." />

    <ShowcaseCard
      title="Sử dụng Checkbox"
      description="Checkbox mượt mà và hỗ trợ click cả label."
      code={`<Checkbox label="Accepted terms" />\n<Checkbox label="Default checked" defaultChecked />\n<Checkbox label="Indeterminate" indeterminate />`}
    >
      <Checkbox label="Chấp nhận điều khoản" />
      <Checkbox label="Mặc định chọn" defaultChecked />
      <Checkbox label="Trạng thái lấp lửng" indeterminate />
      <Checkbox label="Bị vô hiệu hóa" disabled />
    </ShowcaseCard>
  </div>
);

const RadioPage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Radio Group" description="Lựa chọn một giá trị duy nhất trong một tập hợp." />

    <ShowcaseCard
      title="Radio Examples"
      description="Radio với các kích thước và trạng thái khác nhau."
      code={`<RadioGroup defaultValue="apple">\n  <Radio value="apple" label="Apple" />\n  <Radio value="orange" label="Orange" />\n</RadioGroup>`}
    >
      <RadioGroup defaultValue="apple">
        <Radio value="apple" label="Apple" />
        <Radio value="orange" label="Orange" />
        <Radio value="banana" label="Banana" />
      </RadioGroup>
    </ShowcaseCard>

    <ShowcaseCard
      title="Radio Disabled"
      description="Radio với trạng thái disabled."
      code={`<RadioGroup defaultValue="apple">\n  <Radio value="apple" label="Apple" />\n  <Radio value="orange" label="Orange" />\n</RadioGroup>`}
    >
      <RadioGroup defaultValue="orange">
        <Radio value="apple" label="Apple" disabled />
        <Radio value="orange" label="Orange" disabled />
        <Radio value="banana" label="Banana" disabled />
      </RadioGroup>
    </ShowcaseCard>

    <ShowcaseCard
      title="Sizes"
      description="Hỗ trợ các kích thước small, medium và large."
      code={`<Radio size="sm" value="sm" label="Small" />\n<Radio size="md" value="md" label="Medium" />\n<Radio size="lg" value="lg" label="Large" />`}
    >
      <RadioGroup defaultValue="md">
        <div className="flex items-center gap-6">
          <Radio size="sm" value="sm" label="Small" />
          <Radio size="md" value="md" label="Medium" />
          <Radio size="lg" value="lg" label="Large" />
        </div>
      </RadioGroup>
    </ShowcaseCard>
  </div>
);

const ComboBoxPage = () => {
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Next.js', value: 'nextjs' },
    { label: 'Vite', value: 'vite' },
    { label: 'Tailwind CSS', value: 'tailwind' },
    { label: 'Base UI', value: 'baseui' },
    { label: 'Tanstack Table', value: 'table' },
  ];

  return (
    <div className="max-w-3xl">
      <PageHeader title="ComboBox" description="Dropdown kết hợp tìm kiếm và chọn giá trị (Autocomplete)." />

      <ShowcaseCard
        title="Single Select & Autocomplete"
        description="Hỗ trợ lọc dữ liệu ngay khi gõ phím."
        code={`<ComboBox \n  options={options} \n  label="Framework" \n  placeholder="Chọn một framework..." \n/>`}
      >
        <div className="w-80">
          <ComboBox
            options={options}
            label="Lựa chọn Framework"
            placeholder="Tìm kiếm framework..."
          />
        </div>
      </ShowcaseCard>

      <ShowcaseCard
        title="Multi-select (Chips inside Input)"
        description="Các tags (chips) giờ đây nằm gọn trong khung input."
        code={`<ComboBox \n  options={options} \n  multiple \n  label="Tags" \n  placeholder="Nhập tag..." \n/>`}
      >
        <div className="w-full">
          <ComboBox
            options={options}
            multiple
            label="Chọn nhiều Tags"
            placeholder="Gõ để tìm tag..."
          />
        </div>
      </ShowcaseCard>

      <ShowcaseCard
        title="Multi-select (No Autocomplete)"
        description="Chỉ chọn từ danh sách, ngăn không cho gõ tìm kiếm."
        code={`<ComboBox \n  options={options} \n  multiple \n  autocomplete={false} \n  label="Fixed Options" \n  placeholder="Chọn..." \n/>`}
      >
        <div className="w-full">
          <ComboBox
            options={options}
            multiple
            autocomplete={false}
            label="Lựa chọn cố định"
            placeholder="Chọn mục..."
          />
        </div>
      </ShowcaseCard>
    </div>
  );
};

const SwitchPage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Switch" description="Một nút gạt bật/tắt đơn giản cho các trạng thái kích hoạt." />

    <ShowcaseCard
      title="Examples"
      code={`<Switch label="Bật thông báo" />\n<Switch size="sm" label="Small Switch" />`}
    >
      <Switch label="Bật thông báo" />
      <Switch label="Chế độ tối" defaultChecked />
      <Switch label="Chế độ bảo trì" disabled />
    </ShowcaseCard>

    <ShowcaseCard
      title="Sizes"
      code={`<Switch size="sm" label="Small" />\n<Switch size="md" label="Medium" />`}
    >
      <div className="flex items-center gap-6">
        <Switch size="sm" label="Small" />
        <Switch size="md" label="Medium" defaultChecked />
      </div>
    </ShowcaseCard>
  </div>
);

const OverlaysPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Overlays" description="Các thành phần lớp phủ như Modal, Tooltip và Popover." />

    <ShowcaseCard
      title="Popover"
      description="Hiển thị nội dung chi tiết trong một popup nhỏ."
      code={`<Popover trigger={<Button>Open Popover</Button>}>\n  <p>Chi tiết cài đặt...</p>\n</Popover>`}
    >
      <Popover trigger={<Button variant="outline"><Settings className="w-4 h-4 mr-2" /> Cấu hình</Button>}>
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Cài đặt hệ thống</h4>
          <p className="text-sm text-muted-foreground">Điều chỉnh cấu hình hiển thị và bảo mật.</p>
          <div className="grid gap-2">
            <Switch size="sm" label="Sao lưu tự động" />
            <Switch size="sm" label="Thông báo Email" defaultChecked />
          </div>
        </div>
      </Popover>
    </ShowcaseCard>


  </div>
);


const DialogModal = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Hồ sơ đã được cập nhật!');
    }, 2000);
  };

  return (
    <div className="max-w-4xl">
      <PageHeader title="Dialog Modal" description="Các biến thể và trường hợp sử dụng nâng cao của Dialog." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ShowcaseCard
          title="Modal Default"
          code={`<Dialog \n  trigger={<Button>Mở Default</Button>} \n  headerTitle="Tiêu đề" \n  headerDescription="..." \n>\n  Nội dung...\n</Dialog>`}
        >
          <Dialog
            trigger={<Button variant="outline">Mở Default</Button>}
            headerTitle="Thông báo hệ thống"
            headerDescription="Dữ liệu của bạn đã được lưu tự động."
          >
            <div className="py-4">
              <p className="text-sm text-muted-foreground">Phiên làm việc của bạn sẽ hết hạn sau 15 phút nữa. Hãy đảm bảo mọi thứ đã được tải lên.</p>
            </div>
          </Dialog>
        </ShowcaseCard>

        <ShowcaseCard
          title="Custom Footer"
          code={`<Dialog \n  footerContent={<div className="flex justify-between w-full">...</div>}\n>... \n</Dialog>`}
        >
          <Dialog
            trigger={<Button variant="secondary">Mở Custom Footer</Button>}
            headerTitle="Xác nhận thanh toán"
            footerContent={
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">Phí dịch vụ: <b>12.000đ</b></div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Hủy</Button>
                  <Button size="sm">Thanh toán ngay</Button>
                </div>
              </div>
            }
          >
            <div className="py-4">
              <p className="text-sm">Bạn đang thực hiện nạp tiền vào ví điện tử. Vui lòng kiểm tra lại số tiền trước khi tiếp tục.</p>
            </div>
          </Dialog>
        </ShowcaseCard>

        <ShowcaseCard
          title="Loading Submit"
          code={`<Button onClick={handleSubmit}>\n  {loading ? "Đang xử lý..." : "Lưu"}\n</Button>`}
        >
          <Dialog
            trigger={<Button>Mở Loading Demo</Button>}
            headerTitle="Cập nhật thông tin"
            footerContent={
              <div className="flex justify-end gap-2">
                <Button variant="outline" disabled={loading}>Hủy</Button>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
              </div>
            }
          >
            <div className="space-y-4 py-4">
              <Input label="Email" defaultValue="admin@flexpay.vn" disabled={loading} />
              <Input label="Số điện thoại" defaultValue="0987654321" disabled={loading} />
            </div>
          </Dialog>
        </ShowcaseCard>

        <ShowcaseCard
          title="Scroll Modal"
          code={`<div className="max-h-[300px] overflow-y-auto">...</div>`}
        >
          <Dialog
            trigger={<Button variant="outline">Mở Scroll Modal</Button>}
            headerTitle="Điều khoản dịch vụ"
            headerDescription="Vui lòng đọc kỹ trước khi đồng ý."
            footerContent={<Button className="w-full">Tôi đã đọc và đồng ý</Button>}
          >
            <div className="py-4 space-y-4 pr-2 text-sm text-muted-foreground max-h-[300px] overflow-y-auto">
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i}>
                  <b>Điều {i + 1}:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              ))}
            </div>
          </Dialog>
        </ShowcaseCard>

        <ShowcaseCard
          title="Full Page Modal"
          code={`<Dialog size="fullScreen" ... />`}
        >
          <Dialog
            size="fullScreen"
            trigger={<Button variant="outline"><Layers className="mr-2 h-4 w-4" /> Mở Toàn màn hình</Button>}
            headerTitle="Trình soạn thảo văn bản"
            headerDescription="Môi trường làm việc tập trung."
            footerContent={
              <div className="flex justify-between w-full border-t border-border pt-4">
                <Button variant="ghost">Thoát không lưu</Button>
                <Button>Xuất bản bài viết</Button>
              </div>
            }
          >
            <div className="h-full flex flex-col p-10">
              <div className="max-w-3xl mx-auto w-full space-y-8">
                <h1 className="text-4xl font-bold border-b pb-4">Tiêu đề bản thảo mới</h1>
                <p className="text-lg leading-relaxed text-slate-600">
                  Bắt đầu viết nội dung của bạn ở đây. Chế độ toàn màn hình giúp bạn tập trung tối đa vào công việc mà không bị xao nhãng bởi các thành phần khác của hệ thống.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground border-2 border-dashed">
                    Chèn hình ảnh
                  </div>
                  <div className="aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground border-2 border-dashed">
                    Chèn video
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-slate-600">
                  Sử dụng Dialog Toàn màn hình cho các tác vụ phức tạp như: Soạn thảo, Chỉnh sửa ảnh, Xem báo cáo chi tiết hoặc các quy trình thiết lập nhiều bước.
                </p>
              </div>
            </div>
          </Dialog>
        </ShowcaseCard>
      </div>
    </div>
  );
};

const TooltipPage = () => (
  <div className="">
    <ShowcaseCard
      title="Tooltip"
      description="Thông tin nhanh khi hover."
      code={`<Tooltip content="Thêm giao dịch mới"><Button>...</Button></Tooltip>`}
    >
      <Tooltip content="Thêm giao dịch mới bên trái" side='left' align='center'>
        <Button variant="outline" size="icon"><Plus className="w-4 h-4" /></Button>
      </Tooltip>
      <Tooltip content="Thông tin bảo mật bên trên" side='top' align='center'>
        <Button variant="ghost" size="icon"><ShieldCheck className="w-4 h-4 text-primary" /></Button>
      </Tooltip>
      <Tooltip content="Thông tin bảo mật bên dưới" side='bottom' align='end'>
        <Button variant="danger" size="icon"><ShieldCheck className="w-4 h-4 " /></Button>
      </Tooltip>
      <Tooltip content="Thông tin bảo mật dài bên phải" side="right" align='start'>
        <Button variant="secondary" size="icon"><ShieldCheck className="w-4 h-4 " /></Button>
      </Tooltip>
    </ShowcaseCard>
  </div>
)


const AlertPage = () => (
  <div className="">
    <ShowcaseCard
      title="Alerts"
      description="Thông báo quan trọng cho người dùng."
      code={`<Alert variant="destructive"><AlertTitle>Error</AlertTitle>...</Alert>`}
    >
      <div className="w-full space-y-4">
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertTitle>Thông tin</AlertTitle>
          <AlertDescription>Hệ thống sẽ bảo trì vào lúc 2h sáng mai.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Thành công</AlertTitle>
          <AlertDescription>Yêu cầu rút tiền của bạn đã được duyệt.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>Số dư không đủ để thực hiện giao dịch này.</AlertDescription>
        </Alert>
      </div>
    </ShowcaseCard>
    <ShowcaseCard
      title="Toast Interaction"
      description="Kích hoạt thông báo hệ thống (Toasts)."
      code={`toast.success('Giao dịch thành công!');\ntoast.error('Đã có lỗi xảy ra.');`}
    >
      <Button onClick={() => toast.success('Giao dịch thành công!', { description: 'Số tiền 500.000đ đã được gửi.' })}>Success Toast</Button>
      <Button variant="outline" onClick={() => toast.error('Lỗi kết nối', { description: 'Vui lòng thử lại sau.' })}>Error Toast</Button>
      <Button variant="secondary" onClick={() => toast.info('Thông báo', { description: 'Phiên làm việc sắp hết hạn.' })}>Info Toast</Button>
    </ShowcaseCard>
  </div>
)


const UtilitiesPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Utilities" description="Các công cụ hiển thị trạng thái và tiến độ." />

    <ShowcaseCard
      title="Progress"
      description="Hiển thị tiến độ hoàn thành."
      code={`<Progress value={65} />`}
    >
      <div className="w-full space-y-6">
        <Progress value={33} />
        <Progress value={65} className="h-2" />
        <Progress value={90} className="bg-primary/20" />
      </div>
    </ShowcaseCard>

    <ShowcaseCard
      title="Slider"
      description="Thanh trượt chọn giá trị trong khoảng."
      code={`<Slider defaultValue={[50]} max={100} step={1} />`}
    >
      <div className="w-full space-y-8">
        <Slider defaultValue={[20]} />
        <Slider defaultValue={[80]} disabled />
      </div>
    </ShowcaseCard>


  </div>
);

const AvatarPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Avatar" description="Hình ảnh đại diện người dùng, hỗ trợ thẻ ảnh và chữ viết tắt fallback." />
    <ShowcaseCard
      title="Sizes"
      code={`<Avatar size="sm" src="..." />\n<Avatar size="md" fallback="HT" />\n<Avatar size="lg" />`}
    >
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a" alt="User A" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=b" alt="User B" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?u=c" alt="User C" />
      <Avatar size="xl" src="https://i.pravatar.cc/150?u=d" alt="User D" />
    </ShowcaseCard>
    <ShowcaseCard
      title="Fallbacks"
      code={`<Avatar fallback="HT" />\n<Avatar fallback="US" />`}
    >
      <Avatar size="md" fallback="HT" />
      <Avatar size="lg" fallback="JS" />
      <Avatar size="xl" fallback="A" />
    </ShowcaseCard>
  </div>
);

const SkeletonPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Skeleton" description="Chỉ báo tải trang dạng bộ xương mờ, thay thế nội dung đang tải." />
    <ShowcaseCard title="Ví dụ sử dụng" code={`<div className="flex items-center space-x-4">\n  <Skeleton className="h-12 w-12 rounded-full" />\n  <div className="space-y-2">\n    <Skeleton className="h-4 w-[250px]" />\n    <Skeleton className="h-4 w-[200px]" />\n  </div>\n</div>`}>
      <div className="flex items-center space-x-4 w-full">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 w-full max-w-sm">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </ShowcaseCard>
  </div>
);

const SpinnerPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Spinner" description="Vòng xoay chờ tải, thích hợp cho các thành phần nhỏ bé." />
    <ShowcaseCard title="Các kích cỡ Spinner" code={`<Spinner size="sm" />\n<Spinner size="md" />\n<Spinner size="lg" />`}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </ShowcaseCard>
  </div>
);

const InputPage = () => (
  <div className="max-w-md">
    <PageHeader title="Input" description="Các trường nhập dữ liệu." />
    <ShowcaseCard title="Kiểu dáng" code={`<Input label="Tên người dùng" />\n<Input variant="filled" label="Tên người dùng" />\n<Input variant="flushed" label="Tên người dùng" />`}>
      <div className="w-full space-y-6">
        <Input label="Default" placeholder="Nhập chữ..." />
        <Input variant="filled" label="Filled" placeholder="Nhập chữ..." />
        <Input variant="flushed" label="Flushed" placeholder="Nhập chữ..." />
        <Input label="With Icon" icon={<Search className="w-4 h-4" />} placeholder="Tìm kiếm..." />
        <Input label="Error State" error="Trường này là bắt buộc" placeholder="Nhập mail..." />
      </div>
    </ShowcaseCard>
  </div>
);

const SelectPage = () => (
  <div className="max-w-md">
    <PageHeader title="Select" description="Lựa chọn một danh sách cố định (không autocomplete)." />
    <ShowcaseCard title="Ví dụ Select" code={`<Select \n  options={[{label: "Light", value: "light"}]}\n  placeholder="Theme" \n/>`}>
      <Select
        label="Chủ đề hệ thống"
        placeholder="Lựa chọn Theme"
        options={[
          { label: 'Sáng', value: 'light' },
          { label: 'Tối', value: 'dark' },
          { label: 'Hệ thống', value: 'system' },
        ]}
      />
    </ShowcaseCard>
  </div>
);

const DatePickerPage = () => {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>();
  const [rangeDate, setRangeDate] = React.useState<DateRange | undefined>();
  const [datetimeInput, setDatetimeInput] = React.useState<Date | undefined>();
  const [datetimeSelect, setDatetimeSelect] = React.useState<Date | undefined>();

  return (
    <div className="max-w-lg">
      <PageHeader title="DatePicker" description="Bộ chọn ngày tháng đa năng." />

      <ShowcaseCard
        title="Single Date"
        code={`<DatePicker date={date} onDateChange={setDate} />`}
      >
        <div className="flex  gap-6 overflow-auto w-full">
          <DatePicker label="Ngày sinh" date={singleDate} onDateChange={(d) => setSingleDate(d as Date | undefined)} placeholder="Chọn ngày..." />
          <DatePicker label="Ngày sinh" date={singleDate} onDateChange={(d) => setSingleDate(d as Date | undefined)} placeholder="Chọn ngày..." />
          <DatePicker label="Ngày sinh" date={singleDate} onDateChange={(d) => setSingleDate(d as Date | undefined)} placeholder="Chọn ngày..." />
          <DatePicker label="Ngày sinh" date={singleDate} onDateChange={(d) => setSingleDate(d as Date | undefined)} placeholder="Chọn ngày..." />
        </div>
      </ShowcaseCard>

      <ShowcaseCard
        title="Date Range"
        description="Chọn khoảng thời gian từ ngày đến ngày."
        code={`<DatePicker mode="range" date={range} onDateChange={setRange} />`}
      >
        <DatePicker mode="range" label="Khoảng thời gian" date={rangeDate} onDateChange={(d) => setRangeDate(d as DateRange | undefined)} placeholder="Từ ngày — Đến ngày" />
      </ShowcaseCard>

      <ShowcaseCard
        title="Chặn ngày quá khứ"
        description="Không cho phép chọn ngày trước hôm nay."
        code={`<DatePicker disablePastDates date={date} onDateChange={setDate} />`}
      >
        <DatePicker label="Lịch hẹn" date={singleDate} onDateChange={(d) => setSingleDate(d as Date | undefined)} disablePastDates placeholder="Chỉ chọn ngày tương lai..." />
      </ShowcaseCard>

      <ShowcaseCard
        title="DateTime — Nhập giờ (Input)"
        description="Tích hợp ô nhập giờ dạng text input."
        code={`<DatePicker showTime timePickerStyle="input" date={dt} onDateChange={setDt} />`}
      >
        <DatePicker label="Ngày & Giờ (input)" showTime timePickerStyle="input" date={datetimeInput} onDateChange={(d) => setDatetimeInput(d as Date | undefined)} placeholder="Chọn ngày giờ..." />
      </ShowcaseCard>

      <ShowcaseCard
        title="DateTime — Chọn giờ (Select)"
        description="Tích hợp select dropdown cho giờ và phút."
        code={`<DatePicker showTime timePickerStyle="select" date={dt} onDateChange={setDt} />`}
      >
        <DatePicker label="Ngày & Giờ (select)" showTime timePickerStyle="select" date={datetimeSelect} onDateChange={(d) => setDatetimeSelect(d as Date | undefined)} placeholder="Chọn ngày giờ..." />
      </ShowcaseCard>
    </div>
  );
};

const AlertDialogPage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Alert Dialog" description="Hộp thoại xác nhận yêu cầu hành động bắt buộc từ người dùng, không thể đóng bằng click ngoài." />

    <ShowcaseCard
      title="Xác nhận xóa"
      description="Hộp thoại nguy hiểm yêu cầu người dùng xác nhận trước khi xóa."
      code={`<AlertDialog\n  trigger={<Button variant="danger">Xóa tài khoản</Button>}\n  headerTitle="Bạn chắc chắn muốn xóa?"\n  cancelContent={<Button variant="outline">Hủy</Button>}\n  actionContent={<Button variant="danger">Xóa vĩnh viễn</Button>}\n/>`}
    >
      <AlertDialog
        trigger={<Button variant="danger"><Trash2 className="w-4 h-4 mr-2" />Xóa tài khoản</Button>}
        headerTitle="Xóa tài khoản?"
        headerDescription="Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn khỏi máy chủ."
        cancelContent={<Button variant="outline">Hủy bỏ</Button>}
        actionContent={<Button variant="danger"><Trash2 className="w-4 h-4 mr-2" />Xóa vĩnh viễn</Button>}
      />
    </ShowcaseCard>

    <ShowcaseCard
      title="Xác nhận hành động quan trọng"
      code={`<AlertDialog\n  trigger={<Button>Gửi duyệt</Button>}\n  headerTitle="Xác nhận gửi"\n  cancelContent={...}\n  actionContent={...}\n/>`}
    >
      <AlertDialog
        trigger={<Button>Gửi yêu cầu duyệt</Button>}
        headerTitle="Xác nhận gửi yêu cầu"
        headerDescription="Sau khi gửi, bạn sẽ không thể chỉnh sửa thông tin. Quản trị viên sẽ xem xét trong 1-3 ngày làm việc."
        cancelContent={<Button variant="ghost">Quay lại</Button>}
        actionContent={<Button>Xác nhận gửi</Button>}
      />
    </ShowcaseCard>
  </div>
);

const CollapsiblePage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Collapsible" description="Co giãn một phần nội dung ẩn, đơn giản hơn Accordion." />

    <ShowcaseCard
      title="Ví dụ Collapsible"
      code={`<Collapsible trigger="Xem thêm chi tiết">\n  <p>Nội dung ẩn...</p>\n</Collapsible>`}
    >
      <div className="w-full space-y-3">
        <Collapsible trigger="Điều khoản sử dụng">
          <div className="p-4 border border-border rounded-md text-sm text-muted-foreground space-y-2">
            <p>1. Bằng cách sử dụng dịch vụ, bạn đồng ý với các điều khoản này.</p>
            <p>2. Chúng tôi có quyền thay đổi điều khoản bất cứ lúc nào.</p>
            <p>3. Việc tiếp tục sử dụng sau khi thay đổi đồng nghĩa với chấp nhận.</p>
          </div>
        </Collapsible>
        <Collapsible trigger="Chính sách bảo mật">
          <div className="p-4 border border-border rounded-md text-sm text-muted-foreground space-y-2">
            <p>Chúng tôi thu thập dữ liệu cần thiết để cung cấp dịch vụ và cam kết không bán thông tin cho bên thứ ba.</p>
          </div>
        </Collapsible>
        <Collapsible trigger="Câu hỏi thường gặp" defaultOpen>
          <div className="p-4 border border-border rounded-md text-sm text-muted-foreground">
            <strong>Q: Làm thế nào để liên hệ hỗ trợ?</strong>
            <p className="mt-1">A: Bạn có thể email tới support@example.com hoặc gọi hotline 1900-xxxx.</p>
          </div>
        </Collapsible>
      </div>
    </ShowcaseCard>
  </div>
);

const AccordionPage = () => (
  <div className="max-w-3xl">
    <PageHeader title="Accordion" description="Hiển thị vùng nội dung dạng mở ra đóng vào." />
    <ShowcaseCard title="Ví dụ Accordion" code={`<Accordion>\n  <AccordionItem>\n    <AccordionTrigger>...</AccordionTrigger>\n    <AccordionContent>...</AccordionContent>\n  </AccordionItem>\n</Accordion>`}>
      <Accordion className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Đây có phải công nghệ mới nhất?</AccordionTrigger>
          <AccordionContent>Đúng vậy. Hệ thống sử dụng React 19, Base UI và Tailwind v4.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Framework có hỗ trợ responsive mặt định không?</AccordionTrigger>
          <AccordionContent>Có. Tất cả component được xây dựng theo tiêu chuẩn mobile-first.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </ShowcaseCard>
  </div>
);

const DialogPage = () => (
  <div className="max-w-4xl">
    <PageHeader title="Dialog (Modal)" description="Hộp thoại bắt buộc người dùng tập trung xử lý." />
    <ShowcaseCard title="Form Dialog" code={`<Dialog trigger={<Button>Mở Modal</Button>} headerTitle="Tiêu đề"...>`}>
      <Dialog
        trigger={<Button>Chỉnh sửa hồ sơ</Button>}
        headerTitle="Chỉnh sửa hồ sơ"
        headerDescription="Hãy lưu lại thay đổi trước khi đóng cửa sổ."
        footerContent={
          <>
            <Button variant="ghost">Hủy bỏ</Button>
            <Button>Lưu thay đổi</Button>
          </>
        }
      >
        <div className="grid gap-4 py-4">
          <Input label="Họ tên" defaultValue="Huy Trần" />
          <Input label="Tên người dùng" defaultValue="@huy1403" />
        </div>
      </Dialog>
    </ShowcaseCard>
  </div>
);

const TransactionPage = () => {
  const data = React.useMemo(() => [
    { id: '1', date: '2024-03-31 10:30', user: 'huy_tran_01', type: 'Sản lượng ví', amount: '500.000đ', status: 'Thành công' },
    { id: '2', date: '2024-03-31 09:15', user: 'admin_test', type: 'Chuyển tiền', amount: '1.200.000đ', status: 'Đang xử lý' },
    { id: '3', date: '2024-03-30 22:45', user: 'user_vips', type: 'Thanh toán', amount: '45.000đ', status: 'Thành công' },
  ], []);

  const columns: ColumnDef<any>[] = [
    { accessorKey: 'date', header: 'Thời gian' },
    { accessorKey: 'user', header: 'Người dùng' },
    { accessorKey: 'type', header: 'Loại GD' },
    { accessorKey: 'amount', header: 'Số tiền' },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ getValue }: any) => {
        const status = getValue();
        const variant: any = status === 'Thành công' ? 'success' : 'warning';
        return <Badge variant={variant}>{status}</Badge>;
      }
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400 uppercase">Tổng doanh thu</p>
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <p className="text-3xl font-bold mt-2 text-primary">124.500.000đ</p>
            <Badge variant="success" className="mt-2">+12% so với tháng trước</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400 uppercase">Giao dịch mới</p>
              <MousePointer2 className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-3xl font-bold mt-2 text-blue-600">1,240</p>
            <Badge variant="secondary" className="mt-2">Trung bình 40 GD/ngày</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400 uppercase">Tỉ lệ thành công</p>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold mt-2 text-emerald-600">99.8%</p>
            <Badge variant="success" className="mt-2">Rất ổn định</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách giao dịch</CardTitle>
          <CardDescription>Cập nhật tự động mỗi 30 giây.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 border-t border-border/50">
          <Table data={data} columns={columns} enableRowSelection />
        </CardContent>
      </Card>
    </div>
  );
};

const Test = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<TransactionPage />} />

          <Route path="components/button" element={<ButtonPage />} />
          <Route path="components/checkbox" element={<CheckboxPage />} />
          <Route path="components/radio" element={<RadioPage />} />
          <Route path="components/combobox" element={<ComboBoxPage />} />
          <Route path="components/switch" element={<SwitchPage />} />

          <Route path="components/table" element={
            <div className="max-w-5xl">
              <PageHeader title="Table" description="Bảng dữ liệu mạnh mẽ tích hợp nhiều thành phần UI." />
              <Card className="p-0 overflow-hidden">
                <Table
                  data={[
                    { id: '1', name: 'Huy Tran', email: 'huy@example.com', role: 'Owner' },
                    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
                  ]}
                  columns={[
                    { accessorKey: 'name', header: 'Name' },
                    { accessorKey: 'email', header: 'Email' },
                    { accessorKey: 'role', header: 'Role' },
                  ]}
                  enableRowSelection
                />
              </Card>
            </div>
          } />

          <Route path="components/progress" element={<UtilitiesPage />} />
          <Route path="components/alert" element={<AlertPage />} />
          <Route path="components/slider" element={<UtilitiesPage />} />
          <Route path="components/popover" element={<OverlaysPage />} />
          <Route path="components/tooltip" element={<TooltipPage />} />
          <Route path="components/dialog" element={<DialogModal />} />
          <Route path="components/tabs" element={
            <div className="max-w-2xl">
              <PageHeader title="Tabs" description="Phân chia nội dung theo các tab riêng biệt." />
              <ShowcaseCard title="Tabs Example" code="<Tabs items={[...]} />">
                <Tabs
                  defaultValue="account"
                  items={[
                    { label: 'Tài khoản', value: 'account', content: <div className="p-4 border rounded-md">Cấu hình tài khoản người dùng hiển thị ở đây.</div> },
                    { label: 'Bảo mật', value: 'password', content: <div className="p-4 border rounded-md">Thay đổi mật khẩu và thiết lập 2FA.</div> },
                  ]}
                />
              </ShowcaseCard>
            </div>
          } />

          <Route path="components/badge" element={
            <ShowcaseCard title="Badge" code="<Badge variant='success'>Success</Badge>">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </ShowcaseCard>
          } />

          <Route path="components/avatar" element={<AvatarPage />} />
          <Route path="components/skeleton" element={<SkeletonPage />} />
          <Route path="components/spinner" element={<SpinnerPage />} />
          <Route path="components/input" element={<InputPage />} />
          <Route path="components/select" element={<SelectPage />} />
          <Route path="components/datepicker" element={<DatePickerPage />} />
          <Route path="components/accordion" element={<AccordionPage />} />
          <Route path="components/dialog" element={<DialogPage />} />
          <Route path="components/alert-dialog" element={<AlertDialogPage />} />
          <Route path="components/collapsible" element={<CollapsiblePage />} />

          <Route path="*" element={<div className="p-20 text-center text-slate-400">Đang xây dựng...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Test;