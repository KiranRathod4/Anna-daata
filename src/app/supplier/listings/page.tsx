// ListingsPage.tsx with Edit, Delete, Persistent Storage, and Mount Check
"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  inStock: boolean;
  imageUrl: string;
  aiHint?: string;
}

export default function ListingsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit: "kg",
    stock: "",
    imageFile: null as File | null,
  });

  useEffect(() => {
    const stored = localStorage.getItem("listingProducts");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("listingProducts", JSON.stringify(products));
    }
  }, [products, mounted]);

  if (!mounted) return null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addOrUpdateProduct = () => {
    if (!formData.name || !formData.price || !formData.stock) return;

    if (editingId) {
      setProducts(products.map((p) =>
        p.id === editingId
          ? {
              ...p,
              name: formData.name,
              price: parseFloat(formData.price),
              unit: formData.unit,
              stock: parseInt(formData.stock),
              inStock: parseInt(formData.stock) > 0,
              imageUrl: imagePreview || p.imageUrl,
            }
          : p
      ));
      setEditingId(null);
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        price: parseFloat(formData.price),
        unit: formData.unit,
        stock: parseInt(formData.stock),
        inStock: parseInt(formData.stock) > 0,
        imageUrl: imagePreview || "/default-image.png",
      };
      setProducts([newProduct, ...products]);
    }

    setFormData({ name: "", price: "", unit: "kg", stock: "", imageFile: null });
    setImagePreview(null);
    setFormVisible(false);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const editProduct = (product: Product) => {
    setEditingId(product.id);
    setFormVisible(true);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      unit: product.unit,
      imageFile: null,
    });
    setImagePreview(product.imageUrl);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Listings</CardTitle>
            <CardDescription>Manage your raw material listings.</CardDescription>
          </div>
          <Button size="sm" className="gap-1" onClick={() => {
            setFormVisible(true);
            setEditingId(null);
            setFormData({ name: "", price: "", stock: "", unit: "kg", imageFile: null });
            setImagePreview(null);
          }}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {editingId ? "Edit Listing" : "Add Listing"}
            </span>
          </Button>
        </div>

        {formVisible && (
          <form className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border rounded p-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="border rounded p-2"
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="Unit (kg)"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="border rounded p-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded p-2"
            />
            <Button type="button" onClick={addOrUpdateProduct} className="col-span-full w-fit">
              {editingId ? "Update" : "Submit"}
            </Button>
            {imagePreview && (
              <Image src={imagePreview} alt="Preview" width={100} height={100} className="rounded" />
            )}
          </form>
        )}
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={product.name}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.imageUrl}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant={product.inStock ? "outline" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </TableCell>
                <TableCell
                 className="font-sans"
                 style={{ fontFamily: "Segoe UI, Roboto, Arial, sans-serif" }}
                 >
                ₹{product.price.toFixed(2)} / {product.unit}

                </TableCell>
                <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => editProduct(product)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteProduct(product.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
