// // app/(auth)/sign-in/[[...rest]]/page.tsx
// import { SignIn } from "@clerk/nextjs";

// export default function SignInPage() {
//   return (
//     <SignIn
//       routing="path"
//       path="/sign-in"
//       appearance={{
//         variables: {
//           colorPrimary: "#f97316", // Orange-500 for consistency
//           colorBackground: "#000000",
//           colorText: "#ffffff",
//           colorInputBackground: "#111111",
//           colorInputText: "#ffffff",
//           fontSize: "16px",
//           borderRadius: "0.75rem",
//         },
//         elements: {
//           card: "bg-[#0f0f0f] border border-[#1f1f1f] shadow-lg rounded-2xl",
//           formButtonPrimary:
//             "bg-white text-[#f97316] hover:bg-gray-100 font-semibold transition",
//           headerTitle: "text-white text-xl font-bold",
//           headerSubtitle: "text-sm text-gray-400",
//           footer: "hidden",
//         },
//       }}
//     />
//   );
// }

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}
