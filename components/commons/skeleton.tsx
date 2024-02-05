import classNames from "classnames";

const Skeleton = ({ times, className }) => {
  const outterClassnames = classNames("max-w-full animate-pulse");

  const boxes = Array(times)
    .fill(0)
    .map((_, index) => {
      return (
        <div
          key={index}
          className={` bg-gray-200 dark:bg-gray-700 w-full mt-2 ${className}`}
        />
      );
    });

  return <div className={outterClassnames}>{boxes}</div>;
};

export default Skeleton;
