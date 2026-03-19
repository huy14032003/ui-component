import * as Icons from '@components/icons'
import Spinner from '@components/ui/spinner/Spinner'
import Button from '@components/ui/button/Buton'
import { AutocompleteSelect, CustomSelect, MultiSelect } from '@components/ui/select/Select';
import { Disclosure } from './components/ui/disclosure/Disclosure';
const Test = () => {

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
    <div className="p-4">
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
        <CustomSelect options={options} label='Select normal' />
        <MultiSelect options={options} label='Select multiple' />
        <AutocompleteSelect options={options} label='Select autocomplete' />
        <Disclosure
          className="w-full col-span-1 md:col-span-3 max-w-none shadow-none border border-gray-200 mt-2"
          items={[
            {
              id: 'code-select',
              title: 'Xem mã nguồn (Select)',
              content: (
                <pre className="p-4 bg-gray-900 text-blue-300 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{`<CustomSelect options={options} label='Select normal' />
<MultiSelect options={options} label='Select multiple' />
<AutocompleteSelect options={options} label='Select autocomplete' />`}</code>
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
      <div className="flex gap-4 items-center">
        <Disclosure items={items} />
      </div>
    </div>
  )
}

export default Test