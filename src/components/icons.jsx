// Phosphor-style inline SVGs on currentColor, per the Nocturne design system.

export function IconWarning(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path d="M240.26 186.1 152.81 34.23a28.74 28.74 0 0 0-49.62 0L15.74 186.1a27.45 27.45 0 0 0 0 27.71A28.31 28.31 0 0 0 40.55 228h174.9a28.31 28.31 0 0 0 24.79-14.19 27.45 27.45 0 0 0 .02-27.71ZM120 104a8 8 0 0 1 16 0v40a8 8 0 0 1-16 0Zm8 88a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z" />
    </svg>
  );
}

export function IconInfo(props) {
  return (
    <svg width="17" height="17" viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm-4 48a12 12 0 1 1-12 12 12 12 0 0 1 12-12Zm12 112a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16 16 16 0 0 1 16 16v40a8 8 0 0 1 0 16Z" />
    </svg>
  );
}

export function IconQuestion(props) {
  return (
    <svg width="17" height="17" viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12 12 12 0 0 1-12 12Zm8-48.72V144a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg width="11" height="11" viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path d="M232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 0 1 17-17L96 183 215.51 63.51a12 12 0 0 1 17 17Z" />
    </svg>
  );
}

export function IconDownload(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path d="M224 152v56a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-56a8 8 0 0 1 16 0v56h160v-56a8 8 0 0 1 16 0Zm-101.66 5.66a8 8 0 0 0 11.32 0l40-40a8 8 0 0 0-11.32-11.32L136 132.69V40a8 8 0 0 0-16 0v92.69l-26.34-26.35a8 8 0 0 0-11.32 11.32Z" />
    </svg>
  );
}

export function IconMenu(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8ZM40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16Z" />
    </svg>
  );
}

export function IconSearch(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path d="M229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72 72.08 72.08 0 0 1-72-72Z" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path d="M221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" />
    </svg>
  );
}

export function IconLock(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path d="M208 80h-24v-8a56 56 0 0 0-112 0v8H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16Zm-120-8a40 40 0 0 1 80 0v8H88Z" />
    </svg>
  );
}

export function IconSpinner(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" className="icon-spin" {...props}>
      <path d="M232 128a104 104 0 1 1-104-104 8 8 0 0 1 0 16 88 88 0 1 0 88 88 8 8 0 0 1 16 0Z" />
    </svg>
  );
}
