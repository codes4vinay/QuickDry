export default function SkeletonGrid({ cards = 4 }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: cards }).map((_, index) => (
        <div className="skeleton h-32" key={index} />
      ))}
    </div>
  );
}
