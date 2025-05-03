// app/resume/page.tsx
import ResumeUploader from "@/components/ResumeUploader";

export default function ResumePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Your Resumé</h1>
      <ResumeUploader />
    </main>
  );
}
