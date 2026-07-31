import { useRouter } from "next/router";
import NoticeForm, { NoticeData } from "@/components/NoticeForm";

export default function NewNoticePage() {
  const router = useRouter();

  async function handleCreate(data: NoticeData) {
    const response = await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.join("\n") || "Failed to create notice");
    }

    router.push("/");
  }

  return (
    <div className="py-10">
      <NoticeForm
        buttonText="Create Notice"
        onSubmit={handleCreate}
      />
    </div>
  );
}
