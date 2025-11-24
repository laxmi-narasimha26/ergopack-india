'use client';

import { useEffect, useState, useRef } from 'react';
import { Upload, Trash2, Copy, Check, Filter } from 'lucide-react';
import { Media, PaginatedResponse } from '@/types';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, [page, typeFilter]);

  const fetchMedia = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '24',
      });

      if (typeFilter && typeFilter !== 'all') {
        params.append('type', typeFilter);
      }

      const response = await fetch(`/api/media?${params}`);
      const data: PaginatedResponse<Media> = await response.json();

      if (data.success) {
        setMedia(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to load media');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'general');

      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('File uploaded successfully');
        fetchMedia();
      } else {
        toast.error(data.error || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (id: string, filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/media?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('File deleted successfully');
        fetchMedia();
      } else {
        toast.error(data.error || 'Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success('URL copied to clipboard');
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getFileIcon = (type: Media['type']) => {
    switch (type) {
      case 'image':
        return '🖼️';
      case 'video':
        return '🎥';
      case '3d-model':
        return '🎨';
      case 'document':
        return '📄';
      default:
        return '📎';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Media Library</h1>
          <p className="text-neutral-400">Upload and manage media files</p>
        </div>
        <Button variant="primary" onClick={handleFileSelect} disabled={isUploading}>
          <Upload size={20} className="mr-2" />
          {isUploading ? 'Uploading...' : 'Upload File'}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,video/*,.pdf,.glb,.gltf"
        />
      </div>

      {/* Filter */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <Filter className="text-neutral-500" size={20} />
          <Select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="3d-model">3D Models</option>
            <option value="document">Documents</option>
          </Select>
        </div>
      </div>

      {/* Media Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <div
              key={item._id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden
                hover:border-neutral-700 transition-all duration-300 group"
            >
              {/* Preview */}
              <div className="aspect-square bg-neutral-800 flex items-center justify-center overflow-hidden">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.alt || item.originalName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl">{getFileIcon(item.type)}</div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-white truncate mb-1">
                  {item.originalName}
                </h3>
                <p className="text-xs text-neutral-400 mb-3">
                  {(item.size / 1024).toFixed(0)} KB • {item.type}
                </p>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopyUrl(item.url)}
                    className="flex-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700
                      text-white text-xs rounded-lg transition-colors flex items-center justify-center"
                  >
                    {copiedUrl === item.url ? (
                      <>
                        <Check size={14} className="mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="mr-1" />
                        Copy URL
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.originalName)}
                    className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500
                      text-xs rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {media.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-neutral-500">No media files found</p>
          <Button variant="secondary" onClick={handleFileSelect} className="mt-4">
            Upload your first file
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-lg
              hover:border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          >
            Previous
          </button>
          <span className="text-neutral-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-lg
              hover:border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
