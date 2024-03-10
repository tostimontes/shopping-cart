import Icon from '@mdi/react';

export default function Button({ text, iconPath, size, className, onClick }) {
  return (
    <button
      type="button"
      className={`${className} flex items-center justify-center bg-orange-400 p-2 text-yellow-100`}
      onClick={onClick}
    >
      {iconPath && <Icon path={iconPath} size={size || 1} />}
      {text}
    </button>
  );
}
