import { cn } from "@lib/utils/cn";
import {
    Disclosure as AriaDisclosure,
    DisclosureGroup,
    DisclosurePanel,
    Button,
    Heading,
    type DisclosureGroupProps
} from "react-aria-components";

// Định nghĩa kiểu dữ liệu cho từng mục trong Accordion
export interface AccordionItemProps {
    id: string;
    title: string;
    content: React.ReactNode;
}

// Mở rộng props của DisclosureGroup để hỗ trợ đầy đủ các tính năng của React Aria
interface AccordionProps extends DisclosureGroupProps {
    items: AccordionItemProps[];
    className?: string;
}

export function Disclosure({ items, className, ...props }: AccordionProps) {
    return (
        <DisclosureGroup
            {...props}
            // Khung chứa toàn bộ Accordion: Viền bo tròn, đổ bóng nhẹ
            className={cn(
                "w-full border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden",
                className
            )}
        >
            {items.map((item) => (
                <AriaDisclosure 
                    key={item.id} 
                    id={item.id} 
                    className="group border-b border-gray-200 last:border-b-0"
                >
                    {/* Thẻ Heading giúp đảm bảo chuẩn Accessibility (A11y) cho trình đọc màn hình */}
                    <Heading className="flex" level={3}>
                        <Button
                            slot="trigger"
                            className="flex flex-1 items-center justify-between py-4 px-5 text-sm font-medium text-gray-900 transition-colors outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-blue-500 cursor-pointer hover:text-blue-600 hover:bg-blue-50 group-data-[expanded]:bg-blue-100"
                        >
                            {item.title}
                            
                            {/* Vòng tròn bọc icon: Đổi màu xanh khi mở */}
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 group-data-[expanded]:bg-blue-50 transition-colors shrink-0 ml-4">
                                {/* Icon mũi tên: Tự động xoay 180 độ khi mở */}
                                <svg
                                    className="w-4 h-4 text-gray-500 transition-transform duration-300 group-data-[expanded]:rotate-180 group-data-[expanded]:text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </Button>
                    </Heading>

                    {/* Nội dung bên trong: Chỉ hiển thị khi trạng thái là expanded */}
                    <DisclosurePanel className="px-5 text-sm text-gray-600 leading-relaxed overflow-hidden origin-top entering:animate-in entering:fade-in entering:slide-in-from-top-2 exiting:animate-out exiting:fade-out exiting:slide-out-to-top-2 duration-300 ease-out fill-mode-forwards">
                      <span className="px-5 py-4">  {item.content}</span>
                    </DisclosurePanel>
                </AriaDisclosure>
            ))}
        </DisclosureGroup>
    );
}