import React, { useState } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { SandpackCodeEditor, SandpackPreview, SandpackConsole } from '@codesandbox/sandpack-react';
import { FileExplorer } from './FileExplorer';
import { TopBar } from './TopBar';
import { ActivityBar } from './ActivityBar';

export function IdeLayout() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'search' | 'git'>('explorer');

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#151515] text-[#999999] font-sans">
      <TopBar />
      
      <div className="flex flex-1 min-h-0">
        <ActivityBar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <Group orientation="horizontal" className="h-full">
          {/* Cột trái: Explorer / Sidebar */}
          <Panel defaultSize={15} minSize={10} className="flex flex-col border-r border-[#242424] bg-[#151515]">
            {activeTab === 'explorer' && <FileExplorer />}
            {activeTab === 'search' && <div className="p-4">Search...</div>}
            {activeTab === 'git' && <div className="p-4">Source Control...</div>}
          </Panel>
          
          <ResizeHandle />

          {/* Cột phải: Main Editor Space */}
          <Panel defaultSize={85}>
            <Group orientation="horizontal">
              {/* Editor + Terminal */}
              <Panel defaultSize={60} className="flex flex-col min-w-0 border-r border-[#242424]">
                <Group orientation="vertical">
                  {/* Editor */}
                  <Panel defaultSize={70} className="min-h-0 bg-[#1e1e1e]">
                    <SandpackCodeEditor 
                      showTabs 
                      showLineNumbers 
                      showInlineErrors 
                      wrapContent 
                      style={{ height: '100%' }} 
                    />
                  </Panel>
                  <ResizeHandle horizontal />
                  {/* Terminal/Console */}
                  <Panel defaultSize={30} minSize={10} className="flex flex-col bg-[#1e1e1e]">
                    <div className="h-9 shrink-0 bg-[#151515] border-b border-t border-[#242424] flex items-center px-4 gap-4 text-[11px] font-semibold text-[#cccccc] tracking-wider">
                      <span className="hover:text-white cursor-pointer transition-colors text-blue-500 border-b border-blue-500 pb-2 translate-y-1">TERMINAL</span>
                      <span className="hover:text-white cursor-pointer transition-colors">OUTPUT</span>
                      <span className="hover:text-white cursor-pointer transition-colors">PROBLEMS</span>
                    </div>
                    <div className="flex-1 overflow-auto bg-[#151515]">
                      <SandpackConsole standalone style={{ height: '100%', background: 'transparent' }} />
                    </div>
                  </Panel>
                </Group>
              </Panel>

              <ResizeHandle />

              {/* Preview */}
              <Panel defaultSize={40} className="min-w-0 bg-[#ffffff]">
                <SandpackPreview 
                  showNavigator 
                  showRefreshButton 
                  showOpenInCodeSandbox={false} 
                  style={{ height: '100%' }} 
                />
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>

      {/* Status Bar */}
      <div className="h-[22px] bg-[#007acc] text-white flex items-center px-3 text-[10px] shrink-0 font-medium">
        <span className="mr-4 hover:bg-white/20 px-1 cursor-pointer transition-colors rounded">master*</span>
        <span className="mr-4 hover:bg-white/20 px-1 cursor-pointer transition-colors rounded">React Preview</span>
        <div className="flex-1" />
        <span className="hover:bg-white/20 px-1 cursor-pointer transition-colors rounded">LF</span>
        <span className="hover:bg-white/20 px-1 ml-2 cursor-pointer transition-colors rounded">UTF-8</span>
      </div>
    </div>
  );
}

function ResizeHandle({ horizontal }: { horizontal?: boolean }) {
  return (
    <Separator className={`${horizontal ? 'h-1 hover:bg-[#007acc] hover:cursor-row-resize' : 'w-1 hover:bg-[#007acc] hover:cursor-col-resize'} bg-[#242424] transition-colors`} />
  );
}
