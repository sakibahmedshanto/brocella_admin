"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/customUi/ImageUpload";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import Delete from "@/components/customUi/Delete";
import MultiText from "../customUi/MultiText";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500),
  media: z.array(z.string()),
  category: z.string().min(2).max(20),
  collection: z.array(z.string()),
  tags:z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(10),
  expense: z.coerce.number().min(10),
});

interface ProductFormProps {
  initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
        title: "",
        description: "",
        media: [],
        category:"",
        collection: [],
        tags:[],
        sizes: [],
        colors: [],
        price: 0.1,
        expense: 0,
        },
  });

  const handlekeyPress= (e:React.KeyboardEvent<HTMLInputElement> |React.KeyboardEvent<HTMLTextAreaElement> ) => {

    if (e.key === "Enter") {
      e.preventDefault();}
    
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(
          `Product ${initialData ? "updated" : "created"} successfully`
        );
        window.location.href="/products";
        router.push("/products");
      } else {
        throw new Error("Failed to save Products");
      }
    } catch (error) {
      console.log("Products_Post_Error", error);
      toast.error("Failed to create Product");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      console.warn("No ProductId found in params for edit mode.");
    }
  }, [initialData]);

  return (
    <div className="p-10">
      {initialData ? (
        <div>
          <p className="text-heading2-bold text-center">Edit Collection</p>
          <Delete collectionId={initialData._id} />
        </div>
      ) : (
        <div>
          <p className="text-heading2-bold text-center">Create Collection</p>
        </div>
      )}
      <Separator className="my-4 bg-grey-1" />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} onKeyDown={handlekeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea onKeyDown={handlekeyPress}  placeholder="Description" rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}

                    onChange={(url) => field.onChange([...field.value,url])}

                    onRemove={(url) => field.onChange([...field.value.filter((image)=>image!==url)])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (tk)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} onKeyDown={handlekeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="expense"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense (tk)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Expense" {...field} onKeyDown={handlekeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} onKeyDown={handlekeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          {/* end of the first rows */}

          <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (tk)</FormLabel>
                <FormControl>
                  <MultiText placeholder="tags" value={field.value} onChange={(tag)=>field.onChange([...field.value,tag])} 
                  onRemove={(tag)=>field.onChange([...field.value.filter((filter_tag)=>tag!==filter_tag)])}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="expense"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense (tk)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Expense" {...field} onKeyDown={handlekeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} onKeyDown={handlekeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className="flex gap-10">
            <Button
              type="submit"
              className="bg-blue-1 text-white rounded"
              disabled={loading}
            >
              Submit
            </Button>
            <Button
              type="button"
              className="bg-red-500 text-white rounded"
              onClick={() => router.push("/collections")}
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
