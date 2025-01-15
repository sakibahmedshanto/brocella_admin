"use client";
import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface DeleteProps {
  collectionId: string;
}


const Delete:React.FC<DeleteProps> = ({collectionId}) => {

  const [loading, setLoading] = React.useState(false);
  
  
  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/collections/${collectionId}`,
        {
          method: "DELETE",
        }
      );
     if(res.ok){
        setLoading(false);
      window.location.href = "/collections";
       toast.success("Collection deleted successfully");
     }

    } catch (error) {
      console.log("[Delete]: ", error);
      toast.error("An error occured");
    }
  }



  return (
    <AlertDialog>
      <AlertDialogTrigger >
        {/* the alert button trigger is here */}
        <Button className="bg-red-1 text-white rounded">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1 rounded">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Collection and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
