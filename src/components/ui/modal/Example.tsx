import { Modal } from './Modal';
import Button from '../button/Button';
import { useState } from 'react';
import * as Icons from '@components/icons';
import Tag from '../tag/Tag';

// --- 1. Modal thông báo đơn giản ---
function ModalSimple() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" size="sm" onPress={() => setOpen(true)}>Thông báo</Button>
      <Modal
        isOpen={open}
        handleClose={() => setOpen(false)}
        onOpenChange={setOpen}
        isDismissable
        title="Thông báo hệ thống"
        footer={null}
        width={420}
      >
        <div className="py-4 flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Icons.Bell className="w-7 h-7 text-primary" />
          </div>
          <p className="text-gray-700 font-medium">Hệ thống sẽ bảo trì vào lúc <span className="text-primary font-bold">02:00 AM</span> ngày mai.</p>
          <p className="text-sm text-gray-500">Vui lòng lưu lại công việc trước khi hệ thống tắt.</p>
          <Button variant="primary" size="sm" className="mt-2" onPress={() => setOpen(false)}>Đã hiểu</Button>
        </div>
      </Modal>
    </>
  );
}

// --- 2. Modal xác nhận xóa ---
function ModalConfirmDelete() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" size="sm" onPress={() => setOpen(true)}>Xóa dữ liệu</Button>
      <Modal
        isOpen={open}
        handleClose={() => setOpen(false)}
        onOpenChange={setOpen}
        title="Xác nhận xóa"
        width={440}

        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onPress={() => setOpen(false)}>Hủy bỏ</Button>
            <Button variant="danger" size="sm" onPress={() => setOpen(false)}>Xóa vĩnh viễn</Button>
          </div>
        }
      >
        <div className="py-4 flex flex-col gap-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-danger/5 border border-danger/20">
            <Icons.TriangleAlert className="w-5 h-5 text-danger shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-danger">Hành động này không thể hoàn tác</p>
              <p className="text-sm text-gray-600 mt-1">Bản ghi <span className="font-medium text-gray-800">"Nguyễn Văn A"</span> và toàn bộ dữ liệu liên quan sẽ bị xóa vĩnh viễn khỏi hệ thống.</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

// --- 3. Modal có form ---
function ModalForm() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="success" size="sm" onPress={() => setOpen(true)}>Thêm người dùng</Button>
      <Modal
        isOpen={open}
        handleClose={() => setOpen(false)}
        onOpenChange={setOpen}
        title="Thêm người dùng mới"
        width={500}
        handleConfirm={() => { alert('Đã lưu!'); setOpen(false); }}
      >
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Họ</label>
              <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Nguyễn" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Tên</label>
              <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Văn A" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="example@email.com" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Vai trò</label>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
              <option value="">Chọn vai trò...</option>
              <option value="admin">Quản trị viên</option>
              <option value="editor">Biên tập viên</option>
              <option value="user">Người dùng</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
}

// --- 4. Modal không tiêu đề, không nút đóng, custom footer ---
function ModalNoFooter() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="warning" size="sm" onPress={() => setOpen(true)}>Không Footer</Button>
      <Modal
        isOpen={open}
        isDismissable
        handleClose={() => setOpen(false)}
        onOpenChange={setOpen}
        title="Chi tiết đơn hàng #DH-20240324"
        footer={null}
        width={480}
      >
        <div className="py-4 space-y-3">
          {[
            { label: 'Sản phẩm', value: 'MacBook Pro M3 14"' },
            { label: 'Số lượng', value: '1' },
            { label: 'Đơn giá', value: '55,990,000 ₫' },
            { label: 'Phương thức', value: 'Chuyển khoản ngân hàng' },
            { label: 'Trạng thái', value: <Tag variant="ghostSuccess">Đã thanh toán</Tag> },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm font-medium text-gray-800">{value}</span>
            </div>
          ))}
          <Button variant="primary" size="sm" className="w-full mt-2" onPress={() => setOpen(false)}>Đóng</Button>
        </div>
      </Modal>
    </>
  );
}

// --- 5. Modal rộng với nội dung cuộn ---
function ModalWide() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" size="sm" onPress={() => setOpen(true)}>Modal rộng + Cuộn</Button>
      <Modal
        isOpen={open}
        isDismissable
        handleClose={() => setOpen(false)}
        onOpenChange={setOpen}
        title="Điều khoản sử dụng dịch vụ"
        width={{ xs: '100%', md: '100%' }}
        height={"100vh"}
        footer={
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Phiên bản 2.1.0 — Cập nhật 24/03/2024</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onPress={() => setOpen(false)}>Từ chối</Button>
              <Button variant="primary" size="sm" onPress={() => setOpen(false)}>Đồng ý &amp; Tiếp tục</Button>
            </div>
          </div>
        }
      >
        <div className="py-4 space-y-4 text-sm text-gray-600 leading-relaxed">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <p className="font-semibold text-gray-800 mb-1">Điều {i + 1}. {['Chấp nhận điều khoản', 'Quyền và nghĩa vụ', 'Bảo mật thông tin', 'Giới hạn trách nhiệm', 'Chấm dứt dịch vụ', 'Quy định chung'][i]}</p>
              <p>Bằng cách sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản và điều kiện dưới đây. Chúng tôi có quyền thay đổi các điều khoản này vào bất kỳ lúc nào mà không cần thông báo trước.</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

// --- Export tổng hợp tất cả ví dụ ---
export function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <ModalSimple />
      <ModalConfirmDelete />
      <ModalForm />
      <ModalNoFooter />
      <ModalWide />
    </div>
  );
}
