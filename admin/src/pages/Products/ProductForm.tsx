import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ArrowLeft, Plus, X } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Product, CreateProductRequest, ProductSpec } from '../../types';

interface ProductFormData extends CreateProductRequest {
  specsEntries: Array<{ key: string; value: string }>;
}

export const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [featureInput, setFeatureInput] = useState('');

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: undefined,
      features: [],
      gallery_ids: [],
      status: 'draft',
      specsEntries: [],
    },
  });

  const features = watch('features') || [];
  const specsEntries = watch('specsEntries') || [];

  useEffect(() => {
    if (id && id !== 'new') {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get<Product>(`/products/${id}`);
      const product = response.data;
      setIsEdit(true);

      setValue('name', product.name);
      setValue('slug', product.slug);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('features', product.features || []);
      setValue('gallery_ids', product.gallery_ids || []);
      setValue('status', product.status);

      // Convert specs to array format
      if (product.specs) {
        const specsArray = Object.entries(product.specs).map(([key, value]) => ({
          key,
          value: String(value),
        }));
        setValue('specsEntries', specsArray);
      }
    } catch (error) {
      console.error('Failed to load product:', error);
      toast.error('Failed to load product');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);

      // Convert specsEntries to specs object
      const specs: ProductSpec = {};
      data.specsEntries.forEach((entry) => {
        if (entry.key && entry.value) {
          specs[entry.key] = entry.value;
        }
      });

      const payload: CreateProductRequest = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        features: data.features,
        gallery_ids: data.gallery_ids,
        status: data.status,
        specs: Object.keys(specs).length > 0 ? specs : undefined,
      };

      if (isEdit) {
        await api.put(`/products/${id}`, payload);
        toast.success('Product updated successfully');
      } else {
        await api.post('/products', payload);
        toast.success('Product created successfully');
      }

      navigate('/products');
    } catch (error: any) {
      console.error('Failed to save product:', error);
      toast.error(error?.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setValue('features', [...features, featureInput]);
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setValue(
      'features',
      features.filter((_, i) => i !== index)
    );
  };

  const addSpec = () => {
    setValue('specsEntries', [...specsEntries, { key: '', value: '' }]);
  };

  const removeSpec = (index: number) => {
    setValue(
      'specsEntries',
      specsEntries.filter((_, i) => i !== index)
    );
  };

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...specsEntries];
    updated[index] = { ...updated[index], [field]: value };
    setValue('specsEntries', updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/products')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit Product' : 'Create Product'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEdit
              ? 'Update product details and specifications'
              : 'Add a new product to your catalog'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  {...register('name', { required: 'Product name is required' })}
                  type="text"
                  placeholder="e.g., Ergonomic Office Chair"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                <input
                  {...register('slug', { required: 'Slug is required' })}
                  type="text"
                  placeholder="e.g., ergonomic-office-chair"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.slug ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  {...register('description')}
                  placeholder="Product description..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    {...register('price', {
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    {...register('status')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Features</h2>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                  placeholder="Add a feature..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {features.length > 0 && (
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <span className="text-gray-700">{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Specifications (JSONB)</h2>

              {specsEntries.length > 0 && (
                <div className="space-y-3">
                  {specsEntries.map((spec, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <input
                        type="text"
                        value={spec.key}
                        onChange={(e) => updateSpec(index, 'key', e.target.value)}
                        placeholder="Key (e.g., material)"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => updateSpec(index, 'value', e.target.value)}
                        placeholder="Value"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpec(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={addSpec}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-full justify-center"
              >
                <Plus className="w-4 h-4" />
                Add Specification
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submit Button */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4 sticky top-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
              >
                {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/products')}
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>

            {/* Help text */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">Tips:</p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Use descriptive product names</li>
                <li>• Slug should be URL-friendly (lowercase, hyphens)</li>
                <li>• Add key features for better visibility</li>
                <li>• Store specs in JSON format</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
