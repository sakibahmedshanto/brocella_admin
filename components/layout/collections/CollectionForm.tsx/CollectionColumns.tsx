"use clinet";


import Delete from "@/components/customUi/Delete";
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";

export const columns: ColumnDef<CollectionType>[]=[
   {

    accessorKey: "title",
    header: "Title",
    cell: ({row})=>{
        return <Link href={`/collections/${row.original._id}`} className="hover:text-red-1">{row.original.title}</Link>
    },
    
   },
  
    {
     accessorKey: "products",
     header: "Products",
     cell: ({row})=>{
         return <p>{row.original.products.length}</p>
     }
    },
    // {
    //  accessorKey: "image",
    //  header: "Image",
    // },
    {
        id: "actions",
        cell:({row})=>{
            return (
              <Delete collectionId={row.original._id} />
            )
        }
    }
] 