"use client";
import Loader from "@/components/customUi/Loader";
import CollectionForm from "@/components/layout/collections/CollectionForm.tsx/CollectionForm";
import React, { useEffect, useState } from "react";

interface Props {
  params: {
    collectionId: string;
  };
}

const CollectionDetails = ({ params }: Props) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollection] = useState<CollectionType | null>(null);
  const [collectionId, setCollectionId] = useState<string | null>(null);

  const getCollectionDetails = async (id: string) => {
    try {
      const res = await fetch(`/api/collections/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      setCollection(data);
      setLoading(false);
    } catch (error) {
      console.log("[CollectionDetails_GET]: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setCollectionId(unwrappedParams.collectionId);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (collectionId) {
      getCollectionDetails(collectionId);
    }
  }, [collectionId]);

  return loading ? <Loader /> : <CollectionForm initialData={collectionDetails} />;
};

export default CollectionDetails;