export default function Contact() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-900/20 p-6">
        <a
          className="rounded-lg border border-neutral-800 bg-neutral-900/30 px-4 py-2 text-sm text-neutral-100 hover:border-neutral-600 hover:bg-neutral-900/60"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=ilyagibalo@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          Write on Gmail
        </a>
      </div>
    </div>
  );
}
