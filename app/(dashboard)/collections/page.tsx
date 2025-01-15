"use client";

import { DataTable } from '@/components/customUi/DataTable';
import { columns } from '@/components/layout/collections/CollectionForm.tsx/CollectionColumns';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, Route } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

const collections = () => {
  const router=useRouter();
  const [loading,setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections",
      {
        method: "GET",
      }
      );
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("[Collections_GET]: ", error);
    }
  }
  useEffect(() => {
    getCollections();
  }, []);


  // console.log(collections);
  return (
    <div className='px-10 py-5'>
    <div className='flex items-center justify-between'>
      <p className='text-heading2-bold mx-4'> Collection</p>
      <Button className='bg-blue-1 text-white' onClick={()=>router.push("/collections/new")}>
        <Plus className='h-4 w-4 mr-2' />
        Create Collection</Button>
    </div>
    <Separator className='my-6 bg-grey-1'/>
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  )
}

export default collections