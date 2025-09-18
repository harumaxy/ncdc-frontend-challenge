import { useMemo } from 'react';

const icons = {
  edit: {
    src: '/icon/edit.svg',
    label: 'Edit',
  },
  save: {
    src: '/icon/save.svg',
    label: 'Save',
  },
  cancel: {
    src: '/icon/cancel.svg',
    label: 'Cancel',
  },
  'new-page': {
    src: '/icon/+.svg',
    label: 'New page',
  },
  done: {
    src: '/icon/done.svg',
    label: 'Done',
  },
};

const variantColors = {
  primary: 'text-white bg-primary',
  inverted: 'text-primary bg-white border border-primary',
  ghost: 'text-white bg-ghost',
};

interface IconButtonProps {
  icon: keyof typeof icons;
  size?: 'w-32' | 'w-16';
  variant?: keyof typeof variantColors;
  onClick?: () => void;
  className?: string;
  testid?: string;
}

export default function IconButton({
  icon,
  onClick,
  variant = 'primary',
  size = 'w-32',
  testid,
}: IconButtonProps) {
  const iconData = useMemo(() => icons[icon], [icon]);
  const colors = useMemo(() => variantColors[variant], [variant]);
  const { src, label } = iconData;

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center py-1 ${size} rounded-md
        ${colors}
      `}
      data-testid={testid}
    >
      <img src={src} alt={label} width="24" />
      <span>{label}</span>
    </button>
  );
}
