import React, { useState } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';
import { FilePlus, FolderPlus, Trash2, Edit2, File as FileIcon, ChevronDown, ChevronRight } from 'lucide-react';

export function FileExplorer() {
  const { sandpack } = useSandpack();
  const { files, activeFile, openFile, addFile, deleteFile } = sandpack;

  const [isCreating, setIsCreating] = useState<'file' | 'folder' | null>(null);
  const [newName, setNewName] = useState('');

  // Lấy danh sách files và hiển thị phẳng (flat) hoặc nhóm thư mục
  // Để tối ưu và tránh quá dài, hiển thị danh sách các path dạng phẳng
  const filePaths = Object.keys(files);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    
    // Đảm bảo có dấu / phía trước
    const path = newName.startsWith('/') ? newName : `${newName}`;
    
    if (isCreating === 'file') {
      addFile(path, '');
      openFile(path);
    } else {
      // Sandpack tự hiển thị folder dựa vào path của file. 
      // Nhưng vì không có file nào thì folder không tồn tại trong sandpack
      // Ta tạo 1 file .gitkeep ẩn để giữ folder.
      addFile(`${path}/.gitkeep`, '');
    }
    
    setNewName('');
    setIsCreating(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#151515] text-[#cccccc] font-sans">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold tracking-wider text-[#999999] shrink-0 uppercase mb-1 group">
        <span>Explorer</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsCreating('file')} className="p-1 hover:bg-[#2a2d2e] rounded transition-colors" title="New File">
            <FilePlus className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setIsCreating('folder')} className="p-1 hover:bg-[#2a2d2e] rounded transition-colors" title="New Folder">
            <FolderPlus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto w-full outline-none">
        {/* Input box for new file/folder */}
        {isCreating && (
          <div className="px-3 py-1 flex items-center">
            {isCreating === 'file' ? <FileIcon className="w-3.5 h-3.5 mr-1 text-[#5c98ce]" /> : <ChevronRight className="w-3.5 h-3.5 mr-1 text-[#666666]" />}
            <form onSubmit={handleCreate} className="flex-1">
              <input
                autoFocus
                type="text"
                placeholder={isCreating === 'file' ? 'Tên file (vd: /src/App.js)' : 'Tên thư mục (vd: /src/components)'}
                className="w-full bg-[#3c3c3c] border border-[#007acc] text-[#cccccc] text-[13px] px-1 py-0.5 outline-none font-mono"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={() => setIsCreating(null)}
                // Stop propagation để click vào file không làm mất focus bị lỗi
                onMouseDown={(e) => e.stopPropagation()}
              />
            </form>
          </div>
        )}

        {/* Danh sách Files hiện tại */}
        {filePaths.sort().map((path) => {
          // Bỏ qua hiển thị file ẩn như .gitkeep
          if (path.endsWith('.gitkeep')) return null;

          const isActive = path === activeFile;
          const fileName = path.split('/').pop() || path;
          
          return (
            <div
              key={path}
              onClick={() => openFile(path)}
              className={`flex items-center justify-between py-1 px-3 cursor-pointer text-[13px] group ${isActive ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <FileIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#5c98ce]' : 'text-[#666666]'}`} />
                <span className={`truncate ${isActive ? '' : 'text-[#cccccc]'}`}>{fileName}</span>
                <span className="text-[10px] text-[#666666] ml-2 hidden sm:block truncate opacity-50">{path}</span>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteFile(path); }}
                  className="p-0.5 hover:bg-[#4d4d4d] rounded text-[#cccccc] hover:text-red-400 z-10"
                  title="Delete File"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
