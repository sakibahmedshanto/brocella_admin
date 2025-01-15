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

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500),
  image: z.string(),
});

interface CollectionFormProps {
  initialData?: CollectionType | null;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
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
        ? `/api/collections/${initialData._id}`
        : "/api/collections";
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
          `Collection ${initialData ? "updated" : "created"} successfully`
        );
        router.push("/collections");
      } else {
        throw new Error("Failed to save collection");
      }
    } catch (error) {
      console.log("Collection_Post_Error", error);
      toast.error("Failed to create collection");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!params.collectionId && initialData) {
      console.warn("No collectionId found in params for edit mode.");
    }
  }, [params, initialData]);

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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={(url) => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default CollectionForm;
