import Icon from '@mdi/react';

export default function Button({ text, iconPath, size, className, onClick }) {
  return (
    <button type="button" className={`${className} flex bg-orange-400 p-2 items-center justify-center text-yellow-100`} onClick={onClick}>
      {iconPath && <Icon path={iconPath} size={1} />}
      {text}
    </button>
  );
}
