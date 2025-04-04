"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AddMagazineForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");

    setUploading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "your_upload_preset"); // ✅ replace with your Cloudinary preset

    const cloudinaryRes = await fetch(
      "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // ✅ replace with your Cloudinary URL
      {
        method: "POST",
        body: formData,
      }
    );

    const { secure_url } = await cloudinaryRes.json();

    const res = await fetch(
      "https://serverflash.onrender.com/api/magazines/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, imageUrl: secure_url, link }),
      }
    );

    if (res.ok) {
      setName("");
      setDescription("");
      setLink("");
      setImage(null);
      onSuccess();
    } else {
      console.error("Failed to add magazine");
    }

    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Magazine Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        placeholder="Magazine Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <Button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Add Magazine"}
      </Button>
    </form>
  );
}
