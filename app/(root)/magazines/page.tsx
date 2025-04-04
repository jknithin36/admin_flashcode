"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface Magazine {
  id: string;
  name: string;
  description: string;
  link: string;
  imageUrl: string;
}

export default function AddMagazineForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [magazines, setMagazines] = useState<Magazine[]>([]);

  const fetchMagazines = async () => {
    try {
      const res = await fetch(
        "https://serverflash.onrender.com/api/magazines/all"
      );
      const data = await res.json();
      if (data.magazines) setMagazines(data.magazines);
    } catch (err) {
      console.error("❌ Error fetching magazines:", err);
    }
  };

  useEffect(() => {
    fetchMagazines();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !link || !image) {
      setMessage("❗ All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("image", image);

    setUploading(true);
    setMessage("⏳ Uploading magazine...");

    try {
      const response = await fetch(
        "https://serverflash.onrender.com/api/magazines/add",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("✅ Magazine added successfully!");
        setName("");
        setDescription("");
        setLink("");
        setImage(null);
        fetchMagazines();
      } else {
        const errorText = await response.text();
        console.error("❌ Backend Error:", errorText);
        setMessage("❌ Failed to add magazine. See console.");
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const deleteMagazine = async (id: string) => {
    try {
      const res = await fetch(
        `https://serverflash.onrender.com/api/magazines/delete/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        console.log("🗑️ Deleted magazine:", id);
        fetchMagazines();
      } else {
        console.error("❌ Delete failed:", await res.text());
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  return (
    <div className="p-10 w-full">
      {/* Page Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Magazine Management
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl">
          Easily upload, view, and manage your organization magazines. Provide
          links, descriptions, and cover images for students and readers to
          explore.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-col lg:flex-row w-full h-full gap-10">
        {/* Left: Form */}
        <div className="w-full lg:w-1/2">
          <Card className="bg-black text-white border border-neutral-700 rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white">
                Add a New Magazine
              </CardTitle>
              <p className="text-gray-400 mt-1 text-sm">
                Fill out the form below to upload a new magazine to Flashcode.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                <Input
                  placeholder="Magazine Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Magazine Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Input
                  type="url"
                  placeholder="Magazine Link (https://...)"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  required
                />
                {image && (
                  <p className="text-sm text-gray-400">
                    📁 Selected: {image.name}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-white text-black hover:bg-neutral-200 transition font-semibold"
                >
                  {uploading ? "Uploading..." : "Add Magazine"}
                </Button>
                {message && (
                  <p className="text-sm text-center mt-2 text-gray-300">
                    {message}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Optional Info Box */}
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl text-gray-300 text-sm leading-relaxed p-5 mt-8">
            <h4 className="text-white font-semibold text-lg mb-2">
              💡 Did You Know?
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>The first magazine was published in 1731.</li>
              <li>National Geographic launched in 1888!</li>
              <li>Magazines still influence over 1B global readers.</li>
            </ul>
          </div>
        </div>

        {/* Right: Magazine Cards */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl text-white font-bold mb-4 border-b border-gray-700 pb-2">
            All Magazines
          </h2>
          {magazines.length === 0 ? (
            <p className="text-sm text-gray-400">No magazines added yet.</p>
          ) : (
            <div className="space-y-5">
              {magazines.map((mag) => (
                <Card
                  key={mag.id}
                  className="bg-[#111] text-white flex flex-col md:flex-row items-center md:items-start gap-4 p-5 border border-neutral-700 rounded-2xl shadow-md hover:shadow-lg transition"
                >
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden">
                    <Image
                      src={mag.imageUrl}
                      alt={mag.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-1">
                    <h3 className="text-lg font-semibold line-clamp-1">
                      {mag.name}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {mag.description}
                    </p>
                    <div className="flex justify-between mt-2">
                      <a
                        href={mag.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-sm hover:underline"
                      >
                        Read More
                      </a>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-xs px-4 py-1 rounded-full"
                        onClick={() => deleteMagazine(mag.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
