"use client";

import { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useListings } from '@/hooks/use-listings';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const emptyProduct: Omit<Product, 'id' | 'supplierName' | 'supplierId' | 'supplierRating'> = {
  name: '',
  price: 0,
  unit: 'kg',
  inStock: true,
  stock: 0,
  imageUrl: 'https://placehold.co/400x250.png',
  aiHint: 'new product'
};

export default function ListingsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useListings();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const openAddDialog = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    deleteProduct(productId);
    toast({ title: 'Listing Deleted', description: 'The product listing has been removed.' });
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Listings</CardTitle>
              <CardDescription>Manage your raw material listings.</CardDescription>
            </div>
            <Button asChild size="sm" className="gap-1" onClick={openAddDialog}>
              <div>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Listing</span>
              </div>
            </Button>
          </div>
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
                      data-ai-hint={product.aiHint}
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
                  <TableCell>₹{product.price.toFixed(2)} / {product.unit}</TableCell>
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
                        <DropdownMenuItem onClick={() => openEditDialog(product)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(product.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ListingFormDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        product={editingProduct}
        onSave={(productData) => {
          if (editingProduct) {
            updateProduct(editingProduct.id, productData);
            toast({ title: 'Listing Updated', description: 'The product listing has been updated.' });
          } else {
            addProduct(productData);
            toast({ title: 'Listing Added', description: 'A new product has been added to your listings.' });
          }
        }}
      />
    </>
  );
}


function ListingFormDialog({ isOpen, setIsOpen, product, onSave }: { isOpen: boolean, setIsOpen: (open: boolean) => void, product: Product | null, onSave: (product: Omit<Product, 'id' | 'supplierName' | 'supplierId' | 'supplierRating'>) => void }) {
  const [formData, setFormData] = useState(product || emptyProduct);

  React.useEffect(() => {
    setFormData(product ? { ...product } : { ...emptyProduct });
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData(prev => ({ ...prev, [id]: isNumber ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Listing' : 'Add New Listing'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price (₹)</Label>
            <Input id="price" type="number" value={formData.price} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">Stock</Label>
            <Input id="stock" type="number" value={formData.stock} onChange={handleChange} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="unit" className="text-right">Unit</Label>
            <Input id="unit" value={formData.unit} onChange={handleChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
