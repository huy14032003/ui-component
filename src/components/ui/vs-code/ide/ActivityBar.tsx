import React from 'react';
import { Files, Search, GitBranch, MonitorPlay, Settings, User } from 'lucide-react';

interface ActivityBarProps {
  activeTab: 'explorer' | 'search' | 'git';
  setActiveTab: (tab: 'explorer' | 'search' | 'git') => void;
}

export function ActivityBar({ activeTab, setActiveTab }: ActivityBarProps) {
  return (
    <div className="w-[48px] bg-[#151515] border-r border-[#242424] flex flex-col items-center py-3 shrink-0">
      <button className="w-full h-12 flex items-center justify-center hover:text-white transition-colors">
        <svg viewBox="0 0 100 100" className="w-7 h-7" fill="currentColor">
          <path d="M50 0L0 25v50l50 25 50-25V25L50 0zm38.1 29.8L50 48.7 11.9 29.8 50 10.7l38.1 19.1zM50 82.7L18.4 66.9v-28L50 54.8l31.6-15.9v28L50 82.7z"/>
        </svg>
      </button>

      <div className="w-full h-[1px] bg-[#242424] my-2" />

      <ActivityIcon 
        icon={<Files className="w-[22px] h-[22px]" />} 
        active={activeTab === 'explorer'} 
        onClick={() => setActiveTab('explorer')}
      />
      <ActivityIcon 
        icon={<Search className="w-[22px] h-[22px]" />} 
        active={activeTab === 'search'} 
        onClick={() => setActiveTab('search')}
      />
      <ActivityIcon 
        icon={<GitBranch className="w-[22px] h-[22px]" />} 
        active={activeTab === 'git'} 
        onClick={() => setActiveTab('git')}
      />
      
      <div className="flex-1" />

      <ActivityIcon icon={<User className="w-[22px] h-[22px]" />} />
      <ActivityIcon icon={<Settings className="w-[22px] h-[22px]" />} />
    </div>
  );
}

function ActivityIcon({ icon, active, onClick }: { icon: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full h-[48px] flex items-center justify-center transition-colors ${active ? 'text-white' : 'text-[#666666] hover:text-[#cccccc]'}`}
    >
      {active && (
        <span className="absolute left-0 top-[10%] bottom-[10%] w-[2px] bg-blue-500 rounded-r-md" />
      )}
      {icon}
    </button>
  );
}
