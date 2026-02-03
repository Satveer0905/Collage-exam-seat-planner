
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[10px] font-black text-gray-400 uppercase">
        {label}
      </label>
      <input
        required
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg
                   outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

export default Input;
