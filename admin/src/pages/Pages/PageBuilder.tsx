import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Plus, X, GripVertical, Trash2 } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Page, PageComponent } from '../../types';

interface PageFormData {
  title: string;
  slug: string;
  description?: string;
  status: 'draft' | 'published';
  seo_title?: string;
  seo_description?: string;
}

interface DraggableComponent extends PageComponent {
  _tempId?: string;
}

const componentTypes = [
  { id: 'hero', label: 'Hero Section', icon: '🎬' },
  { id: 'text', label: 'Text Block', icon: '📝' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  { id: 'form', label: 'Form', icon: '📋' },
  { id: 'cta', label: 'Call to Action', icon: '🎯' },
  { id: 'features', label: 'Features', icon: '✨' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬' },
];

export const PageBuilder: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [components, setComponents] = useState<DraggableComponent[]>([]);
  const [nextComponentId, setNextComponentId] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PageFormData>({
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      status: 'draft',
      seo_title: '',
      seo_description: '',
    },
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadPage();
    }
  }, [id]);

  const loadPage = async () => {
    try {
      setLoading(true);
      const response = await api.get<Page>(`/pages/${id}`);
      const page = response.data;
      setIsEdit(true);

      setValue('title', page.title);
      setValue('slug', page.slug);
      setValue('description', page.description);
      setValue('status', page.status);
      setValue('seo_title', page.seo_title);
      setValue('seo_description', page.seo_description);

      setComponents(page.components);
      setNextComponentId(page.components.length + 1);
    } catch (error) {
      console.error('Failed to load page:', error);
      toast.error('Failed to load page');
      navigate('/pages');
    } finally {
      setLoading(false);
    }
  };

  const addComponent = (type: string) => {
    const newComponent: DraggableComponent = {
      id: `comp-${nextComponentId}`,
      type: type as any,
      order: components.length,
      data: {},
      _tempId: `temp-${nextComponentId}`,
    };
    setComponents([...components, newComponent]);
    setNextComponentId(nextComponentId + 1);
  };

  const removeComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const updateComponentData = (index: number, data: Record<string, any>) => {
    const updated = [...components];
    updated[index] = { ...updated[index], data };
    setComponents(updated);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === 'COMPONENT') {
      const items = Array.from(components);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      // Update order
      const updated = items.map((item, idx) => ({
        ...item,
        order: idx,
      }));

      setComponents(updated);
    }
  };

  const onSubmit = async (data: PageFormData) => {
    try {
      setLoading(true);

      const payload = {
        title: data.title,
        slug: data.slug,
        description: data.description,
        status: data.status,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        components: components.map(({ _tempId, ...comp }) => comp),
      };

      if (isEdit) {
        await api.put(`/pages/${id}`, payload);
        toast.success('Page updated successfully');
      } else {
        await api.post('/pages', payload);
        toast.success('Page created successfully');
      }

      navigate('/pages');
    } catch (error: any) {
      console.error('Failed to save page:', error);
      toast.error(error?.response?.data?.message || 'Failed to save page');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/pages')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit Page' : 'Create Page'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEdit ? 'Update your page' : 'Build a new page with drag-and-drop components'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Page Info */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Page Information</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  placeholder="e.g., About Us"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  {...register('slug', { required: 'Slug is required' })}
                  type="text"
                  placeholder="e.g., about-us"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.slug ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  placeholder="Page description..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Title
                  </label>
                  <input
                    {...register('seo_title')}
                    type="text"
                    placeholder="SEO title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    {...register('status')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Description
                </label>
                <textarea
                  {...register('seo_description')}
                  placeholder="Meta description for SEO..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Page Builder */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Page Components</h2>

              {/* Component Library */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Add Components
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {componentTypes.map((comp) => (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => addComponent(comp.id)}
                      className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      <span>{comp.icon}</span>
                      <span className="font-medium text-gray-700">
                        {comp.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Drag and drop area */}
              {components.length > 0 ? (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Drag to reorder components
                  </p>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="components" type="COMPONENT">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={`space-y-2 p-4 rounded-lg border-2 border-dashed ${
                            snapshot.isDraggingOver
                              ? 'border-blue-400 bg-blue-50'
                              : 'border-gray-300 bg-gray-50'
                          }`}
                        >
                          {components.map((comp, index) => {
                            const compType = componentTypes.find(
                              (t) => t.id === comp.type
                            );
                            return (
                              <Draggable
                                key={comp._tempId || comp.id}
                                draggableId={comp._tempId || comp.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`bg-white border rounded-lg p-4 transition-all ${
                                      snapshot.isDragging
                                        ? 'shadow-lg border-blue-500'
                                        : 'border-gray-200'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        {...provided.dragHandleProps}
                                        className="cursor-grab active:cursor-grabbing"
                                      >
                                        <GripVertical className="w-5 h-5 text-gray-400" />
                                      </div>

                                      <div className="flex-1">
                                        <p className="font-medium text-gray-900">
                                          {compType?.label}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          Component #{index + 1}
                                        </p>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => removeComponent(index)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">
                    No components added yet. Add a component to get started.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submit Button */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4 sticky top-6">
              <button
                type="submit"
                disabled={loading || components.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
              >
                {loading
                  ? 'Saving...'
                  : isEdit
                  ? 'Update Page'
                  : 'Create Page'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/pages')}
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>

            {/* Stats */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm font-medium text-blue-900">Component Stats</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {components.length}
              </p>
              <p className="text-xs text-blue-800 mt-1">
                Components added to page
              </p>
            </div>

            {/* Help text */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm font-medium text-green-900 mb-2">Tips:</p>
              <ul className="text-xs text-green-800 space-y-1">
                <li>• Drag components to reorder</li>
                <li>• Click X to remove components</li>
                <li>• Add at least one component</li>
                <li>• Save as draft before publishing</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
