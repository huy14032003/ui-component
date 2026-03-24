import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import Button from '../button/Button';
import Avatar from '../avatar/Avatar';
import * as Icons from '@components/icons';
import { Input } from '../input/Input';

export function ExampleCard() {
  return (
    <div className="space-y-8 p-4">
      {/* 1. Basic Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Elevated Card</CardTitle>
            <CardDescription>Mặc định với shadow sang trọng.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Đây là card được sử dụng phổ biến nhất cho các dashboard.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm" className="w-full">Chi tiết</Button>
          </CardFooter>
        </Card>

        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Bordered Card</CardTitle>
            <CardDescription>Card với viền tối giản.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Thích hợp cho các giao diện cần sự phân tách rõ ràng.
            </p>
          </CardContent>
        </Card>

        <Card variant="flat">
          <CardHeader>
            <CardTitle>Flat Card</CardTitle>
            <CardDescription>Nền xám nhạt, không shadow.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Dùng cho các thông tin phụ hoặc danh sách.
            </p>
          </CardContent>
        </Card>

        <Card isHoverable isPressable>
          <CardHeader>
            <CardTitle>Interactive</CardTitle>
            <CardDescription>Hover & Press effects.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            <Icons.Bell className="w-12 h-12 text-primary animate-bounce" />
          </CardContent>
        </Card>
      </div>

      {/* 2. Complex Examples */}
      <div className=" ">
        {/* User Profile Card */}
        <Card className="flex-row items-center p-4 gap-6">
          <Avatar size="xl" src="https://i.pravatar.cc/150?u=99" alt="User" />
          <div className="flex-1">
            <h4 className="text-lg font-bold">Huy Trần Quang</h4>
            <p className="text-sm text-neutral-500">Senior UI/UX Designer</p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="xs">Profile</Button>
              <Button variant="primary" size="xs">Message</Button>
            </div>
          </div>
        </Card>
      </div>
      <div className=" ">
        {/* Login Form Card */}
        <Card className="w-full max-w-sm mx-auto md:mx-0">
          <CardHeader className="text-center">
            <CardTitle>Đăng nhập</CardTitle>
            <CardDescription>Nhập thông tin tài khoản của bạn.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Email" placeholder="email@example.com" />
            <Input label="Mật khẩu" type="password" placeholder="••••••••" />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button variant="primary" className="w-full">Đăng nhập</Button>
            <p className="text-xs text-center text-neutral-500 mt-2">
              Chưa có tài khoản? <span className="text-primary font-medium cursor-pointer">Đăng ký ngay</span>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* 3. Image Card */}
      <div className="max-w-md mx-auto md:mx-0">
        <Card className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
            alt="Workspace"
            className="w-full h-48 object-cover"
          />
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Lập trình Frontend</CardTitle>
              <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
            </div>
            <CardDescription>Khóa học React & Tailwind CSS.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Học cách xây dựng các giao diện web hiện đại, hiệu năng cao với các công cụ hàng đầu.
            </p>
          </CardContent>
          <CardFooter className="border-t border-neutral-100 dark:border-neutral-800 pt-4 flex justify-between">
            <div className="flex items-center gap-2">
              <Avatar size="sm" />
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Admin</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <span className="text-xs font-bold">4.9</span>
              <Icons.Check className="w-3 h-3" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
