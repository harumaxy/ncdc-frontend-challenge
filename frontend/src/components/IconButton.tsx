interface IconButtonProps {
  icon: 'edit' | 'save' | 'cancel' | 'new-page' | 'done';
  onClick: () => void;
  className?: string;
}

const variants = {
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

export default function IconButton({ icon, onClick }: IconButtonProps) {
  if (!variants[icon]) {
    throw new Error(`Unknown icon variant: ${icon}`);
  }

  const { src, label } = variants[icon];

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2
        bg-primary rounded-md
        transition-colors
        font-medium text-sm
      `}
    >
      <img src={src} alt={label} width="16" height="16" className="w-4 h-4" />
      {label}
    </button>
  );
}
