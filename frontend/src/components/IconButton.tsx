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
  size?: number;
  variant?: keyof typeof variantColors;
  onClick?: () => void;
  className?: string;
}

export default function IconButton({
  icon,
  size = 32,
  onClick,
  variant = 'primary',
}: IconButtonProps) {
  const { src, label } = icons[icon];
  const colors = variantColors[variant];

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center py-1 w-${size} rounded-md
        ${colors}
      `}
    >
      <img src={src} alt={label} width="24" />
      <span>{label}</span>
    </button>
  );
}
