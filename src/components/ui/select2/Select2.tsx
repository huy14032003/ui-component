// import {
//   Select,
//   Label,
//   Button,
//   SelectValue,
//   Popover,
//   ListBox,
//   Item
// } from 'react-aria-components';

// interface Select2Props {
//   label: string;
//   items: any[];
//   placeholder?: string;
// }
// // Khung Component Select để bạn có thể tái sử dụng
// export function Select2({ label, items, placeholder = "Chọn một mục..." }: Select2Props) {
//   return (
//    <>
//    <Select className="flex flex-col gap-1 w-[200px]">
      
//       {/* 2. Label: Tự động link aria-labelledby xuống Button, hỗ trợ screen reader cực tốt */}
//       <Label className="text-sm font-medium text-gray-700">{label}</Label>
      
//       {/* 3. Trigger Button: Nút bấm để mở dropdown */}
//       <Button className="flex items-center justify-between px-3 py-2 border rounded-md bg-white hover:bg-gray-50">
//         <SelectValue className="truncate">
//           {/* Nếu chưa chọn gì, hiển thị placeholder. Nếu đã chọn, RAC tự động render giá trị */}
//           {({ defaultChildren, isPlaceholder }) => 
//             isPlaceholder ? <span className="text-gray-400">{placeholder}</span> : defaultChildren
//           }
//         </SelectValue>
//         <span aria-hidden="true" className="ml-2 text-gray-500">▼</span> {/* Icon mũi tên */}
//       </Button>

//       {/* 4. Popover: Lớp phủ nổi (Floating layer). RAC tự lo việc tính toán vị trí, click-outside, scroll lock */}
//       <Popover className="min-w-[var(--trigger-width)] bg-white border rounded-md shadow-lg p-1">
        
//         {/* 5. ListBox: Vùng chứa danh sách, tự động xử lý điều hướng bằng phím mũi tên (Up/Down) */}
//         <ListBox items={items} className="outline-none">
          
//           {/* 6. Item: Từng lựa chọn. Xử lý trạng thái hover, focus, selected */}
//           {(item) => (
//             <Item 
//               id={item.id} 
//               className={({ isFocused, isSelected }) => `
//                 px-3 py-2 rounded-sm cursor-default outline-none
//                 ${isFocused ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}
//                 ${isSelected ? 'font-bold' : ''}
//               `}
//             >
//               {item.name}
//             </Item>
//           )}
//         </ListBox>
//       </Popover>
//     </Select>
//    </>
//   );
// }