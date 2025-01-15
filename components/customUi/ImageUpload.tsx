import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { CircleX, Plus } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onSuccess = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        {value.map((url) => (
          <div key={url} className="relative">
            <Image
              width={300}
              height={300}
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => onRemove(url)}
            >
             <CircleX />
            </button>
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="brocella" onSuccess={onSuccess}>
        {({ open }) => {
          return (
            <Button
              className="bg-grey-1 text-white-1 rounded hover:bg-blue-1"
              onClick={() => open()}
            >
              <Plus className="h-4 w-4 color" /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;