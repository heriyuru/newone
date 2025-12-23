import Image from "next/image";
import TestNotification from "@/components/TestNotification"; // <--- Import this!

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-10 px-6 bg-white dark:bg-black sm:items-center">
        
        {/* Logo Section */}
        <Image
          className="dark:invert mb-8"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={24}
          priority
        />

        {/* Header Text */}
        <div className="flex flex-col items-center gap-4 text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50">
            RealDel Notification Center
          </h1>
          <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
            Use the button below to test the full "Closed App" notification flow.
          </p>
        </div>

        {/* The Test Button */}
        <div className="w-full max-w-md">
          <TestNotification />
        </div>

      </main>
    </div>
  );
}