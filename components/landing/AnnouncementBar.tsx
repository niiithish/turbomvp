import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto max-w-(--container-max-w) px-(--container-padding-x)">
        <div className="flex h-10 items-center justify-center font-medium text-sm">
          <Link
            className="transition-opacity hover:opacity-80"
            href="https://github.com"
          >
            🚀 Now v2.0 with AI integrations! Clone now →
          </Link>
        </div>
      </div>
    </div>
  );
}
