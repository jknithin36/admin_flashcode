import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          card: "shadow-lg rounded-xl p-6", // optional Tailwind styling
        },
        layout: {
          logoImageUrl: "/flash_logo.png",
          logoPlacement: "inside", // or "outside" if you want it above the card
          showOptionalFields: false,
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorPrimary: "#000000", // Tailwind blue-500 or your brand color
        },
      }}
    />
  );
}
