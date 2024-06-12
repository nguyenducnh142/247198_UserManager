interface SearchParams {
  username: string;
  fullname: string;
  role: string;
  project: string;
}

interface SearchParamsDisplayProps {
  searchParams: SearchParams;
  onRemove: (key: string) => void;
}

export default function SearchParamsDisplay({
  searchParams,
  onRemove,
}: SearchParamsDisplayProps) {
  return (
    <div className="mb-4">
      {Object.keys(searchParams).map((key) => {
        const value = searchParams[key as keyof SearchParams];
        if (value) {
          return (
            <button
              key={key}
              className="bg-gray-200 text-black px-2 py-1 rounded mr-2 mb-2"
              onClick={() => onRemove(key)}
            >
              {key}: {value} ✕
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}
