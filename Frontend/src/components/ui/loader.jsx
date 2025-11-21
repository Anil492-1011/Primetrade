export const Loader = () => (
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <span className="h-2 w-2 animate-ping rounded-full bg-primary"></span>
    <span className="h-2 w-2 animate-ping rounded-full bg-primary/70"></span>
    <span className="h-2 w-2 animate-ping rounded-full bg-primary/50"></span>
    <p className="font-medium text-primary">Loading...</p>
  </div>
);

