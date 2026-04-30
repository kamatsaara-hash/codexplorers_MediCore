interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
          <span className="gradient-text">{title}</span>
        </h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

export const EmptyState = ({ title, description, icon: Icon }: { title: string; description?: string; icon?: any }) => (
  <div className="glass flex flex-col items-center justify-center rounded-2xl px-6 py-14 text-center">
    {Icon && (
      <div className="mb-3 rounded-2xl border border-primary/30 bg-primary/10 p-3 text-primary">
        <Icon className="h-6 w-6" />
      </div>
    )}
    <div className="font-display text-lg font-semibold">{title}</div>
    {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
  </div>
);
