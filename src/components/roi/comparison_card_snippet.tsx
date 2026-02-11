// Comparison Card for Mobile Results
function ComparisonCard({
  title,
  icon,
  currentLabel,
  currentValue,
  ergoLabel,
  ergoValue,
  highlightLabel,
  highlightValue,
  highlightSuffix,
  format = 'number',
}: any) {
  const formatValue = (val: number) => {
    if (format === 'decimal') return val.toFixed(1);
    if (format === 'compact') {
      if (val >= 100000) return (val / 100000).toFixed(2) + 'L';
      return (val / 1000).toFixed(1) + 'K';
    }
    return val;
  };

  return (
    <div className="bg-neutral-50 rounded-xl overflow-hidden border border-neutral-100">
      <div className="bg-neutral-100/50 px-4 py-3 flex items-center gap-2 border-b border-neutral-100">
        {icon}
        <h3 className="text-xs font-bold text-neutral-600 uppercase tracking-wider">{title}</h3>
      </div>

      <div className="grid grid-cols-2 divide-x divide-neutral-100">
        {/* Current State */}
        <div className="p-4 flex flex-col items-center text-center bg-white">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wide mb-1">
            {currentLabel}
          </span>
          <span className="text-lg font-bold text-neutral-700">{formatValue(currentValue)}</span>
        </div>

        {/* ErgoPack State */}
        <div className="p-4 flex flex-col items-center text-center bg-emerald-50/30">
          <span className="text-[10px] text-emerald-600/80 uppercase tracking-wide mb-1">
            {ergoLabel}
          </span>
          <span className="text-lg font-bold text-emerald-600">{formatValue(ergoValue)}</span>
        </div>
      </div>

      {/* Improvement Highlight */}
      <div className="bg-emerald-100/50 px-4 py-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-emerald-800">{highlightLabel}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-emerald-700">
            {typeof highlightValue === 'number' ? formatValue(highlightValue) : highlightValue}
            {highlightSuffix}
          </span>
          {format === 'decimal' && (
            <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
              SAVED
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
