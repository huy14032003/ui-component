import React from 'react'
import { PageHeader, ShowcaseCard } from '@/Test'
import { Tabs } from '@components/ui/tabs/Tabs'
import { Badge } from '@components/ui/badge/Badge'
import { Progress } from '@components/ui/progress/Progress'

const TabsPage = () => (
    <div className="max-w-3xl">
        <PageHeader title="Tabs" description="Chia nội dung theo nhóm, chuyển tab mượt mà." />

        <ShowcaseCard title="Basic Tabs">
            <Tabs defaultValue="account" items={[
                { label: 'Tài khoản', value: 'account', content: <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Cài đặt hồ sơ cá nhân, ảnh đại diện và tên hiển thị.</div> },
                { label: 'Bảo mật', value: 'security', content: <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Đổi mật khẩu, bật xác thực 2 bước (2FA).</div> },
                { label: 'Thông báo', value: 'notif', content: <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Tùy chỉnh cách nhận thông báo qua Email, SMS, Push.</div> },
                { label: 'Thanh toán', value: 'billing', content: <div className="p-4 bg-muted/50 rounded-md text-sm text-muted-foreground">Quản lý phương thức thanh toán và hóa đơn.</div> },
            ]} />
        </ShowcaseCard>

        <ShowcaseCard title="With Rich Content">
            <Tabs defaultValue="list" items={[
                {
                    label: 'Danh sách GD', value: 'list',
                    content: (
                        <div className="space-y-2 pt-2">
                            {['Giao dịch #1001 — 500.000đ', 'Giao dịch #1002 — 1.200.000đ', 'Giao dịch #1003 — 45.000đ'].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                                    <span className="text-sm">{item}</span>
                                    <Badge variant={i === 0 ? 'success' : i === 1 ? 'warning' : 'soft-primary'} size="sm">
                                        {i === 0 ? 'Thành công' : i === 1 ? 'Đang xử lý' : 'Chờ duyệt'}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    ),
                },
                {
                    label: 'Báo cáo', value: 'report',
                    content: (
                        <div className="space-y-4 pt-2">
                            <Progress value={85} variant="success" labelPosition="outside" label="Thành công" />
                            <Progress value={10} variant="warning" labelPosition="outside" label="Đang xử lý" />
                            <Progress value={5} variant="danger" labelPosition="outside" label="Thất bại" />
                        </div>
                    ),
                },
            ]} />
        </ShowcaseCard>
    </div>
);

export default TabsPage;
