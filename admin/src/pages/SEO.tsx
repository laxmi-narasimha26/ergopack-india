import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { seoService, SEOSettings, Redirect, SitemapConfig } from '../services/seo';

// =============================================================================
// TYPES
// =============================================================================

type TabType = 'settings' | 'redirects' | 'robots' | 'sitemap';

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const SEO: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('settings');

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'settings', label: 'Global Settings', icon: '⚙️' },
    { id: 'redirects', label: 'Redirects', icon: '↪️' },
    { id: 'robots', label: 'Robots.txt', icon: '🤖' },
    { id: 'sitemap', label: 'Sitemap', icon: '🗺️' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SEO Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage SEO configuration, redirects, and sitemap settings
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'settings' && <GlobalSettingsTab />}
        {activeTab === 'redirects' && <RedirectsTab />}
        {activeTab === 'robots' && <RobotsTab />}
        {activeTab === 'sitemap' && <SitemapTab />}
      </div>
    </div>
  );
};

// =============================================================================
// GLOBAL SETTINGS TAB
// =============================================================================

const GlobalSettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<SEOSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await seoService.getSettings();
      setSettings(data);
    } catch (error) {
      toast.error('Failed to load SEO settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    try {
      setSaving(true);
      await seoService.updateSettings(settings);
      toast.success('SEO settings saved successfully');
    } catch (error) {
      toast.error('Failed to save SEO settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof SEOSettings, value: any) => {
    if (settings) {
      setSettings({ ...settings, [field]: value });
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!settings) {
    return <div className="p-6 text-center text-red-500">Failed to load settings</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Meta Tags Section */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Meta Tags</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Global Title (max 60 chars)
            </label>
            <input
              type="text"
              maxLength={60}
              value={settings.globalTitle}
              onChange={(e) => handleChange('globalTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              {settings.globalTitle.length}/60 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Global Description (max 160 chars)
            </label>
            <textarea
              maxLength={160}
              rows={3}
              value={settings.globalDescription}
              onChange={(e) => handleChange('globalDescription', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              {settings.globalDescription.length}/160 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={settings.globalKeywords.join(', ')}
              onChange={(e) =>
                handleChange(
                  'globalKeywords',
                  e.target.value.split(',').map((k) => k.trim())
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default OG Image URL
            </label>
            <input
              type="text"
              value={settings.ogDefaultImage}
              onChange={(e) => handleChange('ogDefaultImage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Handle</label>
            <input
              type="text"
              value={settings.twitterHandle}
              onChange={(e) => handleChange('twitterHandle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="@ergopackindia"
            />
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics & Tracking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Analytics ID
            </label>
            <input
              type="text"
              value={settings.googleAnalyticsId}
              onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="G-XXXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Search Console ID
            </label>
            <input
              type="text"
              value={settings.googleSearchConsoleId}
              onChange={(e) => handleChange('googleSearchConsoleId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* SERP Preview */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Google SERP Preview</h3>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="text-blue-600 text-xl hover:underline cursor-pointer">
            {settings.globalTitle || 'Page Title'}
          </div>
          <div className="text-green-700 text-sm">https://ergopack-india.com</div>
          <div className="text-gray-600 text-sm mt-1">
            {settings.globalDescription || 'Page description will appear here...'}
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

// =============================================================================
// REDIRECTS TAB
// =============================================================================

const RedirectsTab: React.FC = () => {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRedirect, setNewRedirect] = useState({
    sourceUrl: '',
    destinationUrl: '',
    statusCode: 301 as 301 | 302,
  });

  useEffect(() => {
    loadRedirects();
  }, [page, search]);

  const loadRedirects = async () => {
    try {
      setLoading(true);
      const { redirects: data, pagination } = await seoService.getRedirects(page, 20, search);
      setRedirects(data);
      setTotalPages(pagination.pages);
    } catch (error) {
      toast.error('Failed to load redirects');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRedirect = async () => {
    if (!newRedirect.sourceUrl || !newRedirect.destinationUrl) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await seoService.createRedirect(newRedirect);
      toast.success('Redirect created successfully');
      setShowAddModal(false);
      setNewRedirect({ sourceUrl: '', destinationUrl: '', statusCode: 301 });
      loadRedirects();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create redirect');
    }
  };

  const handleDeleteRedirect = async (id: string) => {
    if (!confirm('Are you sure you want to delete this redirect?')) return;

    try {
      await seoService.deleteRedirect(id);
      toast.success('Redirect deleted');
      loadRedirects();
    } catch (error) {
      toast.error('Failed to delete redirect');
    }
  };

  const handleToggleActive = async (redirect: Redirect) => {
    try {
      await seoService.updateRedirect(redirect._id, { isActive: !redirect.isActive });
      toast.success(`Redirect ${redirect.isActive ? 'disabled' : 'enabled'}`);
      loadRedirects();
    } catch (error) {
      toast.error('Failed to update redirect');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search redirects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          + Add Redirect
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2">Source URL</th>
              <th className="text-left py-3 px-2">Destination URL</th>
              <th className="text-center py-3 px-2">Type</th>
              <th className="text-center py-3 px-2">Hits</th>
              <th className="text-center py-3 px-2">Status</th>
              <th className="text-right py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {redirects.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  No redirects found
                </td>
              </tr>
            ) : (
              redirects.map((redirect) => (
                <tr key={redirect._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-mono text-sm">{redirect.sourceUrl}</td>
                  <td className="py-3 px-2 font-mono text-sm">{redirect.destinationUrl}</td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        redirect.statusCode === 301
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {redirect.statusCode}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">{redirect.hitCount}</td>
                  <td className="py-3 px-2 text-center">
                    <button
                      onClick={() => handleToggleActive(redirect)}
                      className={`px-2 py-1 rounded text-xs ${
                        redirect.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {redirect.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => handleDeleteRedirect(redirect._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Redirect</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source URL</label>
                <input
                  type="text"
                  value={newRedirect.sourceUrl}
                  onChange={(e) => setNewRedirect({ ...newRedirect, sourceUrl: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="/old-page"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination URL
                </label>
                <input
                  type="text"
                  value={newRedirect.destinationUrl}
                  onChange={(e) =>
                    setNewRedirect({ ...newRedirect, destinationUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="/new-page"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status Code</label>
                <select
                  value={newRedirect.statusCode}
                  onChange={(e) =>
                    setNewRedirect({
                      ...newRedirect,
                      statusCode: Number(e.target.value) as 301 | 302,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value={301}>301 - Permanent Redirect</option>
                  <option value={302}>302 - Temporary Redirect</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRedirect}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Redirect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// ROBOTS TAB
// =============================================================================

const RobotsTab: React.FC = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadRobots();
  }, []);

  const loadRobots = async () => {
    try {
      setLoading(true);
      const data = await seoService.getRobots();
      setContent(data);
    } catch (error) {
      toast.error('Failed to load robots.txt');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await seoService.updateRobots(content);
      toast.success('robots.txt saved successfully');
    } catch (error) {
      toast.error('Failed to save robots.txt');
    } finally {
      setSaving(false);
    }
  };

  const insertTemplate = (template: string) => {
    setContent(content + '\n' + template);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">robots.txt Editor</h3>
        <p className="text-sm text-gray-500">Configure how search engines crawl your site</p>
      </div>

      {/* Quick Templates */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <button
          onClick={() => insertTemplate('User-agent: *\nAllow: /')}
          className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50"
        >
          Allow All
        </button>
        <button
          onClick={() => insertTemplate('User-agent: *\nDisallow: /admin/')}
          className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50"
        >
          Block Admin
        </button>
        <button
          onClick={() => insertTemplate('User-agent: *\nDisallow: /api/')}
          className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50"
        >
          Block API
        </button>
        <button
          onClick={() => insertTemplate('Sitemap: https://ergopack-india.com/sitemap.xml')}
          className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50"
        >
          Add Sitemap
        </button>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={15}
        className="w-full px-4 py-3 font-mono text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://ergopack-india.com/sitemap.xml"
      />

      {/* Preview */}
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Preview URL:</strong> https://ergopack-india.com/robots.txt
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save robots.txt'}
        </button>
      </div>
    </div>
  );
};

// =============================================================================
// SITEMAP TAB
// =============================================================================

const SitemapTab: React.FC = () => {
  const [config, setConfig] = useState<SitemapConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const data = await seoService.getSitemapConfig();
      setConfig(data);
    } catch (error) {
      toast.error('Failed to load sitemap config');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;
    try {
      setSaving(true);
      await seoService.updateSitemapConfig(config);
      toast.success('Sitemap config saved successfully');
    } catch (error) {
      toast.error('Failed to save sitemap config');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof SitemapConfig, value: any) => {
    if (config) {
      setConfig({ ...config, [field]: value });
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!config) {
    return <div className="p-6 text-center text-red-500">Failed to load config</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Auto-Include Options */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Auto-Include Pages</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.includeProducts}
              onChange={(e) => handleChange('includeProducts', e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <span>Include all product pages</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.includeBlog}
              onChange={(e) => handleChange('includeBlog', e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <span>Include all blog posts</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.includePages}
              onChange={(e) => handleChange('includePages', e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <span>Include all static pages</span>
          </label>
        </div>
      </section>

      {/* Default Settings */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Priority</label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={config.defaultPriority}
              onChange={(e) => handleChange('defaultPriority', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Change Frequency
            </label>
            <select
              value={config.defaultChangeFreq}
              onChange={(e) => handleChange('defaultChangeFreq', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="always">Always</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </section>

      {/* Excluded Paths */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Excluded Paths</h3>
        <textarea
          value={config.excludedPaths.join('\n')}
          onChange={(e) =>
            handleChange(
              'excludedPaths',
              e.target.value.split('\n').filter((p) => p.trim())
            )
          }
          rows={5}
          className="w-full px-3 py-2 border rounded-md font-mono text-sm"
          placeholder="/admin
/api
/private"
        />
        <p className="text-xs text-gray-500 mt-1">One path per line</p>
      </section>

      {/* Sitemap URL */}
      <section>
        <div className="p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Sitemap URL:</strong>{' '}
            <a
              href="https://ergopack-india.com/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              https://ergopack-india.com/sitemap.xml
            </a>
          </p>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
};
