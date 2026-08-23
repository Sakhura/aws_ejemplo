export function Tag({ text, variant = 'neutral' }) {
  return <span className={`tag tag-${variant}`}>{text}</span>;
}

export function ViewHeader({ crumb, title, intro, action }) {
  return (
    <>
      <div className="breadcrumb">{crumb}</div>
      <div className="view-header-row">
        <h2>{title}</h2>
        {action}
      </div>
      {intro && <p className="view-intro">{intro}</p>}
    </>
  );
}

export function GuidePanelHead({ icon, title, tag }) {
  return (
    <div className="guide-panel-head">
      {icon}
      <span className="guide-panel-title">{title}</span>
      {tag && <span className="tag tag-outline" style={{ marginLeft: 'auto' }}>{tag}</span>}
    </div>
  );
}
