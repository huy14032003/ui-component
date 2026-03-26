import React, { useState } from 'react';
import { Flex, Text, Box, TextArea } from "@radix-ui/themes";
import { Button } from './components/ui/button';
import { Select, MultiSelect, Autocomplete } from './components/ui/select';
import { Skeleton } from './components/ui/skeleton';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './components/ui/popover';
import { Avatar, AvatarGroup } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import * as Icons from '@components/icons';
import { Timeline, TimelineItem } from "./components/ui/timeline";
import { Modal } from "./components/ui/modal";
import { RadioGroup, Radio, RadioCard } from "./components/ui/radio";
import { Spinner } from './components/ui/spinner';

const Test = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [glassOpen, setGlassOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConfirmLoading(false);
    setLoadingOpen(false);
  };

  return (
    <div className="p-8 min-h-screen">
      <Flex direction="column" gap="8">
        <section>
          <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">1. Glass 3D (Subtle Effect)</Text>
          <Flex gap="4" wrap="wrap" className="p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <Button size="sm" variant="glass" color="secondary" rightIcon={<Icons.ArrowRight size={16} />}>Next</Button>
            <Button size='md' variant="glass" color="primary">Primary Glass</Button>
            <Button size='lg' variant="glass" color="success">Success Glass</Button>
            <Button size='md' variant="glass" color="danger">Danger Glass</Button>
            <Button size='sm' variant="glass" color="warning">Warning Glass</Button>
          </Flex>
        </section>

        <section>
          <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">2. Solid (Shadcn Style)</Text>
          <Flex gap="4" wrap="wrap">
            <Button variant="solid" color="primary">Primary Solid</Button>
            <Button variant="solid" color="secondary">Secondary Solid</Button>
            <Button variant="solid" color="danger">Destructive</Button>
          </Flex>
        </section>

        <section>
          <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">3. Sizes & States</Text>
          <Flex gap="4" align="center">
            <Button size="sm" variant="glass">Small Glass</Button>
            <Button size="md" variant="glass">Medium Glass</Button>
            <Button size="lg" variant="glass">Large Glass</Button>
            <Button isLoading variant="glass">Processing</Button>
            <Button disabled variant="glass">Disabled</Button>
          </Flex>
        </section>

        <section>
          <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">4. Icons & Variants</Text>
          <Flex gap="4">
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="ghost" color='danger'>Ghost</Button>
            <Button variant="link">Link Style</Button>
            <Button variant="glass" color="primary" leftIcon={<Icons.Mail size={16} />}>Messages</Button>
            <Button variant="solid" color="success" leftIcon={<Icons.Plus size={16} />}>Create New</Button>
          </Flex>
        </section>
      </Flex>

      <section className="mt-12">
        <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">5. Advanced Selects</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
          {/* Single Select */}
          <div className="space-y-6">
            <Text size="3" weight="bold" className="text-primary/80">Single Select</Text>
            <Select 
              label="Framework"
              placeholder="Chọn framework..."
              options={[
                { label: 'React', value: 'react' },
                { label: 'Vue', value: 'vue' },
                { label: 'Angular', value: 'angular' },
                { label: 'Svelte', value: 'svelte', disabled: true },
              ]}
              variant="solid"
              defaultValue='react'
              isClearable
            />
            <Select 
              label="Theme (Glass)"
              placeholder="Chọn giao diện..."
              options={[
                { label: 'Dark Mode', value: 'dark' },
                { label: 'Light Mode', value: 'light' },
                { label: 'System', value: 'system' },
              ]}
              color="primary"
              isClearable
            />
            <Select 
              label="Size Small"
              size="sm"
              options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]}
            />
          </div>

          {/* Multi Select */}
          <div className="space-y-6">
            <Text size="3" weight="bold" className="text-secondary/80">Multi Select</Text>
            <MultiSelect 
              label="Công cụ"
              placeholder="Chọn công cụ..."
              defaultValue={['git', 'docker']}
              options={[
                { label: 'Git', value: 'git' },
                { label: 'Docker', value: 'docker' },
                { label: 'Kubernetes', value: 'k8s' },
                { label: 'Terraform', value: 'terraform' },
                { label: 'Terraform1', value: 'terraform1' },
                { label: 'Terraform2', value: 'terraform2' },
                { label: 'Terraform3', value: 'terraform3' },
                { label: 'Terraform4', value: 'terraform4' },
                { label: 'Terraform5', value: 'terraform5' },
                { label: 'Terraform6', value: 'terraform6' },
              ]}
              variant="solid"
            />
            <MultiSelect 
              label="Công nghệ (Glass)"
              placeholder="Chọn công nghệ..."
              options={[
                { label: 'TypeScript', value: 'ts' },
                { label: 'JavaScript', value: 'js' },
                { label: 'Python', value: 'py' },
                { label: 'Go', value: 'go' },
              ]}
              color="primary"
              isClearable
              showSelectAll
            />
          </div>

          {/* Autocomplete */}
          <div className="space-y-6">
            <Text size="3" weight="bold" className="text-success/80">Autocomplete (Combobox)</Text>
            <Autocomplete 
              label="Quốc gia"
              placeholder="Tìm quốc gia..."
              options={[
                { label: 'Việt Nam', value: 'vn' },
                { label: 'Mỹ', value: 'us' },
                { label: 'Nhật Bản', value: 'jp' },
                { label: 'Hàn Quốc', value: 'kr' },
                { label: 'Pháp', value: 'fr' },
                { label: 'Đức', value: 'de' },
              ]}
              variant="solid"
              isClearable
            />
            <Autocomplete 
              label="Thành phố (Glass)"
              placeholder="Tìm thành phố..."
              options={[
                { label: 'Hà Nội', value: 'hn' },
                { label: 'TP. Hồ Chí Minh', value: 'hcm' },
                { label: 'Đà Nẵng', value: 'dn' },
                { label: 'Cần Thơ', value: 'ct' },
              ]}
            />
            <Select 
              label="Loading State"
              isLoading
              options={[]}
            />
          </div>
        </div>
      </section>

      <section>
        <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">6. Skeleton</Text>
        <div className="">
          <div className="flex items-center gap-4">
            <Skeleton variant="circle" className='h-16 w-16' />
            <div className="flex flex-col gap-2">
              <Skeleton variant='text' className='h-4 w-[20rem]' />
              <Skeleton variant="rect" className='h-10 w-[20rem]' />
            </div>
          </div>
        </div>
      </section>

      <section>
        <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">7. Popover</Text>
        <div className="flex gap-4">
          {/* Reusable Solid Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Solid Popover</Button>
            </PopoverTrigger>
            <PopoverContent variant="solid" className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium leading-none">Settings</h4>
                <p className="text-sm text-muted-foreground">Manage your account preferences.</p>
                <div className="flex gap-2">
                   <Button size="sm" color="primary">Save Changes</Button>
                   <PopoverClose asChild>
                      <Button size="sm" variant="ghost">Close</Button>
                   </PopoverClose>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Reusable Glass Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Glass Popover</Button>
            </PopoverTrigger>
            <PopoverContent variant="glass" className="w-80">
              <Flex gap="3">
                <Avatar
                  size="lg"
                  src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                  fallback="A"
                />
                <Box flexGrow="1">
                  <TextArea placeholder="Write a comment…" style={{ height: 80 }} className="bg-transparent border-white/10 text-white placeholder:text-white/50" />
                  <Flex gap="3" mt="3" justify="between">
                    <Flex align="center" gap="2" asChild>
                      <Text as="label" size="2" className="text-white">
                        {/* <Checkbox /> */}
                        <Text>Send to group</Text>
                      </Text>
                    </Flex>
                    <PopoverClose asChild>
                      <Button size="sm" variant="glass">Send</Button>
                    </PopoverClose>
                  </Flex>
                </Box>
              </Flex>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      <section>
        <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">8. Avatar</Text>
        <div className="flex gap-4">
          <Avatar
            size="lg"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            fallback="A"
          />
          <Avatar
            size="md"
            fallback="A"
          />
          <Avatar
            size="sm"
            fallback="AB"
          />
          <AvatarGroup max={3}>
            <Avatar
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              fallback="A"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              fallback="B"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              fallback="C"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              fallback="D"
            />
          </AvatarGroup>
        </div>
      </section>
      <section>
        <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">9. Badge & Status</Text>
        
        <div className="space-y-8">
          {/* Status (Filled - Subtle) */}
          <div>
            <Text size="3" weight="bold" className="mb-4 block text-slate-300">Status (filled)</Text>
            <div className="flex flex-wrap gap-3">
              <Badge variant="filled" intent="success" leftIcon={<Icons.CheckCircle2 className="w-3.5 h-3.5" />}>success</Badge>
              <Badge variant="filled" intent="info" leftIcon={<Icons.RefreshCcw className="w-3.5 h-3.5 animate-spin-slow" />}>processing</Badge>
              <Badge variant="filled" intent="warning" leftIcon={<Icons.AlertTriangle className="w-3.5 h-3.5" />}>warning</Badge>
              <Badge variant="filled" intent="error" leftIcon={<Icons.AlertCircle className="w-3.5 h-3.5" />}>error</Badge>
              <Badge variant="filled" intent="default" leftIcon={<Icons.Clock className="w-3.5 h-3.5" />}>default</Badge>
            </div>
          </div>

          {/* Status (Solid - Strong) */}
          <div>
            <Text size="3" weight="bold" className="mb-4 block text-slate-300">Status (solid)</Text>
            <div className="flex flex-wrap gap-3">
              <Badge variant="solid" intent="success" leftIcon={<Icons.CheckCircle2 className="w-3.5 h-3.5" />}>success</Badge>
              <Badge variant="solid" intent="info" leftIcon={<Icons.RefreshCcw className="w-3.5 h-3.5 animate-spin-slow" />}>processing</Badge>
              <Badge variant="solid" intent="warning" leftIcon={<Icons.AlertTriangle className="w-3.5 h-3.5" />}>warning</Badge>
              <Badge variant="solid" intent="error" leftIcon={<Icons.AlertCircle className="w-3.5 h-3.5" />}>error</Badge>
              <Badge variant="solid" intent="default" leftIcon={<Icons.Clock className="w-3.5 h-3.5" />}>default</Badge>
            </div>
          </div>

          {/* Status (Outlined) */}
          <div>
            <Text size="3" weight="bold" className="mb-4 block text-slate-300">Status (outlined)</Text>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" intent="success" leftIcon={<Icons.CheckCircle2 className="w-3.5 h-3.5" />}>success</Badge>
              <Badge variant="outline" intent="info" leftIcon={<Icons.RefreshCcw className="w-3.5 h-3.5 animate-spin-slow" />}>processing</Badge>
              <Badge variant="outline" intent="warning" leftIcon={<Icons.AlertTriangle className="w-3.5 h-3.5" />}>warning</Badge>
              <Badge variant="outline" intent="error" leftIcon={<Icons.AlertCircle className="w-3.5 h-3.5" />}>error</Badge>
              <Badge variant="outline" intent="default" leftIcon={<Icons.Clock className="w-3.5 h-3.5" />}>default</Badge>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <Text size="3" weight="bold" className="mb-4 block text-slate-300">Sizes</Text>
            <div className="flex items-end gap-4">
              <Badge size="sm" variant="glass" intent="info">Small Tag</Badge>
              <Badge size="md" variant="glass" intent="success">Medium Tag</Badge>
              <Badge size="lg" variant="glass" intent="error">Large Tag</Badge>
            </div>
          </div>

          {/* Premium Glass Variants */}
          <div>
            <Text size="3" weight="bold" className="mb-4 block text-slate-300">Premium Glassmorphism</Text>
            <div className="flex flex-wrap gap-3">
              <Badge variant="glass" intent="success" leftIcon={<Icons.CheckCircle2 className="w-3.5 h-3.5" />}>Complete</Badge>
              <Badge variant="glass" intent="info" rightIcon={<Icons.RefreshCcw className="w-3.5 h-3.5 animate-spin-slow" />}>Syncing</Badge>
              <Badge variant="glass" intent="warning" leftIcon={<Icons.AlertTriangle className="w-3.5 h-3.5" />}>Waiting</Badge>
              <Badge variant="glass" intent="error" leftIcon={<Icons.AlertCircle className="w-3.5 h-3.5" />}>Critical</Badge>
              <Badge variant="glass" intent="default" leftIcon={<Icons.AlertCircle className="w-3.5 h-3.5" />}>Critical</Badge>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">10. Timeline</Text>
        <Timeline>
          <TimelineItem>Event 1</TimelineItem>
          <TimelineItem>Content 1</TimelineItem>
          <TimelineItem>Event 2</TimelineItem>
          <TimelineItem>Content 2</TimelineItem>
          <TimelineItem>Event 3</TimelineItem>
          <TimelineItem isLast color='success' dot={<Icons.CheckCircle2  className="w-3.5 h-3.5" />}>Content 3</TimelineItem>
        </Timeline>

        <Timeline direction="horizontal" itemWidth={160}>
          <TimelineItem>Event 1</TimelineItem>
          <TimelineItem>Content 1</TimelineItem>
          <TimelineItem width={100}>Short Event</TimelineItem>
          <TimelineItem dot={<Icons.CheckCircle2  className="w-3.5 h-3.5 text-danger" />}>Event 3</TimelineItem>
          <TimelineItem isLast={true} color='success' dot={<Icons.CheckCircle2  className="w-3.5 h-3.5 text-success" />}>Content 3</TimelineItem>
        </Timeline>
      </section>
      <section>
        <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">11. Modal (AntD Style)</Text>
        <Flex gap="4">
          <Button variant="solid" color="primary" onClick={() => setBasicOpen(true)}>Open Basic Modal</Button>
          <Button variant="glass" color="primary" onClick={() => setGlassOpen(true)}>Open Glass Modal</Button>
          <Button variant="outline" onClick={() => setLoadingOpen(true)}>Open Loading Modal</Button>
        </Flex>

        {/* Basic Modal */}
        <Modal 
          open={basicOpen} 
          onOpenChange={setBasicOpen}
          title="Basic Modal"
          variant="solid"
          onOk={() => setBasicOpen(false)}
        >
          <p>Đây là nội dung của modal cơ bản. Nó có giao diện sạch sẽ và hiện đại.</p>
          <p className="mt-2 text-slate-500">Bạn có thể sử dụng prop `onOk` và `onCancel` một cách dễ dàng.</p>
        </Modal>

        {/* Glass Modal */}
        <Modal 
          open={glassOpen} 
          onOpenChange={setGlassOpen}
          title="Premium Glass Modal"
          variant="glass"
          onOk={() => setGlassOpen(false)}
          okText="Đã hiểu"
          cancelText="Đóng"
        >
          <div className="space-y-4">
            <p>Hiệu ứng Glassmorphism cực kỳ sang trọng với backdrop-blur và viền phản chiếu ánh sáng.</p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Text size="2" color="gray">Nội dung bên trong cũng có thể được style theo phong cách glass.</Text>
            </div>
            <p>Phù hợp cho các ứng dụng Dashboard cao cấp.</p>
          </div>
        </Modal>

        {/* Loading Modal */}
        <Modal 
          open={loadingOpen} 
          onOpenChange={setLoadingOpen}
          title="Confirm Action"
          confirmLoading={confirmLoading}
          onOk={handleOk}
          okText="Xử lý ngay"
        >
          <p>Khi nhấn "Xử lý ngay", nút OK sẽ hiển thị trạng thái loading trong 2 giây.</p>
          <p className="mt-2 text-warning">Hành động này không thể hoàn tác.</p>
        </Modal>
      </section>

      <section className="mb-12">
        <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">12. Radio & Selection</Text>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Standard Radios */}
          <div className="space-y-8">
            <div>
              <Text size="3" weight="bold" className="mb-4 block text-slate-300">Standard Radio (Sizes & Intents)</Text>
              <RadioGroup defaultValue="md-primary" orientation="horizontal">
                <Radio value="sm-success" size="sm" intent="success" label="Small Success" />
                <Radio value="md-primary" size="md" intent="primary" label="Medium Primary" />
                <Radio value="lg-danger" size="lg" intent="danger" label="Large Danger" />
              </RadioGroup>
            </div>

            <div>
              <Text size="3" weight="bold" className="mb-4 block text-slate-300">Radio Variants (Vertical)</Text>
              <div className="grid grid-cols-2 gap-8">
                <RadioGroup defaultValue="glass">
                  <Radio value="solid" variant="solid" label="Solid Variant" description="Clean and simple" />
                </RadioGroup>
                
                <RadioGroup defaultValue="disabled">
                   <Radio value="enabled" label="Enabled Option" />
                   <Radio value="disabled" disabled label="Disabled Option" description="This cannot be selected" />
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Radio Cards */}
          <div className="space-y-8">
            <div>
              <Text size="3" weight="bold" className="mb-4 block text-slate-300">Radio Cards (Selection UI)</Text>
              <RadioGroup defaultValue="pro" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RadioCard 
                  value="free" 
                  title="Free Plan" 
                  description="Great for starters and hobbyists."
                  icon={<Icons.Mail className="w-5 h-5" />}
                />
                <RadioCard 
                  value="pro" 
                  title="Pro Plan" 
                  description="Advanced features for professionals."
                  icon={<Icons.CheckCircle2 className="w-5 h-5" />}
                />
                <RadioCard 
                  value="enterprise" 
                  title="Enterprise" 
                  description="Custom solutions for large teams."
                  icon={<Icons.Plus className="w-5 h-5" />}
                  variant="solid"
                />
                <RadioCard 
                  value="custom" 
                  disabled
                  title="Custom (Disabled)" 
                  description="Contact us for a tailored plan."
                  icon={<Icons.AlertCircle className="w-5 h-5" />}
                />
              </RadioGroup>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Text size="5" weight="bold" className="mb-6 block text-slate-400 uppercase tracking-widest">13. Loader</Text>
        <Spinner icon={<Icons.Mail className="w-5 h-5 " />} size='lg'/>
        <Spinner  size='md'/>
        <Spinner  size='sm'/>
        <Spinner  size='xs'/>
      </section>
    </div>
  )
}

export default Test
