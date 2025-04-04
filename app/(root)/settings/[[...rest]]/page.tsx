// import { UserProfile } from "@clerk/nextjs";

// export default function SettingsPage() {
//   return (
//     <div className="min-h-screen bg-black text-white flex justify-center items-start py-10 px-4">
//       <div className="w-full max-w-5xl">
//         <UserProfile
//           routing="path"
//           path="/settings"
//           appearance={{
//             elements: {
//               card: "bg-black text-white border border-white shadow-lg",
//               navbar: "bg-black text-white",
//               navbarMobileMenuButton: "text-white",
//               accordionTriggerButton:
//                 "!text-white !opacity-100 data-[state=open]:font-semibold data-[state=closed]:text-white/70",
//               navbarButton:
//                 "!text-white !opacity-100 data-[active=true]:font-semibold data-[active=false]:text-white/70",
//               profileSectionTitleText: "text-white font-bold",
//               profileSectionPrimaryButton:
//                 "bg-white text-black hover:bg-gray-200",
//               profileSectionSecondaryButton: "text-white hover:text-gray-300",
//               profileSectionDangerButton: "text-red-600 hover:text-red-500",
//               formFieldLabel: "text-white",
//               formFieldInput:
//                 "bg-black text-white border-b border-white focus:outline-none focus:ring-0",
//               formFieldInputFile: "text-white", // <- optional but safe
//               formFieldHintText: "text-gray-400",
//               headerTitle: "text-white",
//               headerSubtitle: "text-gray-400",
//               userPreviewMainIdentifier: "text-white",
//               userPreviewSecondaryIdentifier: "text-gray-400",

//               // ✅ Upload button fix here:
//               formFieldUploadButton:
//                 "bg-white text-black px-4 py-1 rounded-md font-medium hover:bg-gray-200 transition",
//             },
//             variables: {
//               colorPrimary: "#ffffff",
//               colorText: "#ffffff",
//               colorBackground: "#000000",
//               colorTextOnPrimaryBackground: "#000000",
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// }
import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-5xl">
        <UserProfile
          routing="path"
          path="/settings"
          appearance={{
            elements: {
              card: "bg-black text-white border border-white shadow-lg",
              navbar: "bg-black text-white",
              navbarMobileMenuButton: "text-white",

              accordionTriggerButton:
                "!text-white !opacity-100 data-[state=open]:font-semibold data-[state=closed]:text-white/70",
              navbarButton:
                "!text-white !opacity-100 data-[active=true]:font-semibold data-[active=false]:text-white/70",

              profileSectionTitleText: "text-white font-bold",
              profileSectionPrimaryButton:
                "bg-white text-black hover:bg-gray-200",
              profileSectionSecondaryButton: "text-white hover:text-gray-300",
              profileSectionDangerButton: "text-red-600 hover:text-red-500",

              formFieldLabel: "text-white",
              formFieldHintText: "text-gray-400",
              formFieldInput:
                "bg-black text-white border-b border-white focus:outline-none focus:ring-0",

              // ✅ Fix the upload button visibility
              formFieldFileUploadButton:
                "bg-white text-black px-4 py-1 rounded-md font-medium hover:bg-gray-200 transition",
              formFieldFileItem: "text-white",

              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              userPreviewMainIdentifier: "text-white",
              userPreviewSecondaryIdentifier: "text-gray-400",
            },
            variables: {
              colorPrimary: "#ffffff",
              colorText: "#ffffff",
              colorBackground: "#000000",
              colorTextOnPrimaryBackground: "#000000",
            },
          }}
        />
      </div>
    </div>
  );
}
