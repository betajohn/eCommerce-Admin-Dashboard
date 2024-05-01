import { cn } from '@/lib/utils';

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
};

export default function Thumb(props: PropType) {
  const { selected, index, onClick } = props;

  return (
    <div
      className={cn(
        'embla-thumbs__slide rounded-lg border bg-card text-card-foreground shadow-sm flex-[0_0_22%] min-w-0 ml-3 sm:flex-[0_0_15%] border-foreground',
        !selected && 'border-primary text-primary'
      )}
    >
      <button onClick={onClick} type="button" className="w-full h-full">
        {index + 1}
      </button>
    </div>
  );
}
