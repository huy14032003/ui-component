import * as Icons from '@components/icons'
import Spinner from '@components/ui/spinner/Spinner'
import Button from '@components/ui/button/Button'
import { AutocompleteSelect, CustomSelect, MultiSelect } from '@components/ui/select/Select';
import { Disclosure } from '@components/ui/disclosure/Disclosure';
import { Input, InputPassword } from '@components/ui/input/Input';
import { Checkbox, CheckboxGroup } from '@components/ui/checkbox/Checkbox';
import { Slider } from '@components/ui/slider/Slider';
import { ProgressBar } from '@components/ui/progress/ProgressBar';
import { ProgressRing } from '@components/ui/progress/ProgressRing';
import { Tabs, TabList, Tab, TabPanel } from '@components/ui/tabs/Tabs';
import { Popover, PopoverDialog } from '@components/ui/popover/Popover';
import { Tooltip, TooltipTrigger } from '@components/ui/tooltip/Tooltip';
import { DialogTrigger, Button as AriaButton } from 'react-aria-components';
import { Switch } from '@components/ui/switch/Switch';
import { Radio, RadioGroup } from '@components/ui/radio/Radio';
import { Example } from '@components/ui/modal/Example';
import InputDate from '@components/ui/datepicker/InputDate';
import Tag from '@components/ui/tag/Tag';
import Avatar from '@components/ui/avatar/Avatar';
import AvatarGroup from '@components/ui/avatar/AvatarGroup';
import Skeleton from '@components/ui/skeleton/Skeleton';
import Timeline from '@components/ui/timeline/Timeline';
import TimelineItem from '@components/ui/timeline/TimelineItem';
import Upload from '@components/ui/upload/Upload';
import { Table } from '@components/ui/table/Table';
import Tour from '@components/ui/tour/Tour';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '@components/ui/form/FormInput';
import { FormSelect } from '@components/ui/form/FormSelect';
import { FormCheckbox, FormCheckboxGroup } from '@components/ui/form/FormCheckbox';
import { FormRadioGroup } from '@components/ui/form/FormRadio';
import { FormInputDate } from '@components/ui/form/FormInputDate';
import { FormUpload } from './components/ui/form/FormUpload';
import ExampleToast from './components/ui/toast/ExampleToast';
import { toast } from './components/ui/toast/Toast';
import { ExampleCard } from './components/ui/card/ExampleCard';

const formSchema = z.object({
  username: z.string().min(3, 'Tên đăng nhập phải chứa ít nhất 3 ký tự'),
  password: z.string().min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự'),
  language: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất 1 ngôn ngữ'),
  avatar: z.array(z.any()).min(1, 'Ảnh đại diện là bắt buộc'),
  role: z.string().min(1, 'Vui lòng chọn vai trò'),
  skills: z.array(z.any()).min(1, 'Vui lòng chọn ít nhất 1 kỹ năng'),
  gender: z.string().min(1, 'Vui lòng chọn giới tính'),
  birthDate: z.any().refine(val => val !== null && val !== undefined, 'Ngày sinh là bắt buộc'),
  acceptTerms: z.boolean().refine(val => val === true, 'Bạn phải đồng ý với điều khoản')
});

const Test = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      role: '',
      skills: [],
      avatar: [],
      language: [],
      gender: '',
      birthDate: null,
      acceptTerms: false
    }
  });

  const onFormSubmit = (data: z.infer<typeof formSchema>) => {
    alert("đã gửi data lên console log")
    console.log(data);
  };

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
    { label: 'Option 7', value: '7' },
    { label: 'Option 8', value: '8' },
    { label: 'Option 9', value: '9' },
    { label: 'Option 10', value: '10' },
    { label: 'Option 11', value: '11' },
    { label: 'Option 12', value: '12' },
    { label: 'Option 13', value: '13' },
    { label: 'Option 14', value: '14' },
    { label: 'Option 15', value: '15' },
    { label: 'Option 16', value: '16' },
    { label: 'Option 17', value: '17' },
    { label: 'Option 18', value: '18' },
    { label: 'Option 19', value: '19' },
    { label: 'Option 20', value: '20' },
    { label: 'Option 21', value: '21' },
    { label: 'Option 22', value: '22' },
    { label: 'Option 23', value: '23' },
    { label: 'Option 24', value: '24' },
    { label: 'Option 25', value: '25' },
    { label: 'Option 26', value: '26' },
    { label: 'Option 27', value: '27' },
    { label: 'Option 28', value: '28' },
    { label: 'Option 29', value: '29' },
    { label: 'Option 30', value: '30' },
    { label: 'Option 31', value: '31' },
  ];

  const items = [
    {
      id: '1',
      title: 'Section 1',
      content: 'Content 1',
    },
    {
      id: '2',
      title: 'Section 2',
      content: 'Content 2',
    },
    {
      id: '3',
      title: 'Section 3',
      content: 'Content 3',
    },
  ];
  return (
    <div className="">
      <p className='text-xl font-bold'>1. button</p>
      <div className="space-y-3">
        <div className="space-y-2 border border-gray-100 p-4 rounded-xl bg-gray-100">
          <div className="space-x-1">
            <Button variant='primary' size='lg' isLoading={false} icon={<Icons.Wifi />} >  Click me</Button>
            <Button variant='secondary' isLoading={true} size='md'>Click me</Button>
            <Button variant='danger' isLoading={true} size='sm'>Click me</Button>
            <Button variant='success' isLoading={true} size='xs'>Click me</Button>
            <Button variant='warning' isLoading={true} size='xs'>Click me</Button>
          </div>

          {/* Nhúng Component Disclosure vào đây để làm chức năng Copy Code */}
          <Disclosure
            className="w-full max-w-none shadow-none border border-gray-200 mt-2"
            items={[
              {
                id: 'code-solid-buttons',
                title: 'Xem mã nguồn (Solid Buttons)',
                content: (
                  <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                    <code>{`<Button variant="primary" size="lg" isLoading={false} icon={<Icons.Wifi />}>  Click me</Button>
<Button variant="secondary" isLoading={true} size="md">Click me</Button>
<Button variant="danger" isLoading={true} size="sm">Click me</Button>
<Button variant="success" isLoading={true} size="xs">Click me</Button>
<Button variant="warning" isLoading={true} size="xs">Click me</Button>`}</code>
                  </pre>
                )
              }
            ]} />
        </div>
        <div className="space-x-1">

          <Button variant='outline' size='lg' isLoading={false} icon={<Icons.Wifi />} >  Click me</Button>
          <Button variant='outlineSecondary' isLoading={false} size='md'>Click me</Button>
          <Button variant='outlineDanger' isLoading={false} size='sm'>Click me</Button>
          <Button variant='outlineSuccess' isLoading={false} size='xs'>Click me</Button>
          <Button variant='outlineWarning' isLoading={false} size='xs'>Click me</Button>
          <Button variant='outlinePrimary' isLoading={false} size='xs'>Click me</Button>

          <Disclosure
            className="w-full max-w-none shadow-none border border-gray-200 mt-2"
            items={[
              {
                id: 'code-solid-buttons',
                title: 'Xem mã nguồn (Solid Buttons)',
                content: (
                  <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                    <code>{`<Button variant='outline' size='lg' isLoading={false} icon={<Icons.Wifi />} >  Click me</Button>
<Button variant='outlineSecondary' isLoading={false} size='md'>Click me</Button>
<Button variant='outlineDanger' isLoading={false} size='sm'>Click me</Button>
<Button variant='outlineSuccess' isLoading={false} size='xs'>Click me</Button>
<Button variant='outlineWarning' isLoading={false} size='xs'>Click me</Button>
<Button variant='outlinePrimary' isLoading={false} size='xs'>Click me</Button>`}</code>
                  </pre>
                )
              }
            ]} />
        </div>
        <div className="space-x-1">

          <Button variant='dashed' isLoading={false} size='xs'>Click me</Button>
          <Button variant='dashedDanger' isLoading={false} size='xs'>Click me</Button>
          <Button variant='dashedSuccess' isLoading={false} size='xs'>Click me</Button>
          <Button variant='dashedWarning' isLoading={false} size='xs'>Click me</Button>
          <Button variant='dashedPrimary' isLoading={false} size='xs'>Click me</Button>
          <Button variant='dashedSecondary' isLoading={false} size='xs'>Click me</Button>
          <Disclosure
            className="w-full max-w-none shadow-none border border-gray-200 mt-2"
            items={[
              {
                id: 'code-solid-buttons',
                title: 'Xem mã nguồn (Solid Buttons)',
                content: (
                  <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                    <code>{`<Button variant='dashed' isLoading={false} size='xs'>Click me</Button>
<Button variant='dashedDanger' isLoading={false} size='xs'>Click me</Button>
<Button variant='dashedSuccess' isLoading={false} size='xs'>Click me</Button>
<Button variant='dashedWarning' isLoading={false} size='xs'>Click me</Button>
<Button variant='dashedPrimary' isLoading={false} size='xs'>Click me</Button>
<Button variant='dashedSecondary' isLoading={false} size='xs'>Click me</Button>`}</code>
                  </pre>
                )
              }
            ]} />
        </div>
        <div className="space-x-1">
          <Button variant='ghost' isLoading={false} size='xs'>Click me</Button>
          <Button variant='ghostDanger' isLoading={false} size='xs'>Click me</Button>
          <Button variant='ghostSuccess' isLoading={false} size='xs'>Click me</Button>
          <Button variant='ghostWarning' isLoading={false} size='xs'>Click me</Button>
          <Button variant='ghostPrimary' isLoading={false} size='xs'>Click me</Button>
          <Button variant='ghostSecondary' isLoading={false} size='xs'>Click me</Button>
          <Disclosure
            className="w-full max-w-none shadow-none border border-gray-200 mt-2"
            items={[
              {
                id: 'code-solid-buttons',
                title: 'Xem mã nguồn (Solid Buttons)',
                content: (
                  <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                    <code>{`<Button variant='ghost' isLoading={false} size='xs'>Click me</Button>
<Button variant='ghostDanger' isLoading={false} size='xs'>Click me</Button>
<Button variant='ghostSuccess' isLoading={false} size='xs'>Click me</Button>
<Button variant='ghostWarning' isLoading={false} size='xs'>Click me</Button>
<Button variant='ghostPrimary' isLoading={false} size='xs'>Click me</Button>
<Button variant='ghostSecondary' isLoading={false} size='xs'>Click me</Button>`}</code>
                  </pre>
                )
              }
            ]} />
        </div>

      </div>
      <p className='text-xl font-bold'>2. select</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="flex flex-col gap-4">
          <CustomSelect options={options} label='Select Primary' variant='primary' />
          <CustomSelect options={options} label='Select Success' variant='success' />
        </div>
        <div className="flex flex-col gap-4">
          <MultiSelect options={options} label='Multi Primary' variant='primary' />
          <MultiSelect options={options} label='Multi Danger' variant='danger' />
        </div>
        <div className="flex flex-col gap-4">
          <AutocompleteSelect options={options} label='Autocomplete Primary' variant='primary' />
          <AutocompleteSelect options={options} label='Autocomplete Warning' variant='warning' />
        </div>
        <Disclosure
          className="w-full col-span-1 md:col-span-3 max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-select',
              title: 'Xem mã nguồn (Select Variants)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<CustomSelect options={options} label='Select Success' variant='success' />
<MultiSelect options={options} label='Multi Danger' variant='danger' />
<AutocompleteSelect options={options} label='Autocomplete Warning' variant='warning' />`}</code>
                </pre>
              )
            }
          ]} />
      </div>
      <p className='text-xl font-bold'>3. spinner</p>
      <div className="flex gap-4 items-center">
        <Spinner variant='circle' size='lg' />
        <Spinner variant='circle' size='md' />
        <Spinner variant='circle' size='sm' />
        <Spinner variant='circle' size='xs' />
      </div>
      <Disclosure
        className="w-full col-span-3 max-w-none shadow-none border border-gray-200 mt-2"
        items={[
          {
            id: 'code-spinner',
            title: 'Xem mã nguồn (Spinner)',
            content: (
              <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                <code>{`<Spinner variant='circle' size='lg' />
<Spinner variant='circle' size='md' />
<Spinner variant='circle' size='sm' />
<Spinner variant='circle' size='xs' />`}</code>
              </pre>
            )
          }
        ]} />
      <p className='text-xl font-bold'>4. disclosure</p>
      <div className="">
        <Disclosure items={items} />
        <Disclosure
          className="w-full col-span-3 max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-disclosure',
              title: 'Xem mã nguồn (Disclosure)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<Disclosure items={items} />`}</code>
                </pre>
              )
            }
          ]} />
      </div>
      <p className='text-xl font-bold'>5. input</p>
      <div className="space-y-4">
        <Input label='Input normal' size='md' placeholder='nhập....' />
        <InputPassword label='Input password' placeholder='Nhập mật khẩu' />
        <Disclosure
          className="w-full col-span-3 max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-input',
              title: 'Xem mã nguồn (Input)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<Input label='Input normal' size='md' placeholder='nhập....' />
<InputPassword label='Input password' placeholder='Nhập mật khẩu' />`}</code>
                </pre>
              )
            }
          ]} />
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>6. Checkbox, Switch, Radio</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        {/* Checkbox Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-700">Checkbox</h3>
          <CheckboxGroup label="Quyền truy cập" defaultValue={["read", "write"]}>
            <Checkbox value="read" label="Quyền đọc" variant="primary" size="md" />
            <Checkbox value="write" label="Quyền ghi" variant="success" size="md" />
            <Checkbox value="delete" label="Quyền xóa" variant="danger" size="md" description="Thao tác này rất nguy hiểm" />
            <Checkbox value="admin" label="Quản trị viên" variant="warning" size="md" isIndeterminate />
          </CheckboxGroup>

          <div className="flex gap-2 items-center">
            <Checkbox size="sm" />
            <Checkbox size="md" />
            <Checkbox size="lg" />
          </div>
          <Checkbox isDisabled label="Disabled Checkbox" />
        </div>

        {/* Radio Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-700">Radio</h3>
          <RadioGroup label="Gói dịch vụ" defaultValue="pro" orientation="vertical">
            <Radio value="free" label="Gói Miễn phí" variant="primary" size="md" />
            <Radio value="pro" label="Gói Chuyên nghiệp" variant="success" size="md" description="Khuyên dùng cho nhóm nhỏ" />
            <Radio value="enterprise" label="Gói Doanh nghiệp" variant="warning" size="md" />
            <Radio value="cancel" label="Hủy dịch vụ" variant="danger" size="md" />
          </RadioGroup>

          <RadioGroup aria-label="Sizes" orientation="horizontal">
            <div className="flex gap-2 items-center">
              <Radio size="sm" value="sm" label="Small" />
              <Radio size="md" value="md" label="Medium" />
              <Radio size="lg" value="lg" label="Large" />
            </div>
          </RadioGroup>

          <RadioGroup aria-label="Disabled">
            <Radio value="disabled" isDisabled label="Disabled Radio" />
          </RadioGroup>
        </div>

        {/* Switch Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-700">Switch</h3>
          <div className="flex flex-col gap-3">
            <Switch variant="primary" label="Bật thông báo (Primary)" defaultSelected />
            <Switch variant="success" label="Chế độ bảo vệ (Success)" defaultSelected />
            <Switch variant="danger" label="Chế độ nguy hiểm (Danger)" defaultSelected />
            <Switch variant="warning" label="Chế độ ban đêm (Warning)" defaultSelected />
            <Switch variant="secondary" label="Chế độ ẩn danh (Secondary)" defaultSelected />
          </div>

          <div className="flex gap-4 items-center mt-2">
            <Switch size="sm" />
            <Switch size="md" />
            <Switch size="lg" />
          </div>
          <Switch isDisabled label="Disabled Switch" />
        </div>
      </div>
      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>7. Pickers & Indicators (Slider, Progress)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {/* Slider Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-700">Slider</h3>
          <Slider label="Âm lượng (Primary)" defaultValue={50} variant="primary" />
          <Slider label="Độ sáng (Success)" defaultValue={75} variant="success" />
          <Slider label="Quá tải (Danger)" defaultValue={90} variant="danger" />
          <Slider label="Nhiệt độ (Warning)" typeSlider='point' defaultValue={60} variant="warning" />
          <Slider label="Chế độ (Secondary)" typeSlider='point' defaultValue={30} variant="secondary" />
          <Slider label="Disabled Slider" defaultValue={50} isDisabled />
        </div>

        {/* ProgressBar Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-700">ProgressBar</h3>
          <ProgressBar label="Tải file (Primary)" value={45} variant="primary" />
          <ProgressBar label="Cài đặt (Success)" value={100} variant="success" />
          <ProgressBar label="Xóa dữ liệu (Danger)" value={80} variant="danger" />
          <ProgressBar label="Cảnh báo dung lượng (Warning)" value={85} variant="warning" />
          <ProgressBar label="Bảo trì (Secondary)" value={20} variant="secondary" />
          <ProgressBar label="Indeterminate (Đang xử lý)" isIndeterminate variant="primary" />
        </div>

        {/* ProgressRing Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-700">ProgressRing</h3>
          <div className="flex gap-4 flex-wrap items-center">
            <ProgressRing value={75} variant="primary" size="md" showValueLabel />
            <ProgressRing value={100} variant="success" size="lg" showValueLabel />
            <ProgressRing value={90} variant="danger" size="sm" showValueLabel />
            <ProgressRing value={60} variant="warning" size="md" />
            <ProgressRing value={30} variant="secondary" size="md" />
          </div>

          <h4 className="font-medium text-gray-600 mt-4">Indeterminate State</h4>
          <div className="flex gap-4 items-center">
            <ProgressRing isIndeterminate variant="primary" size="sm" />
            <ProgressRing isIndeterminate variant="success" size="md" />
            <ProgressRing isIndeterminate variant="danger" size="lg" />
          </div>
        </div>
      </div>
      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>8. Layout & Overlays (Tabs, Modal, Tooltip, Popover)</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
        {/* Tabs Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-700">Tabs</h3>
          <Tabs variant="primary">
            <TabList>
              <Tab id="tab1">Hồ sơ</Tab>
              <Tab id="tab2">Bảo mật</Tab>
              <Tab id="tab3">Cài đặt</Tab>
            </TabList>
            <TabPanel id="tab1" className="text-gray-600">Nội dung hồ sơ cá nhân của bạn.</TabPanel>
            <TabPanel id="tab2" className="text-gray-600">Cập nhật mật khẩu và bảo mật hai lớp.</TabPanel>
            <TabPanel id="tab3" className="text-gray-600">Cài đặt hiển thị và thông báo.</TabPanel>
          </Tabs>

          <Tabs variant="success">
            <TabList styleType="pill">
              <Tab id="t1" styleType="pill">Kế hoạch</Tab>
              <Tab id="t2" styleType="pill">Thực thi</Tab>
              <Tab id="t3" styleType="pill">Báo cáo</Tab>
            </TabList>
            <TabPanel id="t1" className="text-gray-600">Lên ý tưởng dự án mới.</TabPanel>
            <TabPanel id="t2" className="text-gray-600">Bắt đầu lập trình.</TabPanel>
            <TabPanel id="t3" className="text-gray-600">Hoàn thành đúng KPI đề ra.</TabPanel>
          </Tabs>
        </div>

        {/* Modal Section */}


        {/* Tooltip & Popover Section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-gray-700">Tooltip & Popover</h3>
          <div className="flex gap-4 items-center flex-wrap">
            {/* Tooltip */}
            <TooltipTrigger>
              <AriaButton className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors outline-none">
                Hover me
              </AriaButton>
              <Tooltip variant="dark" showArrow>Đây là Tooltip Dark</Tooltip>
            </TooltipTrigger>

            <TooltipTrigger delay={1000}>
              <AriaButton className="w-10 h-10 pb-0.5 font-bold flex items-center justify-center bg-danger/10 text-danger rounded-full hover:bg-danger/20 transition-colors outline-none">
                !
              </AriaButton>
              <Tooltip variant="danger" placement="right">Có lỗi xảy ra!</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger delay={0}>
              <AriaButton className="w-10 h-10 pb-0.5 font-bold flex items-center justify-center bg-danger/10 text-danger rounded-full hover:bg-danger/20 transition-colors outline-none">
                !
              </AriaButton>
              <Tooltip variant="danger" placement="left">Có lỗi xảy ra!</Tooltip>
            </TooltipTrigger>

            {/* Popover */}
            <DialogTrigger>
              <AriaButton className="ml-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors outline-none">
                Open Popover
              </AriaButton>
              <Popover showArrow placement="bottom">
                <PopoverDialog title="Cài đặt nhanh">
                  <p className="text-sm text-gray-600 mb-4 w-48">Tuỳ chỉnh màu nền và chế độ hiển thị linh hoạt.</p>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="rounded" /> Giao diện tối</label>
                    <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="rounded" /> Ẩn thông báo</label>
                  </div>
                </PopoverDialog>
              </Popover>
            </DialogTrigger>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-700">Modal — các biến thể</h3>
        <p className="text-sm text-gray-500">Click vào từng button để xem ví dụ tương ứng.</p>
        <Example />
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>9. Date & Time Pickers</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        <div className="space-y-6">
          <InputDate label="Chọn ngày (Default)" variant="primary" />
          <InputDate label="Chọn ngày & giờ" showTime="hour" variant="warning" />
        </div>
        <div className="space-y-6">
          <InputDate label="Chọn ngày (Success)" showTime="minute" variant="success" />
          <InputDate label="Chọn ngày & giờ (Danger)" showTime="second" variant="danger" />
        </div>
        <div className="space-y-6">
          <InputDate label="Chọn khoảng ngày" isRange variant="primary" />
          <InputDate label="Chọn khoảng ngày & giờ" isRange showTime="minute" variant="success" />
        </div>
      </div>
      <div className="p-4 mt-4 bg-gray-50 rounded-xl space-y-6">
        <h4 className="font-semibold text-gray-700">Kích thước (Sizes)</h4>
        <div className="flex flex-col gap-4">
          <InputDate size="xs" label="Size XS" variant="primary" />
          <InputDate size="sm" label="Size SM" variant="success" />
          <InputDate size="md" label="Size MD (Default)" variant="warning" />
          <InputDate size="lg" label="Size LG" variant="danger" />
        </div>
      </div>
      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>10. Tag</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        <Tag variant="primary">Primary</Tag>
        <Tag variant="secondary">Secondary</Tag>
        <Tag variant="danger">Danger</Tag>
        <Tag variant="success">Success</Tag>
        <Tag variant="warning">Warning</Tag>
        <Tag variant="outlinePrimary">Outline Primary</Tag>
        <Tag variant="outlineSecondary">Outline Secondary</Tag>
        <Tag variant="outlineDanger">Outline Danger</Tag>
        <Tag variant="outlineSuccess">Outline Success</Tag>
        <Tag variant="outlineWarning">Outline Warning</Tag>
        <Tag variant="ghostPrimary">Ghost Primary</Tag>
        <Tag variant="ghostSecondary">Ghost Secondary</Tag>
        <Tag variant="ghostDanger">Ghost Danger</Tag>
        <Tag variant="ghostSuccess">Ghost Success</Tag>
        <Tag variant="ghostWarning">Ghost Warning</Tag>
        <Tag variant="outlineGhostPrimary">Outline Ghost Primary</Tag>
        <Tag variant="outlineGhostSecondary">Outline Ghost Secondary</Tag>
        <Tag variant="outlineGhostDanger">Outline Ghost Danger</Tag>
        <Tag variant="outlineGhostSuccess">Outline Ghost Success</Tag>
        <Tag variant="outlineGhostWarning">Outline Ghost Warning</Tag>
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>11. Avatar & AvatarGroup</p>
      <div className="space-y-6 p-4">
        <div className="flex flex-wrap items-center gap-6">
          <Avatar size="sm" src="https://i.pravatar.cc/150?u=1" alt="Avatar SM" />
          <Avatar size="md" src="https://i.pravatar.cc/150?u=2" alt="Avatar MD" />
          <Avatar size="lg" src="https://i.pravatar.cc/150?u=3" alt="Avatar LG" />
          <Avatar size="xl" src="https://i.pravatar.cc/150?u=4" alt="Avatar XL" />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Avatar size="lg" shape="square" src="https://i.pravatar.cc/150?u=5" />
          <Avatar size="lg" shape="circle" bordered src="https://i.pravatar.cc/150?u=6" />
          <Avatar size="lg" fallback="JD" />
          <Avatar size="lg" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Avatar Group</p>
          <AvatarGroup max={4} size="md">
            <Avatar src="https://i.pravatar.cc/150?u=a" />
            <Avatar src="https://i.pravatar.cc/150?u=b" />
            <Avatar src="https://i.pravatar.cc/150?u=c" />
            <Avatar src="https://i.pravatar.cc/150?u=d" />
            <Avatar src="https://i.pravatar.cc/150?u=e" />
          </AvatarGroup>
        </div>
        <Disclosure
          className="w-full max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-avatar',
              title: 'Xem mã nguồn (Avatar)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<Avatar size="lg" src="..." alt="..." />
<AvatarGroup max={4}>...</AvatarGroup>`}</code>
                </pre>
              )
            }
          ]} />
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>12. Skeleton</p>
      <div className="space-y-6 p-4 max-w-md">
        <div className="flex items-center gap-4">
          <Skeleton variant="circle" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" />
          </div>
        </div>
        <Skeleton variant="rect" height={150} />
        <Disclosure
          className="w-full max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-skeleton',
              title: 'Xem mã nguồn (Skeleton)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="text" width="60%" />
<Skeleton variant="rect" height={150} />`}</code>
                </pre>
              )
            }
          ]} />
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>13. Timeline</p>
      <div className="p-4 space-y-10">
        <div>
          <h3 className="font-semibold text-gray-700 mb-4">Vertical Timeline</h3>
          <Timeline direction="vertical">
            <TimelineItem color="primary">
              <p className="font-semibold">Bắt đầu dự án</p>
              <p className="text-sm text-gray-500">20/03/2024 - Khởi tạo repository</p>
            </TimelineItem>
            <TimelineItem color="success">
              <p className="font-semibold">Hoàn thành thiết kế</p>
              <p className="text-sm text-gray-500">22/03/2024 - Approved bởi client</p>
            </TimelineItem>
            <TimelineItem color="warning" dot={<Icons.Wifi className="w-3 h-3 text-warning" />}>
              <p className="font-semibold">Đang triển khai UI</p>
              <p className="text-sm text-gray-500">24/03/2024 - Bổ sung các component cơ bản</p>
            </TimelineItem>
            <TimelineItem color="gray">
              <p className="font-semibold">Kiểm thử (Sắp tới)</p>
              <p className="text-sm text-gray-500">26/03/2024 - Chạy unit test và integration test</p>
            </TimelineItem>
          </Timeline>
        </div>

        <div className="overflow-x-auto">
          <h3 className="font-semibold text-gray-700 mb-4">Horizontal Timeline</h3>
          <Timeline direction="horizontal">
            <TimelineItem color="primary">
              <p className="font-semibold">Bắt đầu dự án</p>
              <p className="text-sm text-gray-500">20/03/2024</p>
            </TimelineItem>
            <TimelineItem color="success">
              <p className="font-semibold">Thiết kế</p>
              <p className="text-sm text-gray-500">22/03/2024</p>
            </TimelineItem>
            <TimelineItem color="warning" dot={<Icons.Wifi className="w-3 h-3 text-warning" />}>
              <p className="font-semibold">Phát triển</p>
              <p className="text-sm text-gray-500">24/03/2024</p>
            </TimelineItem>
            <TimelineItem color="gray">
              <p className="font-semibold">Kiểm thử</p>
              <p className="text-sm text-gray-500">26/03/2024</p>
            </TimelineItem>
          </Timeline>
        </div>

        <Disclosure
          className="w-full max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-timeline',
              title: 'Xem mã nguồn (Timeline)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<Timeline direction="horizontal">
  <TimelineItem color="primary">...</TimelineItem>
  <TimelineItem color="success">...</TimelineItem>
</Timeline>`}</code>
                </pre>
              )
            }
          ]} />
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>14. Table</p>
      <div className="p-4 space-y-8">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Bảng dữ liệu trọn bộ tính năng (Sort, Select, Pagination, Expand)</h3>
          <Table
            data={[
              { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', details: 'Quản trị viên hệ thống với quyền hạn cao nhất. Quản lý toàn bộ nhân viên và tài nguyên.' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', details: 'Người dùng thường, tài khoản đang tạm khoá.' },
              { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active', details: 'Trình soạn thảo nội dung website.' },
              { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'Active', details: 'Người dùng thường, hoạt động tích cực mỗi ngày.' },
              { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', status: 'Pending', details: 'Quản trị viên đa bộ phận đang chờ phê duyệt.' },
            ]}
            columns={[
              { header: 'ID', accessorKey: 'id' },
              { header: 'Tên', accessorKey: 'name' },
              { header: 'Email', accessorKey: 'email' },
              { header: 'Vai trò', accessorKey: 'role' },
              {
                header: 'Trạng thái',
                meta: { align: 'center' },
                accessorKey: 'status',
                cell: ({ getValue }) => (
                  <Tag variant={getValue() === 'Active' ? 'ghostSuccess' : getValue() === 'Inactive' ? 'ghostDanger' : 'ghostWarning'}>
                    {getValue() as string}
                  </Tag>
                )
              },
            ]}
            enableRowSelection
            enablePagination
            enableSorting
            renderPageSizeText={(size) => `${size} dòng`}
            goToPageText="Đến trang"
            renderPaginationText={(from, to, total) => (
              <>
                Hiển thị <span className="font-medium text-gray-900">{from}</span> đến <span className="font-medium text-gray-900">{to}</span> của <span className="font-medium text-gray-900">{total}</span> kết quả
              </>
            )}
            enableExpanding
            renderSubComponent={({ row }) => (
              <div className="py-2 px-4 space-y-2 text-sm text-gray-600">
                <p><strong className="text-gray-900">Thông tin chi tiết:</strong> {row.details}</p>
              </div>
            )}
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Bảng dữ liệu trọn bộ tính năng (Sort, Select, Pagination, Expand)</h3>
          <Table
            data={[
              { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', details: 'Quản trị viên hệ thống với quyền hạn cao nhất. Quản lý toàn bộ nhân viên và tài nguyên.' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', details: 'Người dùng thường, tài khoản đang tạm khoá.' },
              { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active', details: 'Trình soạn thảo nội dung website.' },
              { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'Active', details: 'Người dùng thường, hoạt động tích cực mỗi ngày.' },
              { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', status: 'Pending', details: 'Quản trị viên đa bộ phận đang chờ phê duyệt.' },
            ]}
            columns={[
              { header: 'ID', accessorKey: 'id', meta: { align: 'center' } },
              { header: 'Tên', accessorKey: 'name' },
              { header: 'Email', accessorKey: 'email' },
              { header: 'Vai trò', accessorKey: 'role' },
              {
                header: 'Trạng thái',
                accessorKey: 'status',
                cell: ({ getValue }) => (
                  <Tag variant={getValue() === 'Active' ? 'success' : getValue() === 'Inactive' ? 'danger' : 'warning'}>
                    {getValue() as string}
                  </Tag>
                )
              },
            ]}
            enableRowSelection
            enablePagination
            enableSorting

          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Bảng dữ liệu không có dữ liệu, không phân trang, không sắp xếp, không chọn hàng</h3>
          <Table
            data={[]}
            columns={[
              { header: 'ID', accessorKey: 'id', meta: { align: 'center' } },
              { header: 'Tên', accessorKey: 'name' },
              { header: 'Email', accessorKey: 'email' },
              { header: 'Vai trò', accessorKey: 'role' },
              {
                header: 'Trạng thái',
                accessorKey: 'status',
                cell: ({ getValue }) => (
                  <Tag variant={getValue() === 'Active' ? 'success' : getValue() === 'Inactive' ? 'danger' : 'warning'}>
                    {getValue() as string}
                  </Tag>
                )
              },
            ]}
            enablePagination
            enableSorting={false}

          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Bảng dữ liệu trọn bộ tính năng (Sort, Select, Pagination, Expand)</h3>
          <Table
            data={[
              { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', details: 'Quản trị viên hệ thống với quyền hạn cao nhất. Quản lý toàn bộ nhân viên và tài nguyên.' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', details: 'Người dùng thường, tài khoản đang tạm khoá.' },
              { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active', details: 'Trình soạn thảo nội dung website.' },
              { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'Active', details: 'Người dùng thường, hoạt động tích cực mỗi ngày.' },
              { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', status: 'Pending', details: 'Quản trị viên đa bộ phận đang chờ phê duyệt.' },
            ]}
            columns={[
              { header: 'ID', accessorKey: 'id' },
              { header: 'Tên', accessorKey: 'name' },
              { header: 'Email', accessorKey: 'email' },
              { header: 'Vai trò', accessorKey: 'role' },
              {
                header: 'Trạng thái',
                accessorKey: 'status',
                cell: ({ getValue }) => (
                  <Tag variant={getValue() === 'Active' ? 'success' : getValue() === 'Inactive' ? 'danger' : 'warning'}>
                    {getValue() as string}
                  </Tag>
                )
              },
            ]}
            enablePagination
            enableSorting
            enableExpanding
            renderSubComponent={({ row }) => (
              <div className="py-2 px-4 space-y-2 text-sm text-gray-600">
                <p><strong className="text-gray-900">Thông tin chi tiết:</strong> {row.details}</p>
              </div>
            )}
          />
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Bảng đang tải (Loading)</h3>
          <Table
            data={[
              { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', details: 'Quản trị viên hệ thống với quyền hạn cao nhất. Quản lý toàn bộ nhân viên và tài nguyên.' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', details: 'Người dùng thường, tài khoản đang tạm khoá.' },
              { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active', details: 'Trình soạn thảo nội dung website.' },
              { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'Active', details: 'Người dùng thường, hoạt động tích cực mỗi ngày.' },
              { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', status: 'Pending', details: 'Quản trị viên đa bộ phận đang chờ phê duyệt.' },
            ]}
            columns={[
              { header: 'ID', accessorKey: 'id', meta: { align: 'center' } },
              { header: 'Tên', accessorKey: 'name' },
              { header: 'Email', accessorKey: 'email' },
              { header: 'Vai trò', accessorKey: 'role' },
            ]}
            isLoading={true}
          />
        </div>

        <Disclosure
          className="w-full max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-table',
              title: 'Xem mã nguồn (Table)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`
<Table
  data={[
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', details: 'Quản trị viên hệ thống với quyền hạn cao nhất. Quản lý toàn bộ nhân viên và tài nguyên.' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', details: 'Người dùng thường, tài khoản đang tạm khoá.' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active', details: 'Trình soạn thảo nội dung website.' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'Active', details: 'Người dùng thường, hoạt động tích cực mỗi ngày.' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', status: 'Pending', details: 'Quản trị viên đa bộ phận đang chờ phê duyệt.' },
  ]}
  columns={[
    { header: 'ID', accessorKey: 'id' },
    { header: 'Tên', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Vai trò', accessorKey: 'role' },
    {
      header: 'Trạng thái',
      meta: { align: 'center' },
      accessorKey: 'status',
      cell: ({ getValue }) => (
        <Tag variant={getValue() === 'Active' ? 'ghostSuccess' : getValue() === 'Inactive' ? 'ghostDanger' : 'ghostWarning'}>
          {getValue() as string}
        </Tag>
      )
    },
  ]}
  enableRowSelection
  enablePagination
  enableSorting

  //đặt renderPageSizeText={null} để ẩn ô chọn số dòng
  renderPageSizeText={(size) => \`\${size} dòng\`}

  //đặt goToPageText={null} để ẩn ô nhạp số trang
  goToPageText="Đến trang"

  //đặt renderPaginationText={null} để ẩn ô hiển thị số dòng
  renderPaginationText={(from, to, total) => (
    <>
      Hiển thị <span className="font-medium text-gray-900">{from}</span> đến <span className="font-medium text-gray-900">{to}</span> của <span className="font-medium text-gray-900">{total}</span> kết quả
    </>
  )}
  enableExpanding
  renderSubComponent={({ row }) => (
    <div className="py-2 px-4 space-y-2 text-sm text-gray-600">
      <p><strong className="text-gray-900">Thông tin chi tiết:</strong> {row.details}</p>
    </div>
  )}
/>

`}</code>
                </pre>
              )
            }
          ]} />
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2'>15. Upload</p>
      <div className="p-4 max-w-xl">
        <Upload
          value={uploadedFiles}
          onChange={setUploadedFiles}
          multiple
          maxFiles={3}
          accept="image/*,.pdf"
        />
        <Disclosure
          className="w-full max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-upload',
              title: 'Xem mã nguồn (Upload)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<Upload 
  value={files} 
  onChange={setFiles} 
  multiple 
  maxFiles={3}
/>`}</code>
                </pre>
              )
            }
          ]} />
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2' id="tour-section">16. Tour</p>
      <div className="p-4">
        <Button variant="primary" onClick={() => setIsTourOpen(true)} id="start-tour-btn">
          Bắt đầu hướng dẫn (Start Tour)
        </Button>
        <Tour
          open={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          steps={[
            {
              target: '#start-tour-btn',
              title: 'Bắt đầu',
              description: 'Nhấn vào đây bất cứ khi nào bạn muốn xem lại hướng dẫn sử dụng thư viện.',
              placement: 'bottom'
            },
            {
              target: '#tour-section',
              title: 'Danh sách Component',
              description: 'Đây là nơi trưng bày tất cả các component mà chúng tôi đã xây dựng.',
              placement: 'top'
            },
          ]}
        />
        <Disclosure
          className="w-full max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-tour',
              title: 'Xem mã nguồn (Tour)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`
const [isTourOpen, setIsTourOpen] = useState(false);

<Button variant="primary" onClick={() => setIsTourOpen(true)} id="start-tour-btn">
  Bắt đầu hướng dẫn (Start Tour)
</Button>

<Tour
  open={isTourOpen}
  onClose={() => setIsTourOpen(false)}
  steps={[
    {
      target: '#start-tour-btn',
      title: 'Bắt đầu',
      description: 'Nhấn vào đây bất cứ khi nào bạn muốn xem lại hướng dẫn sử dụng thư viện.',
      placement: 'bottom'
    },
    {
      target: '#tour-section',
      title: 'Danh sách Component',
      description: 'Đây là nơi trưng bày tất cả các component mà chúng tôi đã xây dựng.',
      placement: 'top'
    },
  ]}
/>`}</code>
                </pre>
              )
            }
          ]} />
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2' id="form-section">17. Form</p>
      <div className="p-4">
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onFormSubmit)} className="space-y-4 max-w-xl p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Đăng ký tài khoản</h3>

            <FormInput name="username" label="Tên đăng nhập" placeholder="Nhập tên đăng nhập..." />
            <FormInput name="password" label="Mật khẩu" placeholder="Nhập mật khẩu..." isPassword />

            <FormSelect
              name="role"
              label="Vai trò"
              options={[{ label: 'Quản trị viên', value: 'admin' }, { label: 'Người dùng', value: 'user' }]}
            />

            <FormSelect
              name="language"
              label="Ngôn ngữ"
              selectType='multi'
              options={[{ label: 'Tiếng Việt', value: 'vi' }, { label: 'Tiếng Anh', value: 'en' }]}
            />

            <FormInputDate name="birthDate" label="Ngày sinh" valueFormat='DD/MM/YYYY' />

            <div className="grid grid-cols-2 gap-4">
              <FormCheckboxGroup name="skills" label="Kỹ năng">
                <Checkbox value="react" label="ReactJS" />
                <Checkbox value="vue" label="VueJS" />
                <Checkbox value="angular" label="Angular" />
              </FormCheckboxGroup>

              <FormRadioGroup name="gender" label="Giới tính" orientation="vertical">
                <Radio value="male" label="Nam" />
                <Radio value="female" label="Nữ" />
                <Radio value="other" label="Khác" />
              </FormRadioGroup>
            </div>
            <div className="">
              <FormUpload name="avatar" label="Ảnh đại diện" />
            </div>
            <FormCheckbox name="acceptTerms" label="Tôi đồng ý với các điều khoản dịch vụ" />

            <div className="pt-4 border-t mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => formMethods.reset()}>Làm mới</Button>
              <Button type="submit" variant="primary">Đăng ký</Button>
            </div>
          </form>
        </FormProvider>

          <Disclosure
          className="w-full max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-tour',
              title: 'Xem mã nguồn (Tour)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onFormSubmit)} className="space-y-4 max-w-xl p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Đăng ký tài khoản</h3>

            <FormInput name="username" label="Tên đăng nhập" placeholder="Nhập tên đăng nhập..." />
            <FormInput name="password" label="Mật khẩu" placeholder="Nhập mật khẩu..." isPassword />

            <FormSelect
              name="role"
              label="Vai trò"
              options={[{ label: 'Quản trị viên', value: 'admin' }, { label: 'Người dùng', value: 'user' }]}
            />

            <FormSelect
              name="language"
              label="Ngôn ngữ"
              selectType='multi'
              options={[{ label: 'Tiếng Việt', value: 'vi' }, { label: 'Tiếng Anh', value: 'en' }]}
            />

            <FormInputDate name="birthDate" label="Ngày sinh" valueFormat='DD/MM/YYYY' />

            <div className="grid grid-cols-2 gap-4">
              <FormCheckboxGroup name="skills" label="Kỹ năng">
                <Checkbox value="react" label="ReactJS" />
                <Checkbox value="vue" label="VueJS" />
                <Checkbox value="angular" label="Angular" />
              </FormCheckboxGroup>

              <FormRadioGroup name="gender" label="Giới tính" orientation="vertical">
                <Radio value="male" label="Nam" />
                <Radio value="female" label="Nữ" />
                <Radio value="other" label="Khác" />
              </FormRadioGroup>
            </div>
            <div className="">
              <FormUpload name="avatar" label="Ảnh đại diện" />
            </div>
            <FormCheckbox name="acceptTerms" label="Tôi đồng ý với các điều khoản dịch vụ" />

            <div className="pt-4 border-t mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => formMethods.reset()}>Làm mới</Button>
              <Button type="submit" variant="primary">Đăng ký</Button>
            </div>
          </form>
        </FormProvider>`}</code>
                </pre>
              )
            }
          ]} />
      </div>

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2' id="toast-section">18. Toast</p>
      <div className="p-4">
        <ExampleToast />
        {/* <Button onPress={() => toast.success('Lưu thành công!', 'Dữ liệu đã được cập nhật.', 3000)}>Show Toast</Button> */}
        <Disclosure
          className="w-full max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-toast',
              title: 'Xem mã nguồn (Toast)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`
<MyToastRegion placement="bottom-right" />
// Gọi ở bất kỳ đâu
toast.success('Lưu thành công!', 'Dữ liệu đã được cập nhật.', 3000);
toast.error('Có lỗi!', undefined, 5000);
                  
                  
                  `}</code>
                </pre>
              )
            }
          ]} />
      </div> 

      <p className='text-xl font-bold mt-8 mb-4 border-b pb-2' id="card-section">19. Card</p>
      <div className="p-4">
        <ExampleCard />
        <Disclosure
          className="w-full max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-card',
              title: 'Xem mã nguồn (Card)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here...
  </CardContent>
  <CardFooter>
    <Button>Footer Action</Button>
  </CardFooter>
</Card>
                  `}</code>
                </pre>
              )
            }
          ]} />
      </div>

    </div>
  )
}

export default Test

