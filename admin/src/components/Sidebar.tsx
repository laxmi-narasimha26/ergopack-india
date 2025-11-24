import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FileText,
  Layers,
  Forms,
  MessageSquare,
  Search,
  Settings,
  Users,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: '/dashboard',
  },
  {
    label: 'Products',
    icon: <Package className="w-5 h-5" />,
    path: '/products',
  },
  {
    label: 'Blog',
    icon: <FileText className="w-5 h-5" />,
    path: '/blog',
  },
  {
    label: 'Pages',
    icon: <Layers className="w-5 h-5" />,
    path: '/pages',
  },
  {
    label: 'Forms',
    icon: <Forms className="w-5 h-5" />,
    path: '/forms',
  },
  {
    label: 'Leads',
    icon: <MessageSquare className="w-5 h-5" />,
    path: '/leads',
  },
  {
    label: 'SEO',
    icon: <Search className="w-5 h-5" />,
    path: '/seo',
  },
  {
    label: 'Users',
    icon: <Users className="w-5 h-5" />,
    path: '/users',
  },
  {
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    path: '/settings',
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname.startsWith(path);
  };

  const renderMenuItem = (item: MenuItem, isNested = false) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const active = isActive(item.path);

    return (
      <div key={item.label}>
        {item.path ? (
          <Link
            to={item.path}
            className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            } ${isNested ? 'pl-8' : ''}`}
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
          </Link>
        ) : (
          <button
            onClick={() => toggleSubmenu(item.label)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              expandedItems.includes(item.label)
                ? 'bg-gray-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            } ${isNested ? 'pl-8' : ''}`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
            {hasSubmenu && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedItems.includes(item.label) ? 'rotate-180' : ''
                }`}
              />
            )}
          </button>
        )}

        {hasSubmenu && expandedItems.includes(item.label) && (
          <div className="mt-2 space-y-1">
            {item.submenu?.map((subitem) => renderMenuItem(subitem, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-50 lg:z-0 lg:translate-x-0 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">ErgoAdmin</h1>
            <p className="text-xs text-gray-500">CMS Admin Panel</p>
          </div>
        </div>

        {/* Menu items */}
        <nav className="p-4 space-y-2">{menuItems.map((item) => renderMenuItem(item))}</nav>
      </aside>
    </>
  );
};
