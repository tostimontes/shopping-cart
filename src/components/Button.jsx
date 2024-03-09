import Icon from '@mdi/react';

export default function Button({ text, iconPath, size }) {
  return (
    <button type="button" className="flex bg-orange-400 p-2">
      {iconPath && <Icon path={iconPath} size={1} />}
      {text}
    </button>
  );
}
