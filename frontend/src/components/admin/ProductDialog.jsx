"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, X, Upload } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

export function ProductDialog({ open, onOpenChange, productToEdit, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    categoryId: "",
    thumbnail: "",
    tags: "",
    featured: false
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories");
      }
    };
    if (open) fetchCategories();
  }, [open]);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.variants[0]?.price || "",
        originalPrice: productToEdit.variants[0]?.originalPrice || "",
        categoryId: productToEdit.categoryId,
        thumbnail: productToEdit.thumbnail,
        tags: productToEdit.tags.join(", "),
        featured: productToEdit.featured
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        categoryId: "",
        thumbnail: "",
        tags: "",
        featured: false
      });
    }
  }, [productToEdit, open]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const toastId = toast.loading("Uploading image...");
    try {
        const { data } = await api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        setFormData(prev => ({ ...prev, thumbnail: data.url }));
        toast.success("Image uploaded", { id: toastId });
    } catch (error) {
        toast.error("Upload failed", { id: toastId });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Construct payload
      const payload = {
        ...formData,
        slug: formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        tags: formData.tags.split(',').map(t => t.trim()),
        variants: [{
            softwareId: 'photoshop', // Default for basic add
            colorVariantId: 'cmyk',
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice),
            fileSize: 'N/A',
            downloadUrl: '#'
        }]
      };

      if (productToEdit) {
        await api.put(`/products/${productToEdit._id}`, payload);
        toast.success("Product updated successfully");
      } else {
        await api.post('/products', payload);
        toast.success("Product created successfully");
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{productToEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <Select value={formData.categoryId} onValueChange={(val) => setFormData(prev => ({ ...prev, categoryId: val }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input id="price" type="number" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price (₹)</Label>
              <Input id="originalPrice" type="number" value={formData.originalPrice} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Thumbnail Image</Label>
            <div className="flex items-center gap-4">
                {formData.thumbnail && (
                    <img src={formData.thumbnail} alt="Preview" className="w-16 h-16 rounded-lg object-cover border" />
                )}
                <div className="relative">
                    <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    <Label htmlFor="image-upload" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-md text-sm font-medium transition-colors">
                        <Upload className="w-4 h-4" /> Upload Image
                    </Label>
                </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" value={formData.tags} onChange={handleChange} placeholder="business, print, design" />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {productToEdit ? "Save Changes" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
