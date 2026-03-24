import { useState } from 'react';
import Button from '../button/Button';
import { MyToastRegion, toast, type ToastPlacement, type ToastVariant } from './Toast';

const variants: { label: string; variant: ToastVariant; btnVariant: 'primary' | 'success' | 'warning' | 'danger' | 'secondary' }[] = [
  { label: 'Info',    variant: 'info',    btnVariant: 'primary' },
  { label: 'Success', variant: 'success', btnVariant: 'success' },
  { label: 'Warning', variant: 'warning', btnVariant: 'warning' },
  { label: 'Error',   variant: 'error',   btnVariant: 'danger' },
  { label: 'Default', variant: 'default', btnVariant: 'secondary' },
];

const placements: ToastPlacement[] = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right',
];

function ExampleToast() {
  const [placement, setPlacement] = useState<ToastPlacement>('bottom-right');
  const [timeout, setTimeoutVal] = useState(4000);

  const fire = (variant: ToastVariant) => {
    toast.show(
      {
        title: `Toast ${variant}`,
        description: `Đây là thông báo kiểu "${variant}". Tự đóng sau ${timeout / 1000}s.`,
        variant,
      },
      timeout
    );
  };

  return (
    <div className="space-y-5">
      <MyToastRegion placement={placement} />

      {/* Placement selector */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">Vị trí hiển thị</p>
        <div className="flex flex-wrap gap-2">
          {placements.map(p => (
            <button
              key={p}
              onClick={() => setPlacement(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors outline-none ${
                placement === p
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Timeout slider */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">
          Thời gian tự đóng: <span className="text-primary font-bold">{timeout / 1000}s</span>
        </p>
        <input
          type="range"
          min={1000}
          max={10000}
          step={500}
          value={timeout}
          onChange={e => setTimeoutVal(Number(e.target.value))}
          className="w-full max-w-xs accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 max-w-xs">
          <span>1s</span><span>5s</span><span>10s</span>
        </div>
      </div>

      {/* Variant buttons */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">Loại Toast</p>
        <div className="flex flex-wrap gap-2">
          {variants.map(({ label, variant, btnVariant }) => (
            <Button
              key={variant}
              variant={btnVariant}
              size="sm"
              onPress={() => fire(variant)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExampleToast;
